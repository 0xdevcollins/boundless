'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { signTransaction } from '@/hooks/useStellarWallet';
import { contractClient } from '@/src/contracts/boundless_contract';
import { useWalletStore } from '@/store/useWalletStore';
import { convertUSDToStroops, getXLMPrice } from '@/utils/price';
import { zodResolver } from '@hookform/resolvers/zod';
import { DollarSign, FileImage, Loader2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const projectFormSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  fundingGoal: z.string().refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, {
    message: 'Funding goal must be a positive number',
  }),
  category: z.string().min(1, 'Category is required'),
  bannerImage: z.union([z.string().url(), z.instanceof(File)]).optional(),
  profileImage: z.union([z.string().url(), z.instanceof(File)]).optional(),
  walletAddress: z.string(),
  ileUrl: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const categories = [
  { id: 'tech', name: 'Technology' },
  { id: 'art', name: 'Art & Creative' },
  { id: 'community', name: 'Community' },
  { id: 'education', name: 'Education' },
];

export function ProjectForm({ userId }: { userId?: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [xlmPrice, setXlmPrice] = useState<number | null>(null);
  const { publicKey } = useWalletStore();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      userId,
      title: '',
      description: '',
      fundingGoal: '',
      category: '',
    },
  });

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const price = await getXLMPrice();
        setXlmPrice(price);
      } catch (error) {
        console.error('Failed to fetch XLM price:', error);
      }
    };
    fetchPrice();
  }, []);

  // Set wallet address in form when publicKey changes
  useEffect(() => {
    if (publicKey) {
      form.setValue('walletAddress', publicKey);
      contractClient.options.publicKey = publicKey;
      contractClient.options.signTransaction = signTransaction;
    }
  }, [publicKey, form]);

  async function handleUploadMetadata(data: ProjectFormValues): Promise<string> {
    setStatus('Uploading metadata...');
    setProgress(25);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);

    if (data.bannerImage instanceof File) {
      formData.append('bannerImage', data.bannerImage);
    }
    if (data.profileImage instanceof File) {
      formData.append('profileImage', data.profileImage);
    }

    const response = await fetch('/api/projects/upload-metadata', {
      method: 'POST',
      body: formData,
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.error || 'Failed to upload metadata');
    }

    return resData.metadataUri;
  }

  async function onSubmit(data: ProjectFormValues) {
    try {
      setIsLoading(true);
      setProgress(10);

      if (!publicKey) {
        throw new Error('Wallet is not connected');
      }

      if (!xlmPrice) {
        throw new Error('Failed to fetch XLM price. Please try again.');
      }

      const metadataUri = await handleUploadMetadata(data);

      const projectId = crypto.randomUUID();

      setStatus('Building transaction...');
      setProgress(50);
      const tx = await contractClient.create_project({
        project_id: projectId,
        creator: publicKey,
        metadata_uri: metadataUri,
        funding_target: convertUSDToStroops(Number(data.fundingGoal), xlmPrice),
        milestone_count: 3,
      });

      setStatus('Signing transaction...');
      setProgress(75);
      const { getTransactionResponse } = await tx.signAndSend();

      setStatus('Sending signed transaction to server...');
      setProgress(85);
      const formData = new FormData();
      formData.append('userId', userId || '');
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('fundingGoal', data.fundingGoal);
      formData.append('category', data.category);
      formData.append('projectId', projectId);
      formData.append('signedTx', getTransactionResponse?.txHash ?? '');
      formData.append('metadataUri', metadataUri);
      if (data.bannerImage) {
        if (typeof data.bannerImage === 'string') {
          formData.append('bannerImageUrl', data.bannerImage);
        } else {
          formData.append('bannerImage', data.bannerImage);
        }
      }

      if (data.profileImage) {
        if (typeof data.profileImage === 'string') {
          formData.append('profileImageUrl', data.profileImage);
        } else {
          formData.append('profileImage', data.profileImage);
        }
      }

      const response = await fetch('/api/projects/create', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create project');
      }

      setProgress(100);
      toast.success('Project created successfully!');
      router.push('/projects');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setStatus('');
    }
  }

  return (
    <Card className="shadow-md">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {isLoading && (
              <div className="mb-6 space-y-2">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <p className="text-sm font-medium text-primary">{status}</p>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Project Details</h3>
                <p className="text-sm text-muted-foreground">Basic information about your project</p>
                <Separator className="my-4" />
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project..."
                        className="min-h-[150px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Provide a clear and compelling description of your project</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fundingGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Funding Goal</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input type="number" placeholder="Amount in USD" className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        {xlmPrice && field.value && (
                          <span className="text-sm text-muted-foreground">
                            ≈ {(Number(field.value) / xlmPrice).toFixed(2)} XLM
                          </span>
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div>
                <h3 className="text-lg font-medium">Project Media</h3>
                <p className="text-sm text-muted-foreground">Upload images to showcase your project</p>
                <Separator className="my-4" />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="bannerImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner Image</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 rounded-md border border-dashed p-4">
                            <FileImage className="h-5 w-5 text-muted-foreground" />
                            <Input
                              type="file"
                              accept="image/*"
                              className="border-0 p-0 shadow-none"
                              onChange={(e) => field.onChange(e.target.files?.[0])}
                            />
                          </div>
                          <div className="relative">
                            <Input
                              type="url"
                              placeholder="Or enter image URL"
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>Banner image will be displayed at the top of your project page</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 rounded-md border border-dashed p-4">
                            <FileImage className="h-5 w-5 text-muted-foreground" />
                            <Input
                              type="file"
                              accept="image/*"
                              className="border-0 p-0 shadow-none"
                              onChange={(e) => field.onChange(e.target.files?.[0])}
                            />
                          </div>
                          <div className="relative">
                            <Input
                              type="url"
                              placeholder="Or enter image URL"
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>Profile image will be used as your project&apos;s thumbnail</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Project...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Create Project
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

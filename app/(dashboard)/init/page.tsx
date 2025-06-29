'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { DollarSign } from 'lucide-react';
import { getXLMPrice } from '@/utils/price';

const projectInitSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  fundingGoal: z
    .number()
    .min(1, 'Funding goal must be greater than 0')
    .max(1000000, 'Funding goal must be less than 1,000,000'),
  category: z.string().min(1, 'Category is required'),
  banner: z.instanceof(File, { message: 'Banner image is required' }),
  logo: z.instanceof(File, { message: 'Logo image is required' }),
});

type ProjectInitFormValues = z.infer<typeof projectInitSchema>;

const categories = [
  { id: 'tech', name: 'Technology' },
  { id: 'art', name: 'Art & Creative' },
  { id: 'community', name: 'Community' },
  { id: 'education', name: 'Education' },
];

export default function ProjectInitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [xlmPrice, setXLMPrice] = useState<number | null>(null);
  const router = useRouter();

  const form = useForm<ProjectInitFormValues>({
    resolver: zodResolver(projectInitSchema),
    defaultValues: {
      title: '',
      description: '',
      fundingGoal: 0,
      category: '',
    },
  });

  useEffect(() => {
    const draft = localStorage.getItem('project-init-draft');
    if (draft) {
      const parsed = JSON.parse(draft);
      form.reset(parsed);
    }
    // Fetch XLM price
    getXLMPrice()
      .then(setXLMPrice)
      .catch(() => setXLMPrice(null));
  }, []);

  const saveAsDraft = () => {
    const values = form.getValues();
    localStorage.setItem('project-init-draft', JSON.stringify(values));
    toast.success('Draft saved locally');
  };

  const onSubmit = async (data: ProjectInitFormValues) => {
    console.log('Form submission started', data); // Debug log
    
    try {
      setIsSubmitting(true);
      
      // Validate that required files are present
      if (!data.banner) {
        toast.error('Banner image is required');
        return;
      }
      
      if (!data.logo) {
        toast.error('Logo image is required');
        return;
      }
      
      console.log('Creating FormData...'); // Debug log
      
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('fundingGoal', String(data.fundingGoal));
      formData.append('category', data.category);
      formData.append('banner', data.banner);
      formData.append('logo', data.logo);
      
      console.log('Making API request...'); // Debug log
      
      const response = await fetch('/api/projects/init', {
        method: 'POST',
        body: formData,
      });
      
      console.log('Response status:', response.status); // Debug log
      console.log('Response ok:', response.ok); // Debug log
      
      // Log the response for debugging
      const responseText = await response.text();
      console.log('Response body:', responseText);
      
      if (!response.ok) {
        let errorMessage = 'Failed to initialize project';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error('Failed to parse error response:', e);
          errorMessage = `HTTP ${response.status}: ${responseText}`;
        }
        throw new Error(errorMessage);
      }
      
      // Try to parse successful response
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('Success response:', responseData);
      } catch (e) {
        console.log('Response is not JSON, treating as success');
      }
      
      toast.success('Project initialized successfully', {
        description: 'Your project has been submitted for admin review.',
      });
      
      localStorage.removeItem('project-init-draft');
      router.push('/projects');
      
    } catch (error: unknown) {
      console.error('Failed to initialize project:', error);
      toast.error('Failed to initialize project', {
        description: error instanceof Error ? error.message : 'Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add form validation debugging
  const handleSubmitClick = () => {
    console.log('Submit button clicked');
    console.log('Form state:', form.formState);
    console.log('Form errors:', form.formState.errors);
    console.log('Form values:', form.getValues());
  };

  return (
    <div className="container max-w-2xl py-8 bg-white rounded-lg shadow-md p-3">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Initialize Project</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project title" {...field} />
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
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your project..." className="min-h-[100px] resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fundingGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funding Goal</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Amount in USD"
                      className="pl-9 h-9"
                      {...field}
                      onChange={(e) => {
                        // Remove all non-digit characters
                        const numericValue = e.target.value.replace(/[^0-9]/g, '');
                        field.onChange(numericValue ? Number(numericValue) : '');
                      }}
                    />
                  </div>
                </FormControl>
                {xlmPrice && !isNaN(Number(field.value)) && Number(field.value) > 0 && (
                  <FormDescription className="text-xs">
                    ≈ {(Number(field.value) / xlmPrice).toFixed(2)} XLM
                  </FormDescription>
                )}
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
                      <SelectValue placeholder="Select category" />
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
          
          {/* Banner Upload Field */}
          <FormField
            control={form.control}
            name="banner"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Banner Image *</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                    {...field}
                    value={undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Logo Upload Field */}
          <FormField
            control={form.control}
            name="logo"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Logo Image *</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                    {...field}
                    value={undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={saveAsDraft} disabled={isSubmitting}>
              Save as Draft
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              onClick={handleSubmitClick}
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Review'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
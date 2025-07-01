// 'use client';

// import { Button } from '@/components/ui/button';
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'sonner';
// import { z } from 'zod';
// import { DollarSign } from 'lucide-react';
// import { getXLMPrice } from '@/utils/price';

// // Updated validation schema to match your API requirements
// const projectInitSchema = z.object({
//   title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
//   description: z
//     .string()
//     .min(10, 'Description must be at least 10 characters')
//     .max(2000, 'Description must be less than 2000 characters'),
//   fundingGoal: z
//     .number()
//     .min(1, 'Funding goal must be greater than 0')
//     .max(1000000, 'Funding goal must be less than 1,000,000'),
//   category: z.string().min(1, 'Category is required'),
//   banner: z
//     .any()
//     .refine((val) => typeof window !== 'undefined' && val instanceof File, { message: 'Banner image is required' }),
//   logo: z
//     .any()
//     .refine((val) => typeof window !== 'undefined' && val instanceof File, { message: 'Logo image is required' }),
// });

// type ProjectInitFormValues = z.infer<typeof projectInitSchema>;

// const categories = [
//   { id: 'tech', name: 'Technology' },
//   { id: 'art', name: 'Art & Creative' },
//   { id: 'community', name: 'Community' },
//   { id: 'education', name: 'Education' },
//   { id: 'finance', name: 'Finance' },
//   { id: 'health', name: 'Health' },
//   { id: 'environment', name: 'Environment' },
//   { id: 'gaming', name: 'Gaming' },
// ];

// export default function ProjectInitPage() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [xlmPrice, setXLMPrice] = useState<number | null>(null);
//   const router = useRouter();

//   const form = useForm<ProjectInitFormValues>({
//     resolver: zodResolver(projectInitSchema),
//     defaultValues: {
//       title: '',
//       description: '',
//       fundingGoal: 0,
//       category: '',
//     },
//   });

//   useEffect(() => {
//     const draft = localStorage.getItem('project-init-draft');
//     if (draft) {
//       try {
//         const parsed = JSON.parse(draft);
//         // Only restore non-file fields
//         form.setValue('title', parsed.title || '');
//         form.setValue('description', parsed.description || '');
//         form.setValue('fundingGoal', parsed.fundingGoal || 0);
//         form.setValue('category', parsed.category || '');
//       } catch (error) {
//         console.error('Failed to parse draft:', error);
//       }
//     }

//     // Fetch XLM price
//     getXLMPrice()
//       .then(setXLMPrice)
//       .catch(() => setXLMPrice(null));
//   }, [form]);

//   const saveAsDraft = () => {
//     const values = form.getValues();
//     // Save only non-file fields to localStorage
//     const draftData = {
//       title: values.title,
//       description: values.description,
//       fundingGoal: values.fundingGoal,
//       category: values.category,
//     };
//     localStorage.setItem('project-init-draft', JSON.stringify(draftData));
//     toast.success('Draft saved locally');
//   };

//   const onSubmit = async (data: ProjectInitFormValues) => {
//     console.log('Form submission started', data);

//     try {
//       setIsSubmitting(true);

//       // Validate that required files are present
//       if (!data.banner) {
//         toast.error('Banner image is required');
//         return;
//       }

//       if (!data.logo) {
//         toast.error('Logo image is required');
//         return;
//       }

//       console.log('Creating FormData...');

//       // Create FormData for file uploads
//       const formData = new FormData();
//       formData.append('title', data.title);
//       formData.append('description', data.description);
//       formData.append('fundingGoal', String(data.fundingGoal));
//       formData.append('category', data.category);
//       formData.append('banner', data.banner);
//       formData.append('logo', data.logo);

//       console.log('Making API request...');

//       const response = await fetch('/api/projects/init', {
//         method: 'POST',
//         body: formData,
//       });

//       console.log('Response status:', response.status);

//       const responseData = await response.json();
//       console.log('Response data:', responseData);

//       if (!response.ok) {
//         throw new Error(responseData.message || responseData.error || 'Failed to initialize project');
//       }

//       toast.success('Project initialized successfully!', {
//         description: responseData.message || 'Your project has been created successfully.',
//       });

//       localStorage.removeItem('project-init-draft');
//       router.push('/projects');
//     } catch (error: unknown) {
//       console.error('Failed to initialize project:', error);
//       toast.error('Failed to initialize project', {
//         description: error instanceof Error ? error.message : 'Please try again.',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container max-w-2xl py-8 bg-white rounded-lg shadow-md p-6">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">Initialize Project</h1>
//         <p className="text-muted-foreground mt-2">
//           Create your project with all the necessary details and media assets.
//         </p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Project Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter your project title" {...field} />
//                 </FormControl>
//                 <FormDescription>A clear, compelling title for your project (max 100 characters)</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Project Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Describe your project in detail..."
//                     className="min-h-[120px] resize-none"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Provide a detailed description of your project, its goals, and value proposition (10-2000 characters)
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="fundingGoal"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Funding Goal</FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <DollarSign className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       inputMode="numeric"
//                       pattern="[0-9]*"
//                       placeholder="Amount in USD"
//                       className="pl-9 h-9"
//                       {...field}
//                       onChange={(e) => {
//                         // Remove all non-digit characters
//                         const numericValue = e.target.value.replace(/[^0-9]/g, '');
//                         field.onChange(numericValue ? Number(numericValue) : '');
//                       }}
//                     />
//                   </div>
//                 </FormControl>
//                 {xlmPrice && !isNaN(Number(field.value)) && Number(field.value) > 0 && (
//                   <FormDescription className="text-xs">
//                     ≈ {(Number(field.value) / xlmPrice).toFixed(2)} XLM
//                   </FormDescription>
//                 )}
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Category</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {categories.map((category) => (
//                       <SelectItem key={category.id} value={category.id}>
//                         {category.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="banner"
//             render={({ field: { onChange, ...field } }) => (
//               <FormItem>
//                 <FormLabel>Banner Image *</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         onChange(file);
//                       }
//                     }}
//                     {...field}
//                     value={undefined}
//                   />
//                 </FormControl>
//                 <FormDescription>Upload a banner image for your project (recommended: 1200x400px)</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="logo"
//             render={({ field: { onChange, ...field } }) => (
//               <FormItem>
//                 <FormLabel>Logo Image *</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         onChange(file);
//                       }
//                     }}
//                     {...field}
//                     value={undefined}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Upload a logo for your project (recommended: square format, 400x400px)
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="flex gap-3 pt-4">
//             <Button type="button" variant="secondary" onClick={saveAsDraft} disabled={isSubmitting}>
//               Save as Draft
//             </Button>
//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? 'Creating...' : 'Initialize Project'}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }

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

// Updated validation schema to match API requirements
const projectInitSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  summary: z
    .string()
    .min(10, 'Summary must be at least 10 characters')
    .max(2000, 'Summary must be less than 2000 characters'),
  category: z.string().min(1, 'Category is required'),
  whitepaperUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  pitchVideoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type ProjectInitFormValues = z.infer<typeof projectInitSchema>;

const categories = [
  { id: 'tech', name: 'Technology' },
  { id: 'art', name: 'Art & Creative' },
  { id: 'community', name: 'Community' },
  { id: 'education', name: 'Education' },
  { id: 'finance', name: 'Finance' },
  { id: 'health', name: 'Health' },
  { id: 'environment', name: 'Environment' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'DeFi', name: 'DeFi' },
];

export default function ProjectInitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<ProjectInitFormValues>({
    resolver: zodResolver(projectInitSchema),
    defaultValues: {
      title: '',
      summary: '',
      category: '',
      whitepaperUrl: '',
      pitchVideoUrl: '',
    },
  });

  useEffect(() => {
    const draft = localStorage.getItem('project-idea-draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        form.setValue('title', parsed.title || '');
        form.setValue('summary', parsed.summary || '');
        form.setValue('category', parsed.category || '');
        form.setValue('whitepaperUrl', parsed.whitepaperUrl || '');
        form.setValue('pitchVideoUrl', parsed.pitchVideoUrl || '');
      } catch (error) {
        console.error('Failed to parse draft:', error);
      }
    }
  }, [form]);

  const saveAsDraft = () => {
    const values = form.getValues();
    localStorage.setItem('project-idea-draft', JSON.stringify(values));
    toast.success('Draft saved locally');
  };

  const onSubmit = async (data: ProjectInitFormValues) => {
    console.log('Form submission started', data);

    try {
      setIsSubmitting(true);

      
      const payload = {
        title: data.title,
        summary: data.summary,
        type: 'crowdfund' as const,
        category: data.category,
        ...(data.whitepaperUrl && { whitepaperUrl: data.whitepaperUrl }),
        ...(data.pitchVideoUrl && { pitchVideoUrl: data.pitchVideoUrl }),
      };

      console.log('Making API request with payload:', payload);

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);

      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'Failed to create project idea');
      }

      toast.success('Project idea created successfully!', {
        description: responseData.message || 'Your project idea has been created and is now open for voting.',
      });

      localStorage.removeItem('project-idea-draft');
      router.push('/projects');
    } catch (error: unknown) {
      console.error('Failed to create project idea:', error);
      toast.error('Failed to create project idea', {
        description: error instanceof Error ? error.message : 'Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-2xl py-8 bg-white rounded-lg shadow-md p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Project Idea</h1>
        <p className="text-muted-foreground mt-2">
          Submit your project idea to receive community feedback and votes. Once your idea receives enough votes, it can become a full campaign.
        </p>
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
                  <Input placeholder="Enter your project title" {...field} />
                </FormControl>
                <FormDescription>A clear, compelling title for your project (max 100 characters)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your project idea in detail..."
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed summary of your project idea, its goals, and value proposition (10-2000 characters)
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

          <FormField
            control={form.control}
            name="whitepaperUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Whitepaper URL (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com/whitepaper.pdf"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Link to your project's whitepaper or detailed documentation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pitchVideoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pitch Video URL (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://youtube.com/watch?v=example"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Link to a video pitch or demo of your project
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={saveAsDraft} disabled={isSubmitting}>
              Save as Draft
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Project Idea'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
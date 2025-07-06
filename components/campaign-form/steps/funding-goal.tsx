'use client';

import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { DollarSign, FileImage, LinkIcon, Upload } from 'lucide-react';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { categories } from '../types';
import type { ProjectFormValues } from '../types';

interface BasicInfoStepProps {
  form: UseFormReturn<ProjectFormValues>;
  xlmPrice: number | null;
}

export default function FundingGoal({ form, xlmPrice }: BasicInfoStepProps) {
  const [activeTab, setActiveTab] = useState<Record<string, string>>({
    bannerImage: 'file',
    profileImage: 'file',
  });

  return (
    <div className="spade-y-4">
      <div>
        <h3 className="text-lg font-medium">Funding Goal</h3>
        <p className="text-sm text-muted-foreground">Details about your funding goal</p>
        <Separator className="my-3" />
      </div>
      <div>
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
                    placeholder="Amount in USD"
                    className="pl-9 h-9"
                    pattern="[0-9]*"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </div>
              </FormControl>
              {xlmPrice && field.value && (
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
                  <SelectTrigger className="h-9">
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

      <div className="grid gap-4 md:grid-cols-2 py-4">
        <FormField
          control={form.control}
          name="bannerImage"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Banner Image</FormLabel>
              <Tabs
                defaultValue="file"
                value={activeTab.bannerImage}
                onValueChange={(value) => setActiveTab({ ...activeTab, bannerImage: value })}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-2 h-8">
                  <TabsTrigger value="file" className="text-xs">
                    Upload File
                  </TabsTrigger>
                  <TabsTrigger value="url" className="text-xs">
                    Enter URL
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="file" className="mt-0">
                  <div
                    className={cn(
                      'flex flex-col items-center justify-center rounded-md border border-dashed p-3 transition-colors',
                      'hover:border-primary/50 hover:bg-muted/50 cursor-pointer',
                    )}
                    onClick={() => document.getElementById('banner-image-file')?.click()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        document.getElementById('banner-image-file')?.click();
                      }
                    }}
                  >
                    <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                    <p className="text-sm font-medium">Click to upload</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF (max 5MB)</p>
                    <Input
                      id="banner-image-file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                    {field.value instanceof File && (
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <FileImage className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">{field.value.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            field.onChange(undefined);
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="url" className="mt-0">
                  <div className="flex items-center gap-2 rounded-md border p-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <Input
                      type="url"
                      placeholder="https://example.com/banner.jpg"
                      className="border-0 p-0 shadow-none focus-visible:ring-0 h-7"
                      onChange={(e) => field.onChange(e.target.value)}
                      value={typeof field.value === 'string' ? field.value : ''}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <FormDescription className="text-xs">
                Banner image will be displayed at the top of your project page
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Profile Image</FormLabel>
              <Tabs
                defaultValue="file"
                value={activeTab.profileImage}
                onValueChange={(value) => setActiveTab({ ...activeTab, profileImage: value })}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-2 h-8">
                  <TabsTrigger value="file" className="text-xs">
                    Upload File
                  </TabsTrigger>
                  <TabsTrigger value="url" className="text-xs">
                    Enter URL
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="file" className="mt-0">
                  <div
                    className={cn(
                      'flex flex-col items-center justify-center rounded-md border border-dashed p-3 transition-colors',
                      'hover:border-primary/50 hover:bg-muted/50 cursor-pointer',
                    )}
                    onClick={() => document.getElementById('profile-image-file')?.click()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        document.getElementById('profile-image-file')?.click();
                      }
                    }}
                  >
                    <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                    <p className="text-sm font-medium">Click to upload</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF (max 2MB)</p>
                    <Input
                      id="profile-image-file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                    {field.value instanceof File && (
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <FileImage className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">{field.value.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            field.onChange(undefined);
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="url" className="mt-0">
                  <div className="flex items-center gap-2 rounded-md border p-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <Input
                      type="url"
                      placeholder="https://example.com/profile.jpg"
                      className="border-0 p-0 shadow-none focus-visible:ring-0 h-7"
                      onChange={(e) => field.onChange(e.target.value)}
                      value={typeof field.value === 'string' ? field.value : ''}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <FormDescription className="text-xs">
                Profile image will be displayed in project cards and headers
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

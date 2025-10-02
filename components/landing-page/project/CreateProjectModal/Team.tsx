'use client';

import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { type CreateProjectFormData, initialStepDefaults } from './schemas';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, X, User, Linkedin, Twitter, Github } from 'lucide-react';

interface TeamProps {
  form: ReturnType<typeof useFormContext<CreateProjectFormData>>;
  registerStepRef: (step: number, ref: { validate: () => boolean }) => void;
}

const Team = ({ form, registerStepRef }: TeamProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'team.teamMembers',
  });

  React.useEffect(() => {
    registerStepRef(4, {
      validate: () => {
        const teamData = form.getValues('team');
        const initialDefaults = initialStepDefaults.team;

        // Check if data is identical to initial defaults
        const isUnchanged =
          JSON.stringify(teamData) === JSON.stringify(initialDefaults);
        if (isUnchanged) return true; // Allow navigation if unchanged from initial state

        return !!(
          teamData.teamMembers.length > 0 &&
          teamData.teamMembers.every(
            member => member.name && member.role && member.bio
          )
        );
      },
    });
  }, [form, registerStepRef]);

  const addTeamMember = () => {
    append({
      name: '',
      role: '',
      bio: '',
      linkedin: '',
      twitter: '',
      github: '',
    });
  };

  return (
    <div className='min-h-full space-y-8 text-white'>
      <div className='space-y-2'>
        <h2 className='text-2xl font-semibold text-white'>Team Members</h2>
        <p className='text-[#B5B5B5]'>
          Introduce your team members. This helps build trust and credibility
          with potential backers.
        </p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-6'>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className='bg-background/20 space-y-4 rounded-lg border border-[#484848] p-6'
            >
              <div className='flex items-center justify-between'>
                <h3 className='flex items-center gap-2 text-lg font-medium text-white'>
                  <User className='h-5 w-5' />
                  Team Member {index + 1}
                </h3>
                {fields.length > 1 && (
                  <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    onClick={() => remove(index)}
                    className='h-8 w-8 border-[#484848] text-white hover:bg-[#2B2B2B]'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {/* Name */}
                <FormField
                  control={form.control}
                  name={`team.teamMembers.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium text-white'>
                        Full Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter full name'
                          className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role */}
                <FormField
                  control={form.control}
                  name={`team.teamMembers.${index}.role`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium text-white'>
                        Role/Position *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., CEO, CTO, Developer'
                          className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bio */}
              <FormField
                control={form.control}
                name={`team.teamMembers.${index}.bio`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-white'>
                      Bio *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Tell us about this team member. What is their background and expertise?'
                        className='bg-background/30 focus:border-primary focus:ring-primary/50 min-h-[100px] border-[#484848] text-white placeholder:text-[#919191]'
                        {...field}
                      />
                    </FormControl>
                    <div className='text-xs text-[#919191]'>
                      {field.value?.length || 0}/500 characters
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Social Links */}
              <div className='space-y-4'>
                <h4 className='text-sm font-medium text-white'>
                  Social Links (Optional)
                </h4>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <FormField
                    control={form.control}
                    name={`team.teamMembers.${index}.linkedin`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                          <Linkedin className='h-4 w-4' />
                          LinkedIn
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='https://linkedin.com/in/username'
                            className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`team.teamMembers.${index}.twitter`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                          <Twitter className='h-4 w-4' />
                          Twitter
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='https://twitter.com/username'
                            className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`team.teamMembers.${index}.github`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                          <Github className='h-4 w-4' />
                          GitHub
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='https://github.com/username'
                            className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          type='button'
          variant='outline'
          onClick={addTeamMember}
          className='w-full border-[#484848] text-white hover:bg-[#2B2B2B]'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Team Member
        </Button>
      </div>
    </div>
  );
};

export default Team;

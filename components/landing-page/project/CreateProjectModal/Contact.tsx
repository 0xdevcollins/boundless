'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Info } from 'lucide-react';

interface ContactProps {
  onDataChange?: (data: ContactFormData) => void;
  initialData?: Partial<ContactFormData>;
}

export interface ContactFormData {
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  additionalInfo: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  agreeToMarketing: boolean;
}

const Contact = React.forwardRef<{ validate: () => boolean }, ContactProps>(
  ({ onDataChange, initialData }, ref) => {
    const [formData, setFormData] = useState<ContactFormData>({
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      address: initialData?.address || '',
      city: initialData?.city || '',
      country: initialData?.country || '',
      postalCode: initialData?.postalCode || '',
      additionalInfo: initialData?.additionalInfo || '',
      agreeToTerms: initialData?.agreeToTerms || false,
      agreeToPrivacy: initialData?.agreeToPrivacy || false,
      agreeToMarketing: initialData?.agreeToMarketing || false,
    });

    const [errors, setErrors] = useState<
      Partial<Record<keyof ContactFormData, string>>
    >({});

    const handleInputChange = (
      field: keyof ContactFormData,
      value: string | boolean
    ) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }

      onDataChange?.(newData);
    };

    const validateForm = (): boolean => {
      const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      }

      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }

      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }

      if (!formData.country.trim()) {
        newErrors.country = 'Country is required';
      }

      if (!formData.postalCode.trim()) {
        newErrors.postalCode = 'Postal code is required';
      }

      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the Terms of Service';
      }

      if (!formData.agreeToPrivacy) {
        newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    // Expose validation function to parent
    React.useImperativeHandle(ref, () => ({
      validate: validateForm,
    }));

    return (
      <div className='min-h-full space-y-8 text-white'>
        {/* Contact Information */}
        <div className='space-y-6'>
          <div className='space-y-2'>
            <h3 className='text-lg font-medium text-white'>
              Contact Information
            </h3>
            <p className='text-sm text-[#B5B5B5]'>
              Please provide your contact details for project communication and
              verification.
            </p>
          </div>

          {/* Email */}
          <div className='space-y-2'>
            <Label className='text-white'>
              Email Address <span className='text-red-500'>*</span>
            </Label>
            <div className='relative'>
              <Mail className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#919191]' />
              <Input
                type='email'
                placeholder='your.email@example.com'
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className={cn(
                  'focus:border-primary border-[#484848] bg-[#1A1A1A] pl-10 text-white placeholder:text-[#919191]',
                  errors.email && 'border-red-500'
                )}
              />
            </div>
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className='space-y-2'>
            <Label className='text-white'>
              Phone Number <span className='text-red-500'>*</span>
            </Label>
            <div className='relative'>
              <Phone className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#919191]' />
              <Input
                type='tel'
                placeholder='+1 (555) 123-4567'
                value={formData.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
                className={cn(
                  'focus:border-primary border-[#484848] bg-[#1A1A1A] pl-10 text-white placeholder:text-[#919191]',
                  errors.phone && 'border-red-500'
                )}
              />
            </div>
            {errors.phone && (
              <p className='text-sm text-red-500'>{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Address Information */}
        <div className='space-y-6'>
          <div className='space-y-2'>
            <h3 className='text-lg font-medium text-white'>
              Address Information
            </h3>
            <p className='text-sm text-[#B5B5B5]'>
              This information is required for legal and verification purposes.
            </p>
          </div>

          {/* Address */}
          <div className='space-y-2'>
            <Label className='text-white'>
              Street Address <span className='text-red-500'>*</span>
            </Label>
            <div className='relative'>
              <MapPin className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#919191]' />
              <Input
                placeholder='123 Main Street, Apt 4B'
                value={formData.address}
                onChange={e => handleInputChange('address', e.target.value)}
                className={cn(
                  'focus:border-primary border-[#484848] bg-[#1A1A1A] pl-10 text-white placeholder:text-[#919191]',
                  errors.address && 'border-red-500'
                )}
              />
            </div>
            {errors.address && (
              <p className='text-sm text-red-500'>{errors.address}</p>
            )}
          </div>

          {/* City, Country, Postal Code */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div className='space-y-2'>
              <Label className='text-white'>
                City <span className='text-red-500'>*</span>
              </Label>
              <Input
                placeholder='New York'
                value={formData.city}
                onChange={e => handleInputChange('city', e.target.value)}
                className={cn(
                  'focus:border-primary border-[#484848] bg-[#1A1A1A] text-white placeholder:text-[#919191]',
                  errors.city && 'border-red-500'
                )}
              />
              {errors.city && (
                <p className='text-sm text-red-500'>{errors.city}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label className='text-white'>
                Country <span className='text-red-500'>*</span>
              </Label>
              <Input
                placeholder='United States'
                value={formData.country}
                onChange={e => handleInputChange('country', e.target.value)}
                className={cn(
                  'focus:border-primary border-[#484848] bg-[#1A1A1A] text-white placeholder:text-[#919191]',
                  errors.country && 'border-red-500'
                )}
              />
              {errors.country && (
                <p className='text-sm text-red-500'>{errors.country}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label className='text-white'>
                Postal Code <span className='text-red-500'>*</span>
              </Label>
              <Input
                placeholder='10001'
                value={formData.postalCode}
                onChange={e => handleInputChange('postalCode', e.target.value)}
                className={cn(
                  'focus:border-primary border-[#484848] bg-[#1A1A1A] text-white placeholder:text-[#919191]',
                  errors.postalCode && 'border-red-500'
                )}
              />
              {errors.postalCode && (
                <p className='text-sm text-red-500'>{errors.postalCode}</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className='space-y-2'>
          <Label className='text-white'>
            Additional Information (Optional)
          </Label>
          <Textarea
            placeholder='Any additional information you would like to share about your project or team...'
            value={formData.additionalInfo}
            onChange={e => handleInputChange('additionalInfo', e.target.value)}
            className='focus:border-primary min-h-24 resize-none border-[#484848] bg-[#1A1A1A] text-white placeholder:text-[#919191]'
          />
        </div>

        {/* Terms and Agreements */}
        <div className='space-y-4'>
          <div className='space-y-2'>
            <h3 className='text-lg font-medium text-white'>
              Terms and Agreements
            </h3>
            <p className='text-sm text-[#B5B5B5]'>
              Please review and accept the following terms to continue.
            </p>
          </div>

          <div className='space-y-4'>
            <div className='flex items-start space-x-3'>
              <Checkbox
                id='terms'
                checked={formData.agreeToTerms}
                onCheckedChange={checked =>
                  handleInputChange('agreeToTerms', checked as boolean)
                }
                className='mt-1'
              />
              <div className='space-y-1'>
                <Label
                  htmlFor='terms'
                  className='cursor-pointer text-sm text-white'
                >
                  I agree to the{' '}
                  <a
                    href='/terms'
                    className='text-primary hover:underline'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Terms of Service
                  </a>{' '}
                  <span className='text-red-500'>*</span>
                </Label>
                {errors.agreeToTerms && (
                  <p className='text-sm text-red-500'>{errors.agreeToTerms}</p>
                )}
              </div>
            </div>

            <div className='flex items-start space-x-3'>
              <Checkbox
                id='privacy'
                checked={formData.agreeToPrivacy}
                onCheckedChange={checked =>
                  handleInputChange('agreeToPrivacy', checked as boolean)
                }
                className='mt-1'
              />
              <div className='space-y-1'>
                <Label
                  htmlFor='privacy'
                  className='cursor-pointer text-sm text-white'
                >
                  I agree to the{' '}
                  <a
                    href='/privacy'
                    className='text-primary hover:underline'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Privacy Policy
                  </a>{' '}
                  <span className='text-red-500'>*</span>
                </Label>
                {errors.agreeToPrivacy && (
                  <p className='text-sm text-red-500'>
                    {errors.agreeToPrivacy}
                  </p>
                )}
              </div>
            </div>

            <div className='flex items-start space-x-3'>
              <Checkbox
                id='marketing'
                checked={formData.agreeToMarketing}
                onCheckedChange={checked =>
                  handleInputChange('agreeToMarketing', checked as boolean)
                }
                className='mt-1'
              />
              <Label
                htmlFor='marketing'
                className='cursor-pointer text-sm text-white'
              >
                I would like to receive updates about new features and
                opportunities (optional)
              </Label>
            </div>
          </div>
        </div>

        {/* Information Box */}
        <div className='rounded-lg border border-[#484848] bg-[#1A1A1A] p-4'>
          <div className='flex items-start space-x-3'>
            <Info className='mt-0.5 h-5 w-5 flex-shrink-0 text-[#B5B5B5]' />
            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-white'>
                What happens next?
              </h4>
              <p className='text-sm text-[#B5B5B5]'>
                After submitting your project, our team will review your
                application within 3-5 business days. You'll receive an email
                notification once the review is complete. If approved, your
                project will be published and available for funding.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Contact.displayName = 'Contact';

export default Contact;

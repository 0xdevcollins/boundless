'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { BoundlessButton } from '@/components/buttons/BoundlessButton';
import { ArrowRight, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { addToWaitlist } from '@/lib/api/waitlist';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export default function WaitlistForm() {
  gsap.registerPlugin(useGSAP, SplitText);
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [titleAnimation, setTitleAnimation] = useState<any>(null);
  const [titleSplit, setTitleSplit] = useState<any>(null);
  const [subtitleAnimation, setSubtitleAnimation] = useState<any>(null);
  const [subtitleSplit, setSubtitleSplit] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tl = gsap.timeline();

  const formRef = useRef<HTMLDivElement>(null);
  const nameFieldRef = useRef<HTMLDivElement>(null);
  const emailFieldRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (titleRef.current) {
        const split = SplitText.create(titleRef.current, {
          type: 'chars,words,lines',
          charsClass: 'title-char',
          wordsClass: 'title-word',
          linesClass: 'title-line',
        });

        // Apply gradient styling to characters
        split.chars.forEach((char: Element) => {
          (char as HTMLElement).style.background =
            'linear-gradient(180deg, #69726D 0%, #FFF 100%)';
          (char as HTMLElement).style.webkitBackgroundClip = 'text';
          (char as HTMLElement).style.backgroundClip = 'text';
          (char as HTMLElement).style.webkitTextFillColor = 'transparent';
          (char as HTMLElement).style.color = 'transparent';
        });

        setTitleSplit(split);

        // Create a more sophisticated timeline with multiple animation layers
        const animation = tl
          // Initial state - characters scattered and rotated
          .set(split.chars, {
            opacity: 0,
            y: 'random(-100, 100)',
            x: 'random(-200, 200)',
            rotation: 'random(-180, 180)',
            scale: 0,
            transformOrigin: '50% 50%',
          })
          // First wave - characters fly in from random positions
          .to(split.chars, {
            opacity: 1,
            y: 0,
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 1.2,
            ease: 'back.out(1.7)',
            stagger: {
              amount: 0.8,
              from: 'random',
            },
          })
          // Second wave - words scale up with bounce effect
          .to(
            split.words,
            {
              scale: 1.1,
              duration: 0.4,
              ease: 'power2.out',
              stagger: 0.1,
            },
            '-=0.3'
          )
          .to(
            split.words,
            {
              scale: 1,
              duration: 0.3,
              ease: 'bounce.out',
            },
            '-=0.2'
          )
          // Third wave - 3D rotation effect on lines
          .to(
            split.lines,
            {
              rotationX: 15,
              rotationY: 5,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.2,
            },
            '-=0.1'
          )
          .to(
            split.lines,
            {
              rotationX: 0,
              rotationY: 0,
              duration: 0.4,
              ease: 'power2.out',
            },
            '-=0.2'
          )
          // Add subtle continuous breathing animation
          .to(
            split.words,
            {
              scale: 1.02,
              duration: 3,
              ease: 'power2.inOut',
              yoyo: true,
              repeat: -1,
              stagger: 0.2,
            },
            '-=0.1'
          );

        setTitleAnimation(animation);

        // Add magnetic effect to title
        const titleElement = titleRef.current;
        if (titleElement) {
          titleElement.addEventListener('mousemove', e => {
            const rect = titleElement.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(titleElement, {
              x: x * 0.1,
              y: y * 0.1,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          titleElement.addEventListener('mouseleave', () => {
            gsap.to(titleElement, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: 'elastic.out(1, 0.5)',
            });
          });
        }
      }

      if (subtitleRef.current) {
        const split = SplitText.create(subtitleRef.current, {
          type: 'words',
          charsClass: 'subtitle-char',
          wordsClass: 'subtitle-word',
        });

        setSubtitleSplit(split);

        // Apply gradient styling to words
        split.words.forEach((word: Element) => {
          (word as HTMLElement).style.background =
            'linear-gradient(273deg, rgba(167, 249, 80, 0.50) 13.84%, #3AE6B2 73.28%)';
          (word as HTMLElement).style.webkitBackgroundClip = 'text';
          (word as HTMLElement).style.backgroundClip = 'text';
          (word as HTMLElement).style.webkitTextFillColor = 'transparent';
          (word as HTMLElement).style.color = 'transparent';
        });

        // Create a more dynamic subtitle animation
        const animation = gsap
          .timeline()
          // Initial state - words hidden and transformed
          .from(split.words, {
            opacity: 0,
            y: 100,
            rotationX: -90,
            transformOrigin: '50% 50% -50px',
            scale: 0.5,
          })
          // Words reveal with 3D flip effect
          .to(split.words, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.15,
            delay: 1.2,
          })
          // Add a subtle floating animation
          .to(
            split.words,
            {
              y: -5,
              duration: 2,
              ease: 'power2.inOut',
              stagger: 0.1,
              yoyo: true,
              repeat: -1,
            },
            '-=0.5'
          )
          // Add glow effect
          .to(
            split.chars,
            {
              filter:
                'brightness(1.1) drop-shadow(0 0 10px rgba(167, 249, 80, 0.3))',
              duration: 1,
              ease: 'power2.inOut',
              stagger: 0.02,
            },
            '-=1.5'
          );

        setSubtitleAnimation(animation);

        // Add magnetic effect to subtitle
        const subtitleElement = subtitleRef.current;
        if (subtitleElement) {
          subtitleElement.addEventListener('mousemove', e => {
            const rect = subtitleElement.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(subtitleElement, {
              x: x * 0.15,
              y: y * 0.15,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          subtitleElement.addEventListener('mouseleave', () => {
            gsap.to(subtitleElement, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: 'elastic.out(1, 0.5)',
            });
          });
        }
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 2.5,
            ease: 'back.out(1.7)',
          }
        );
      }
    },
    { scope: container }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const animateFieldFocus = (
    fieldRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (fieldRef.current) {
      gsap.to(fieldRef.current, {
        duration: 0.3,
        scale: 1.02,
        boxShadow: '0 0 0 1px rgb(167,249,80)',
        ease: 'power2.out',
      });
    }
  };

  const animateFieldBlur = (
    fieldRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (fieldRef.current) {
      gsap.to(fieldRef.current, {
        duration: 0.3,
        scale: 1,
        boxShadow: 'none',
        ease: 'power2.out',
      });
    }
  };

  const animateFormSubmission = () => {
    setIsSubmitting(true);

    const tl = gsap.timeline();

    if (buttonRef.current) {
      tl.to(buttonRef.current, {
        duration: 0.3,
        scale: 0.95,
        ease: 'power2.in',
      });
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      if (formRef.current && successRef.current) {
        const tl = gsap.timeline();
        tl.to(formRef.current, {
          duration: 0.5,
          opacity: 0,
          y: -30,
          scale: 0.95,
          ease: 'power2.in',
        }).to(
          successRef.current,
          {
            duration: 0.6,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        );
      }
    }, 2000);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    setIsSubmitting(true);

    try {
      // Split name into firstName and lastName, handling edge cases
      const nameParts = values.name
        .trim()
        .split(' ')
        .filter(part => part.length > 0);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      await addToWaitlist({
        email: values.email,
        firstName,
        lastName,
      });

      animateFormSubmission();
    } catch (error) {
      console.error(error);
      setError('Failed to submit form. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleTitleClick = () => {
    if (titleAnimation && titleSplit) {
      titleAnimation.revert();

      // Create a new dynamic animation on each click
      const newAnimation = gsap
        .timeline()
        // Scatter characters randomly
        .to(titleSplit.chars, {
          x: 'random(-300, 300)',
          y: 'random(-200, 200)',
          rotation: 'random(-360, 360)',
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
        })
        // Bring them back with different effects
        .to(titleSplit.chars, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
          stagger: {
            amount: 0.8,
            from: 'random',
          },
        })
        // Add a wave effect
        .to(
          titleSplit.words,
          {
            y: -10,
            duration: 0.3,
            ease: 'power2.out',
            stagger: 0.1,
            yoyo: true,
            repeat: 1,
          },
          '-=0.5'
        );

      setTitleAnimation(newAnimation);
    }
  };

  const handleSubtitleClick = () => {
    if (subtitleAnimation && subtitleSplit) {
      subtitleAnimation.revert();

      // Create a morphing text effect
      const newAnimation = gsap
        .timeline()
        // First, morph the text out
        .to(subtitleSplit.words, {
          scale: 0,
          rotationY: 180,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
          stagger: 0.05,
        })
        // Then morph it back in with 3D effects
        .to(subtitleSplit.words, {
          scale: 1,
          rotationY: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1,
        })
        // Add a ripple effect
        .to(
          subtitleSplit.chars,
          {
            y: -15,
            duration: 0.2,
            ease: 'power2.out',
            stagger: 0.02,
            yoyo: true,
            repeat: 1,
          },
          '-=0.3'
        );

      setSubtitleAnimation(newAnimation);
    }
  };

  return (
    <div
      ref={container}
      className=' max-w-[446px] mx-auto flex flex-col gap-16 items-center justify-start px-4 mt-[65px]'
    >
      <div className={cn(' w-full text-center', isSubmitted && 'hidden')}>
        <h1
          ref={titleRef}
          onClick={handleTitleClick}
          className='md:text-[48px] text-[40px] cursor-pointer hover:opacity-80 transition-opacity leading-[140%]'
          style={{
            background: 'linear-gradient(180deg, #69726D 0%, #FFF 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          Get Early Access to
        </h1>

        <p
          ref={subtitleRef}
          onClick={handleSubtitleClick}
          className='md:text-[48px] text-[40px] cursor-pointer hover:opacity-80 transition-opacity leading-[140%]'
          style={{
            background:
              'linear-gradient(273deg, rgba(167, 249, 80, 0.50) 13.84%, #3AE6B2 73.28%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          Boundless
        </p>
      </div>
      {!isSubmitted ? (
        <div className='w-full' ref={formRef}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='sr-only'>Name</FormLabel>
                    <FormControl>
                      <div
                        ref={nameFieldRef}
                        className='relative h-12 flex items-center p-4 rounded-lg border border-[#2B2B2B] bg-background backdrop-blur-sm transition-all duration-300'
                        onFocus={() => animateFieldFocus(nameFieldRef)}
                        onBlur={() => animateFieldBlur(nameFieldRef)}
                      >
                        <User className='w-5 h-5 text-[#B5B5B5]' />
                        <Input
                          {...field}
                          placeholder='Enter your name'
                          className='pl-10 placeholder:text-[#B5B5B5] text-white caret-[rgb(167,249,80)] absolute left-0 top-0 h-full bg-transparent border-none focus-visible:ring-none focus-visible:ring-[0px]'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='mt-3'>
                    <FormLabel className='sr-only'>Email</FormLabel>
                    <FormControl>
                      <div
                        ref={emailFieldRef}
                        className='relative h-12 flex items-center p-4 rounded-lg border border-[#2B2B2B] bg-background backdrop-blur-sm transition-all duration-300'
                        onFocus={() => animateFieldFocus(emailFieldRef)}
                        onBlur={() => animateFieldBlur(emailFieldRef)}
                      >
                        <Mail className='w-5 h-5 text-[#B5B5B5]' />
                        <Input
                          {...field}
                          placeholder='Enter your email'
                          className='pl-10 placeholder:text-[#B5B5B5] text-white caret-[#A7F950] absolute left-0 top-0 h-full bg-transparent border-none focus-visible:ring-none focus-visible:ring-[0px]'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <BoundlessButton
                ref={buttonRef}
                variant={form.formState.isValid ? 'default' : 'outline'}
                disabled={isSubmitting || !form.formState.isValid}
                type='submit'
                fullWidth
                className='w-full mt-8'
              >
                {isSubmitting ? 'Submitting...' : 'Join the waitlist'}{' '}
                <ArrowRight />
              </BoundlessButton>

              {error && (
                <p className='text-red-500 text-sm mt-2 text-center'>{error}</p>
              )}
            </form>
          </Form>
        </div>
      ) : (
        <div ref={successRef} className='w-full text-center opacity-0'>
          <div className='p-8 flex flex-col items-center justify-center'>
            <svg
              width='100'
              height='100'
              viewBox='0 0 100 100'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='100' height='100' rx='50' fill='#04802E' />
              <path
                d='M31.25 50L43.75 62.5L68.75 37.5'
                stroke='#E7F6EC'
                strokeWidth='7.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>

            <h3 className='text-[35px] font-medium text-white mb-3 leading-[120%] tracking-[-0.64px]  mt-[33px]'>
              You have been added to the waitlist
            </h3>
            <p className='text-[#B5B5B5]'>
              We&apos;ll let you know when Boundless is ready
            </p>
          </div>
        </div>
      )}
      <div className='w-full text-center'>
        <p className='text-[#D9D9D9]'>
          By joining, you agree to receive updates from Boundless. Learn more in
          our{' '}
          <Link className='text-[#A7F950]' href='/privacy'>
            Privacy policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

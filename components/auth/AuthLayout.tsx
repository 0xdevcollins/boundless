'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../ui/carousel';

interface AuthLayoutProps {
  children: React.ReactNode;
  showCarousel?: boolean;
}

const AuthLayout = ({ children, showCarousel = true }: AuthLayoutProps) => {
  const slides = [
    {
      id: 1,
      title: 'Threadify',
      description:
        'Threadify is a platform that lets creators and brands design, customize, and sell products online without upfront costs or inventory.',
      badge: 'TRENDING PROJECTS',
      logo: '/wallets/albedo.svg',
    },
    {
      id: 2,
      title: 'Boundless',
      description:
        'Boundless is a decentralized funding platform that connects creators with supporters through transparent and secure blockchain technology.',
      badge: 'FEATURED PROJECTS',
      logo: '/wallets/freighter.svg',
    },
    {
      id: 3,
      title: 'CreatorHub',
      description:
        'CreatorHub empowers content creators with tools to monetize their audience and build sustainable income streams.',
      badge: 'POPULAR PROJECTS',
      logo: '/next.svg',
    },
    {
      id: 4,
      title: 'InnovateLab',
      description:
        'InnovateLab provides resources and funding for innovative startups to bring their ideas to life and scale globally.',
      badge: 'INNOVATION PROJECTS',
      logo: '/auth/logo.svg',
    },
    {
      id: 5,
      title: 'EcoFund',
      description:
        'EcoFund supports environmental initiatives and sustainable projects that make a positive impact on our planet.',
      badge: 'SUSTAINABLE PROJECTS',
      logo: '/auth/logo.svg',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    api.on('select', () => setCurrentSlide(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className='bg-background flex min-h-screen w-full justify-center'>
      <div className='mx-auto flex h-screen w-full max-w-[1920px] flex-col lg:flex-row xl:max-w-[1600px] 2xl:max-w-[1800px]'>
        <Image
          src='/auth/top-left.png'
          alt='auth'
          width={248}
          height={231}
          className='pointer-events-none absolute top-0 left-0 z-[-1] object-contain'
          unoptimized
        />
        <Image
          src='/auth/grid.svg'
          alt='grid'
          width={248}
          height={231}
          className='pointer-events-none absolute bottom-0 left-0 z-[-1] max-h-[254px] w-1/2 min-w-[500px] object-cover'
          unoptimized
        />
        <div className='relative flex h-full w-full items-center justify-center overflow-hidden px-6 py-10 lg:basis-1/2 lg:px-16 xl:px-24 2xl:px-32'>
          <div className='relative z-[1] flex h-full w-full max-w-[500px] flex-col justify-center gap-6 lg:gap-10'>
            <Image
              src='/auth/logo.svg'
              alt='auth-logo'
              width={160}
              height={30}
              className='mx-auto object-contain lg:mx-0'
              unoptimized
            />
            <div className='space-y-6 lg:space-y-10'>{children}</div>
          </div>
        </div>

        {showCarousel && (
          <div className='hidden w-full items-center justify-center p-6 lg:flex lg:basis-1/2 lg:p-8 xl:p-10'>
            <div className="relative aspect-[4/3] h-full w-full max-w-[500px] overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[url('/auth/bg.png')] bg-cover bg-center shadow-xl md:max-w-[600px] lg:aspect-[3/4] xl:aspect-[4/3] xl:max-w-[700px] 2xl:max-w-[800px]">
              <div className='relative z-[1] flex h-full flex-col items-center justify-center p-6 lg:p-8'>
                <Carousel
                  opts={{ align: 'start', loop: true }}
                  setApi={setApi}
                  className='flex h-full w-full'
                >
                  <CarouselContent className='h-full'>
                    {slides.map(slide => (
                      <CarouselItem key={slide.id} className='h-full'>
                        <div className='flex h-full flex-col items-center justify-between gap-6 lg:gap-8'>
                          <div className='relative aspect-[5/3] w-full max-w-[400px] lg:max-w-[500px]'>
                            <Image
                              src='/auth/image-card.png'
                              alt='Glass card'
                              fill
                              className='rounded-2xl object-cover'
                              unoptimized
                            />
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <div className='relative h-[40px] w-[100px] sm:h-[48px] sm:w-[120px] lg:h-[64px] lg:w-[160px] xl:h-[80px] xl:w-[200px]'>
                                <Image
                                  src={slide.logo}
                                  alt={`${slide.title} logo`}
                                  fill
                                  className='object-contain'
                                />
                              </div>
                            </div>
                          </div>

                          <div className='mb-8 w-full max-w-[300px] px-2 text-center lg:max-w-[400px]'>
                            <Badge className='mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15'>
                              {slide.badge}
                            </Badge>
                            <h3 className='mb-3 text-lg font-semibold text-white lg:text-xl'>
                              {slide.title}
                            </h3>
                            <p className='text-sm leading-relaxed text-[#D9D9D9] lg:text-base'>
                              {slide.description}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <div className='absolute bottom-0 mt-6 flex w-full items-center justify-between'>
                    <CarouselPrevious className='relative left-0 h-8 w-8 translate-y-0 border-none bg-transparent text-white transition-all duration-200 hover:scale-110 hover:text-gray-300' />

                    <div className='flex items-center gap-2'>
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => api?.scrollTo(i)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            i === currentSlide
                              ? 'w-8 bg-white'
                              : 'w-2 bg-gray-600 hover:bg-gray-500'
                          }`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>

                    <CarouselNext className='relative right-0 h-8 w-8 translate-y-0 border-none bg-transparent text-white transition-all duration-200 hover:scale-110 hover:text-gray-300' />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;

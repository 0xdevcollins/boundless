'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
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
    <div className='bg-background min-h-screen w-full flex justify-center'>
      <div className='flex flex-col lg:flex-row h-screen w-full max-w-[1920px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto'>
        <Image
          src='/auth/top-left.png'
          alt='auth'
          width={248}
          height={231}
          className='absolute top-0 left-0 object-contain pointer-events-none z-0'
          unoptimized
        />
        <Image
          src='/auth/grid.svg'
          alt='grid'
          width={248}
          height={231}
          className='absolute bottom-0 left-0 object-cover pointer-events-none w-1/2 min-w-[500px] max-h-[254px] z-0'
          unoptimized
        />
        <div className='w-full h-full lg:basis-1/2 relative flex items-center justify-center px-6 py-10 lg:px-16 xl:px-24 2xl:px-32 overflow-hidden'>
          <div className='flex flex-col justify-center h-full max-w-[500px] w-full gap-6 lg:gap-10 relative z-10'>
            <Image
              src='/auth/logo.svg'
              alt='auth-logo'
              width={160}
              height={30}
              className='object-contain mx-auto lg:mx-0'
              unoptimized
            />
            <div className='space-y-6 lg:space-y-10'>{children}</div>
          </div>
        </div>

        {showCarousel && (
          <div className='hidden lg:flex w-full lg:basis-1/2 items-center justify-center p-6 lg:p-8 xl:p-10'>
            <div className="relative w-full max-w-[500px] md:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/3] h-full rounded-2xl border border-[#2B2B2B] overflow-hidden bg-[url('/auth/bg.png')] bg-cover bg-center shadow-xl">
              <div className='flex flex-col items-center justify-center h-full p-6 lg:p-8 relative z-10'>
                <Carousel
                  opts={{ align: 'start', loop: true }}
                  setApi={setApi}
                  className='w-full h-full flex'
                >
                  <CarouselContent className=' h-full'>
                    {slides.map(slide => (
                      <CarouselItem key={slide.id} className='h-full'>
                        <div className='flex flex-col items-center justify-between h-full gap-6 lg:gap-8'>
                          <div className='relative w-full max-w-[400px] lg:max-w-[500px] aspect-[5/3]'>
                            <Image
                              src='/auth/image-card.png'
                              alt='Glass card'
                              fill
                              className='object-cover rounded-2xl'
                              unoptimized
                            />
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <div className='relative w-[100px] h-[40px] sm:w-[120px] sm:h-[48px] lg:w-[160px] lg:h-[64px] xl:w-[200px] xl:h-[80px]'>
                                <Image
                                  src={slide.logo}
                                  alt={`${slide.title} logo`}
                                  fill
                                  className='object-contain'
                                />
                              </div>
                            </div>
                          </div>

                          <div className='text-center w-full max-w-[300px] lg:max-w-[400px] px-2 mb-8'>
                            <Badge className='inline-flex items-center text-xs font-medium backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 py-1 text-white mb-4 hover:bg-white/15 transition-colors'>
                              {slide.badge}
                            </Badge>
                            <h3 className='text-white text-lg lg:text-xl font-semibold mb-3'>
                              {slide.title}
                            </h3>
                            <p className='text-sm lg:text-base text-[#D9D9D9] leading-relaxed'>
                              {slide.description}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <div className='flex items-center justify-between w-full mt-6 absolute bottom-0'>
                    <CarouselPrevious className='relative left-0 translate-y-0 bg-transparent border-none text-white hover:text-gray-300 hover:scale-110 transition-all duration-200 h-8 w-8' />

                    <div className='flex items-center gap-2'>
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => api?.scrollTo(i)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            i === currentSlide
                              ? 'bg-white w-8'
                              : 'bg-gray-600 hover:bg-gray-500 w-2'
                          }`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>

                    <CarouselNext className='relative right-0 translate-y-0 bg-transparent border-none text-white hover:text-gray-300 hover:scale-110 transition-all duration-200 h-8 w-8' />
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

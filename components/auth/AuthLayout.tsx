'use client';
import Image from 'next/image';
import React from 'react';
import { Badge } from '../ui/badge';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface AuthLayoutProps {
  children: React.ReactNode;
  showCarousel?: boolean;
}

const AuthLayout = ({ children, showCarousel = true }: AuthLayoutProps) => {
  // Slide data
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
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className='bg-background'>
      <div className='flex flex-col lg:flex-row justify-between h-screen overflow-hidden'>
        {/* Left Panel - Auth Form */}
        <div className='w-full lg:basis-1/2 relative z-10 p-4 lg:p-0'>
          <Image
            src='/auth/top-left.png'
            alt='auth'
            width={248}
            height={231}
            className='object-cover absolute top-0 left-0 pointer-events-none z-10'
            unoptimized
          />
          <div className='flex flex-col justify-center h-full ml-4 lg:ml-[130px] mt-8 lg:mt-[33px] max-w-[500px] space-y-6 lg:space-y-8'>
            <Image
              src='/auth/logo.svg'
              alt='auth'
              width={123}
              height={22}
              className='object-cover'
              unoptimized
            />
            <div className='space-y-6 lg:space-y-8'>{children}</div>
          </div>
          <div className='w-full h-[254px]'>
            <Image
              src='/auth/grid.svg'
              alt='auth'
              width={248}
              height={231}
              className='object-cover absolute bottom-0 right-0 pointer-events-none 0 w-full h-[254px] -z-10'
            />
          </div>
        </div>

        {/* Right Panel - Carousel */}
        {showCarousel && (
          <div className='w-full lg:basis-1/2 hidden lg:flex items-center justify-center p-4 lg:p-8 min-h-[400px] lg:min-h-0'>
            <div
              className='w-[650px] max-w-[650px] h-[400px] lg:h-full rounded-[12px] border border-[#2B2B2B] relative overflow-hidden bg-black'
              style={{
                background: `
                  url('/auth/bg.png')
                  conic-gradient(from 180deg at 50% 50%,rgba(0,0,0,0.60) 44.56deg,rgba(0,0,0,0.20) 90.14deg,rgba(0,0,0,0.06) 131deg,#000 222.03deg,rgba(0,0,0,0.24) 286.68deg,rgba(0,0,0,0.00) 317.11deg,#000 360deg)
                `,
              }}
            >
              <div className='flex flex-col items-center justify-center h-full gap-4 lg:gap-8 relative z-10 px-2 lg:px-8 py-4 lg:py-0'>
                <Carousel
                  opts={{
                    align: 'start',
                    loop: true,
                  }}
                  className='w-full'
                  setApi={setApi}
                  plugins={[
                    Autoplay({
                      delay: 2000,
                    }),
                  ]}
                >
                  <CarouselContent>
                    {slides.map(slide => (
                      <CarouselItem key={slide.id}>
                        <div className='flex flex-col items-center gap-4 lg:gap-8'>
                          {/* Main card with glassmorphism effects */}
                          <div className='w-full max-w-[300px] lg:max-w-[536px] relative flex items-center justify-center'>
                            <Image
                              src='/auth/image-card.png'
                              alt='Glassmorphism card'
                              width={536}
                              height={320}
                              className='object-cover rounded-[12px] w-full h-auto'
                              unoptimized
                            />
                            <div className='z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                              <Image
                                src={slide.logo}
                                alt='logo'
                                width={537}
                                height={22}
                                className='object-cover w-[150px] lg:w-[250px] h-auto'
                              />
                            </div>
                          </div>

                          {/* Project information section */}
                          <div className='w-full max-w-[300px] lg:max-w-[400px]'>
                            <Badge className='w-fit text-xs font-medium backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 py-1 text-white mb-4'>
                              {slide.badge}
                            </Badge>

                            <div className='space-y-3'>
                              <h3 className='text-white text-xs lg:text-sm font-semibold'>
                                {slide.title}
                              </h3>
                              <p className='text-xs lg:text-sm text-[#D9D9D9] leading-relaxed mx-auto'>
                                {slide.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className='flex items-center justify-between gap-2 relative z-10 max-w-[300px] lg:max-w-[400px] mx-auto'>
                    <CarouselPrevious className='static bg-transparent border-none text-white translate-0' />
                    <div className='flex items-center justify-center gap-2'>
                      {slides.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => api?.scrollTo(dotIndex)}
                          className={`w-8 h-1.5 rounded-full transition-all duration-300 ${
                            dotIndex === currentSlide
                              ? 'bg-white'
                              : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <CarouselNext className='static bg-transparent border-none text-white translate-0' />
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

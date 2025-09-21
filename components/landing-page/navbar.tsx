'use client';
import Link from 'next/link';
import { Menu, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { BoundlessButton } from '../buttons';
import { useRouter } from 'next/navigation';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '../ui/sheet';

gsap.registerPlugin(useGSAP);

const menuItems = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/hackathons', label: 'Hackathons' },
  { href: '/grants', label: 'Grants' },
  { href: '/blog', label: 'Blog' },
];

export function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useGSAP(
    () => {
      gsap.fromTo(
        navbarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      const logoHover = gsap.to(logoRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
        paused: true,
      });

      const logoEnterHandler = () => logoHover.play();
      const logoLeaveHandler = () => logoHover.reverse();

      logoRef.current?.addEventListener('mouseenter', logoEnterHandler);
      logoRef.current?.addEventListener('mouseleave', logoLeaveHandler);

      const menuItems = menuRef.current?.querySelectorAll('a');
      const menuItemAnimations: Array<{
        item: Element;
        hoverTl: gsap.core.Timeline;
        enterHandler: () => void;
        leaveHandler: () => void;
      }> = [];

      menuItems?.forEach(item => {
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(item, {
          y: -1,
          duration: 0.2,
          ease: 'power2.out',
        });

        const enterHandler = () => hoverTl.play();
        const leaveHandler = () => hoverTl.reverse();

        item.addEventListener('mouseenter', enterHandler);
        item.addEventListener('mouseleave', leaveHandler);

        menuItemAnimations.push({
          item,
          hoverTl,
          enterHandler,
          leaveHandler,
        });
      });

      const ctaHover = gsap.to(ctaRef.current, {
        scale: 1.01,
        duration: 0.2,
        ease: 'power2.out',
        paused: true,
      });

      const ctaEnterHandler = () => ctaHover.play();
      const ctaLeaveHandler = () => ctaHover.reverse();

      ctaRef.current?.addEventListener('mouseenter', ctaEnterHandler);
      ctaRef.current?.addEventListener('mouseleave', ctaLeaveHandler);

      const scrollTl = gsap.timeline({ paused: true });
      scrollTl.to(navbarRef.current, {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(8px)',
        duration: 0.2,
        ease: 'power2.out',
      });

      const handleScroll = () => {
        if (window.scrollY > 50) {
          scrollTl.play();
        } else {
          scrollTl.reverse();
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        logoHover.kill();
        ctaHover.kill();
        scrollTl.kill();

        logoRef.current?.removeEventListener('mouseenter', logoEnterHandler);
        logoRef.current?.removeEventListener('mouseleave', logoLeaveHandler);

        menuItemAnimations.forEach(
          ({ item, hoverTl, enterHandler, leaveHandler }) => {
            hoverTl.kill();
            item.removeEventListener('mouseenter', enterHandler);
            item.removeEventListener('mouseleave', leaveHandler);
          }
        );

        ctaRef.current?.removeEventListener('mouseenter', ctaEnterHandler);
        ctaRef.current?.removeEventListener('mouseleave', ctaLeaveHandler);

        window.removeEventListener('scroll', handleScroll);
      };
    },
    { scope: navbarRef }
  );

  return (
    <nav
      ref={navbarRef}
      className='sticky top-0 z-50 max-h-[88px]  -mt-11 bg-[#030303A3] blur-s[12px]'
    >
      <div className='py-5 lg:px-[100px] md:px-[50px] px-5'>
        <div className='flex gap- justify-between items-center'>
          <div className='flex-shrink-0'>
            <Link
              ref={logoRef}
              href='/'
              onClick={() => router.push('/')}
              className='flex items-center'
            >
              <Image src='/auth/logo.svg' alt='logo' width={116} height={22} />
            </Link>
          </div>

          <div ref={menuRef} className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              {menuItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className='text-white hover:text-white/80 px-3 py-2 rounded-md md:text-xs lg:text-sm font-medium transition-colors'
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div ref={ctaRef} className='hidden md:block'>
            <BoundlessButton>
              <Link href='/auth/signin'>Get Started</Link>
            </BoundlessButton>
          </div>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

function MobileMenu() {
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const mobileLogoRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuItemsRef = useRef<HTMLDivElement>(null);
  const mobileCTARef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        mobileButtonRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      const buttonHover = gsap.to(mobileButtonRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
        paused: true,
      });

      const buttonEnterHandler = () => buttonHover.play();
      const buttonLeaveHandler = () => buttonHover.reverse();

      mobileButtonRef.current?.addEventListener(
        'mouseenter',
        buttonEnterHandler
      );
      mobileButtonRef.current?.addEventListener(
        'mouseleave',
        buttonLeaveHandler
      );

      return () => {
        buttonHover.kill();
        mobileButtonRef.current?.removeEventListener(
          'mouseenter',
          buttonEnterHandler
        );
        mobileButtonRef.current?.removeEventListener(
          'mouseleave',
          buttonLeaveHandler
        );
      };
    },
    { scope: mobileMenuRef }
  );

  const animateMobileMenuOpen = () => {
    gsap.fromTo(
      mobileLogoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    const menuItems = mobileMenuItemsRef.current?.querySelectorAll('a');
    if (menuItems) {
      gsap.fromTo(
        menuItems,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }

    gsap.fromTo(
      mobileCTARef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 0.2,
        ease: 'power2.out',
      }
    );
  };

  const animateMobileMenuClose = () => {
    gsap.to(
      [mobileLogoRef.current, mobileMenuItemsRef.current, mobileCTARef.current],
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      }
    );
  };

  return (
    <div ref={mobileMenuRef} className='md:hidden'>
      <Sheet
        onOpenChange={open => {
          if (open) {
            setTimeout(animateMobileMenuOpen, 100);
          } else {
            animateMobileMenuClose();
          }
        }}
      >
        <SheetTrigger>
          <BoundlessButton
            ref={mobileButtonRef}
            variant='outline'
            className='md:hidden'
          >
            <Menu />
          </BoundlessButton>
        </SheetTrigger>
        <SheetContent
          showCloseButton={false}
          side='top'
          className='pt-8 px-9 pb-16'
        >
          <div className='flex justify-between items-center'>
            <div className='flex-shrink-0'>
              <Link ref={mobileLogoRef} href='/' className='flex items-center'>
                <Image
                  src='/auth/logo.svg'
                  alt='logo'
                  width={116}
                  height={22}
                />
              </Link>
            </div>
            <SheetClose>
              <BoundlessButton variant='outline'>
                <XIcon className='w-5 h-5' />
              </BoundlessButton>
            </SheetClose>
          </div>
          <div ref={mobileMenuItemsRef} className='flex flex-col gap-4'>
            {menuItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className='text-white hover:text-white/80 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div ref={mobileCTARef}>
            <BoundlessButton size='xl' className='w-full' fullWidth>
              <Link href='/auth/signin'>Get Started</Link>
            </BoundlessButton>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

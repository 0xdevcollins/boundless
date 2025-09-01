import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { BoundlessButton } from '../buttons';

const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/hackathons', label: 'Hackathons' },
  { href: '/grants', label: 'Grants' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  return (
    <nav className='sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link href='/' className='flex items-center'>
              <Image src='/auth/logo.svg' alt='logo' width={100} height={100} />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
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
          </div>

          {/* Desktop CTA */}
          <div className='hidden md:block'>
            <BoundlessButton>
              <Link href='/auth/signin'>Get Started</Link>
            </BoundlessButton>
          </div>

          {/* Mobile menu */}
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='md:hidden'>
                  <Menu className='h-5 w-5 text-white' />
                  <span className='sr-only'>Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
                <nav className='flex flex-col gap-4 mt-8'>
                  {menuItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className='text-white hover:text-white/80 px-3 py-2 rounded-md text-base font-medium transition-colors'
                    >
                      {item.label}
                    </Link>
                  ))}
                  {/* Mobile CTA */}
                  <div className='pt-4 border-t border-border'>
                    <Button asChild className='w-full'>
                      <Link href='/auth/signin'>Get Started</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

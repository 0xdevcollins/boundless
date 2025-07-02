'use client';

import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'Grants', href: '/grants/explore' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Start a Project', href: '/projects/new' },
    { name: 'Initialize Project', href: '/init' },
    { name: 'Stellar Ecosystem', href: '/stellar' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav
      className={cn(
        'flex items-center justify-between px-4 lg:px-8 py-4 border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-50',
        className,
      )}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Boundless Logo" width={140} height={40} priority />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Desktop CTA Button */}
      <div className="hidden md:block">
        <Link href="/auth/signin">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[385px] pt-12">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/auth/signin">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">Get Started</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;

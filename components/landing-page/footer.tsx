import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-background/50 border-t border-border'>
      <div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
          {/* Copyright */}
          <div className='text-muted-foreground text-sm'>
            © {currentYear} Boundless. All rights reserved.
          </div>

          {/* Links */}
          <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6'>
            <Link
              href='/terms'
              className='text-muted-foreground hover:text-white/80 text-sm transition-colors'
            >
              Terms
            </Link>
            <Link
              href='/privacy'
              className='text-muted-foreground hover:text-white/80 text-sm transition-colors'
            >
              Privacy
            </Link>
            <Link
              href='/code-of-conduct'
              className='text-muted-foreground hover:text-white/80 text-sm transition-colors'
            >
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Discord', icon: '/footer/discord.svg', href: '#' },
    { name: 'Telegram', icon: '/footer/telegram.svg', href: '#' },
    { name: 'GitHub', icon: '/footer/github.svg', href: '#' },
    { name: 'LinkedIn', icon: '/footer/linkedin.svg', href: '#' },
    { name: 'X', icon: '/footer/x.svg', href: '#' },
  ];

  return (
    <footer className='bg-black border-t border-gray-800'>
      <div className='max-w py-8 px- sm:px- lg:px-'>
        {/* Desktop Layout */}
        <div className='hidden md:flex justify-between items-start'>
          {/* Left side - Logo and Copyright */}
          <div className='flex flex-col space-y-4'>
            <Image
              src='/footer/logo.svg'
              alt='Boundless'
              width={120}
              height={40}
              className='w-14 mb-14'
            />
            <div className='text-gray-400 text-sm'>
              © {currentYear} Boundless — Transparent, Community-Driven,
              Web3-Native Funding.
            </div>
          </div>

          {/* Right side - Links and Social Icons */}
          <div className='flex flex-col items-end space-y-6'>
            {/* Policy Links */}
            <div className='flex space-x-8 mb-14'>
              <Link
                href='/terms'
                className='text-gray-400 hover:text-white text-sm transition-colors'
              >
                Terms of Service
              </Link>
              <Link
                href='/privacy'
                className='text-gray-400 hover:text-white text-sm transition-colors'
              >
                Privacy Policy
              </Link>
            </div>

            {/* Social Icons */}
            <div className='flex space-x-4'>
              {socialLinks.map(social => (
                <>
                  <Link
                    key={social.name}
                    href={social.href}
                    className='hover:opacity-80 transition-opacity'
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={24}
                      height={24}
                      className='w-6 h-6'
                    />
                  </Link>
                  <div className='bg-[#2B2B2B] w-0.5 h-6'></div>
                </>
              ))}
              <Link href='#' className='hover:opacity-80 transition-opacity'>
                <Image
                  src='/footer/gmail.svg'
                  alt='gmail'
                  width={24}
                  height={24}
                  className='w-24 h-6'
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className='md:hidden flex flex-col items-center space-y-6'>
          {/* Logo */}
          <Image
            src='/footer/logo.svg'
            alt='Boundless'
            width={120}
            height={40}
            className='h-10 w-auto'
          />

          {/* Policy Links */}
          <div className='flex space-x-8'>
            <Link
              href='/terms'
              className='text-gray-400 hover:text-white text-sm transition-colors'
            >
              Terms of Service
            </Link>
            <Link
              href='/privacy'
              className='text-gray-400 hover:text-white text-sm transition-colors'
            >
              Privacy Policy
            </Link>
          </div>

          {/* Social Icons */}
          <div className='flex space-x-4'>
            {socialLinks.map(social => (
              <>
                <Link
                  key={social.name}
                  href={social.href}
                  className='hover:opacity-80 transition-opacity'
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={24}
                    height={24}
                    className='w-6 h-6'
                  />
                </Link>
                <div className='bg-[#2B2B2B] w-0.5 h-6'></div>
              </>
            ))}
            <Link href='#' className='hover:opacity-80 transition-opacity'>
              <Image
                src='/footer/gmail.svg'
                alt='gmail'
                width={24}
                height={24}
                className='w-24 h-6'
              />
            </Link>
          </div>

          {/* Copyright */}
          <div className='text-gray-400 text-sm text-center'>
            © {currentYear} Boundless — Transparent,
            <br />
            Community-Driven, Web3-Native Funding.
          </div>
        </div>
      </div>
    </footer>
  );
}

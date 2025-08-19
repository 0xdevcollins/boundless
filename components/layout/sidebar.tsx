'use client';
import React, { useEffect, useState } from 'react';
import {
  Package,
  Sun,
  HandHeart,
  Activity,
  Bell,
  Settings,
  Menu,
  User,
  LayoutDashboardIcon,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import { useAuth } from '@/hooks/use-auth';

const navigationItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboardIcon,
    href: '/user',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: Package,
    href: '/user/projects',
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: Sun,
    href: '/user/campaigns',
  },
  {
    id: 'grants',
    label: 'Grants',
    icon: HandHeart,
    href: '/user/grants',
  },
  {
    id: 'activities',
    label: 'My Activities',
    icon: Activity,
    href: '/user/activities',
  },
];

const utilityItems = [
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    href: '/user/notifications',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/user/settings',
  },
];

const SidebarLayout: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to determine if a route is active
  const isRouteActive = (href: string) => {
    if (href === '/user') {
      return pathname === '/user';
    }
    return pathname.startsWith(href);
  };

  // Don't render anything until client-side hydration is complete
  if (!mounted) {
    return null;
  }

  return (
    <Sidebar className='bg-background' variant='floating'>
      <motion.div
        initial='hidden'
        animate='visible'
        variants={staggerContainer}
        className='bg-sidebar text-sidebar-foreground flex h-full  flex-col'
      >
        <SidebarHeader className='pt-4 sm:pt-6 lg:pt-8 px-3 bg-[#1C1C1C]'>
          <motion.div
            className='flex items-center justify-between mb-4 sm:mb-6'
            variants={fadeInUp}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src='/logo.svg'
                alt='logo'
                width={100}
                height={100}
                className='w-2/3 sm:w-3/4'
              />
            </motion.div>
            {/* Mobile Menu Trigger - Always visible on mobile */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <SidebarTrigger className='text-white hover:text-gray-300 transition-colors md:hidden bg-[#2A2A2A] p-2 rounded-lg'>
                <Menu className='w-5 h-5' />
              </SidebarTrigger>
            </motion.div>
          </motion.div>
          <SidebarGroup>
            <SidebarGroupContent>
              <motion.div
                className='flex items-center space-x-3'
                variants={fadeInUp}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar className='w-8 h-8 sm:w-10 sm:h-10'>
                    <AvatarImage
                      src={user?.image || '/api/placeholder/40/40'}
                    />
                    <AvatarFallback className='bg-blue-500 text-white'>
                      {user?.name ? (
                        <span className='text-xs font-semibold'>
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      ) : (
                        <User className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className='flex-1 min-w-0'>
                  <p className='text-white text-xs sm:text-sm font-semibold truncate'>
                    {user?.name || user?.email || 'User'}
                  </p>
                  {user?.email && user?.name && (
                    <p className='text-gray-400 text-xs truncate'>
                      {user.email}
                    </p>
                  )}
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge
                    variant='secondary'
                    className='w-4 h-4 sm:w-5 sm:h-5 p-0 rounded-full bg-[#2B2B2B] flex-shrink-0'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='10'
                      height='10'
                      viewBox='0 0 12 12'
                      fill='none'
                      className='w-2.5 h-2.5 sm:w-3 sm:h-3'
                    >
                      <path
                        d='M8.8166 2.70063C9.21811 2.32189 9.85061 2.33937 10.2297 2.74067C10.6086 3.14191 10.5904 3.77445 10.1896 4.15375L4.98945 9.06586C4.60405 9.42986 4.00082 9.42986 3.61543 9.06586L1.67207 7.22992C1.27059 6.8507 1.25282 6.21736 1.63203 5.81586C2.0113 5.41525 2.64389 5.397 3.04511 5.77582L4.30195 6.96235L8.8166 2.70063Z'
                        fill='#787878'
                      />
                    </svg>
                  </Badge>
                </motion.div>
              </motion.div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarHeader>

        <SidebarContent className='bg-[#1C1C1C]'>
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className='sr-only'>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <motion.div variants={staggerContainer}>
                <SidebarMenu>
                  {navigationItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = isRouteActive(item.href);

                    return (
                      <motion.div
                        key={item.id}
                        variants={fadeInUp}
                        custom={index}
                      >
                        <SidebarMenuItem>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <SidebarMenuButton
                              onClick={() => router.push(item.href)}
                              className={cn(
                                'w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-3 sm:py-5 rounded-lg text-left transition-colors overflow-hidden relative',
                                isActive
                                  ? 'bg-background text-white'
                                  : 'text-gray-400 hover:text-white hover:bg-background/50'
                              )}
                            >
                              <Icon
                                className={cn(
                                  'w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0',
                                  isActive ? 'text-white' : 'text-gray-400'
                                )}
                              />
                              {isActive && (
                                <motion.span
                                  className='absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 sm:h-7 bg-[#A7F950] rounded-r-[2px]'
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  transition={{ delay: 0.1 }}
                                />
                              )}
                              <span className='text-xs sm:text-sm font-medium truncate'>
                                {item.label}
                              </span>
                            </SidebarMenuButton>
                          </motion.div>
                        </SidebarMenuItem>
                      </motion.div>
                    );
                  })}
                </SidebarMenu>
              </motion.div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Utility Navigation */}
        <SidebarFooter className='pb-8 sm:pb-14 border-t border-[#2A2A2A] bg-[#1C1C1C]'>
          <SidebarGroup>
            <SidebarGroupContent>
              <motion.div variants={staggerContainer}>
                <SidebarMenu>
                  {utilityItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = isRouteActive(item.href);

                    return (
                      <motion.div
                        key={item.id}
                        variants={fadeInUp}
                        custom={index}
                      >
                        <SidebarMenuItem>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <SidebarMenuButton
                              onClick={() => router.push(item.href)}
                              className={cn(
                                'w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg text-left transition-colors',
                                isActive
                                  ? 'text-white bg-[#2A2A2A]/50'
                                  : 'text-gray-400 hover:text-white hover:bg-[#2A2A2A]/50'
                              )}
                            >
                              <Icon className='w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
                              <span className='text-xs sm:text-sm font-medium truncate'>
                                {item.label}
                              </span>
                            </SidebarMenuButton>
                          </motion.div>
                        </SidebarMenuItem>
                      </motion.div>
                    );
                  })}
                </SidebarMenu>
              </motion.div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </motion.div>
    </Sidebar>
  );
};

export default SidebarLayout;

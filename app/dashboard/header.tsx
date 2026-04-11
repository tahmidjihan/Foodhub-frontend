'use client';
import React, { useEffect } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '../auth/useAuth';
import { useRouter } from 'next/navigation';

interface Props {}

function Header(props: Props) {
  const {} = props;
  const session = useAuth();
  const router = useRouter();

  // Handle authentication check and redirects
  useEffect(() => {
    if (!session.isPending && !session.data?.user) {
      // Not logged in - redirect to login
      router.push('/auth/login');
    }
  }, [session.data?.user, session.isPending, router]);

  // Show loading state while checking auth
  if (session.isPending) {
    return (
      <header className='flex h-16 dark shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/50'>
        <div className='flex items-center gap-2 w-full'>
          <div className='text-sm text-zinc-400'>Loading...</div>
        </div>
      </header>
    );
  }

  // Don't render content if not authenticated
  if (!session.data?.user) {
    return null;
  }

  return (
    <header className='flex h-16 dark shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/50'>
      <div className='flex items-center gap-2 w-full'>
        <SidebarTrigger className='-ml-1 text-white' />
        <Separator
          orientation='vertical'
          className='mr-2 data-[orientation=vertical]:h-4'
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink href='#'>Order food with foodHub</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}

export default Header;

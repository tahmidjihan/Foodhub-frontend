import React, { use } from 'react';
import { AppSidebar } from '@/components/app-sidebar';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Header from './header';
import { Toaster } from 'sonner';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='dark min-h-screen bg-zinc-950'>
      <Toaster />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='px-4 sm:px-6 lg:px-8'>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Layout;

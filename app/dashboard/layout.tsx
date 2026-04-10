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
    <div className='dark min-h-screen'>
      <Toaster />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Layout;

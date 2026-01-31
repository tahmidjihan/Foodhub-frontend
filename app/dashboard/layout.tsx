import React, { use } from 'react';
import { AppSidebar } from '@/components/app-sidebar';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Header from './header';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='dark min-h-screen'>
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

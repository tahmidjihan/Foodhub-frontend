'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ShoppingBag,
  User,
  Shield,
  Users,
  FileText,
  Grid3X3,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavItems } from '@/components/nav-items';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAuth } from '@/app/auth/useAuth';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'FoodHub',
      logo: PieChart,
      plan: 'Order Food',
    },
  ],

  projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useAuth();
  const userItems = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: Frame,
      role: 'user',
    },
    {
      name: 'Meals',
      url: '/dashboard/meals',
      icon: PieChart,
      role: 'user',
    },
    {
      name: 'Providers',
      url: '/dashboard/providers',
      icon: Map,
      role: 'user',
    },
    {
      name: 'Orders',
      url: '/dashboard/orders',
      icon: ShoppingBag,
      role: 'user',
    },
    {
      name: 'Cart',
      url: '/dashboard/cart',
      icon: BookOpen,
      role: 'user',
    },
  ];
  const providerItems = [
    {
      name: 'My Orders',
      url: '/dashboard/provider/myOrders',
      icon: AudioWaveform,
      role: 'Provider',
    },
    {
      name: 'My Meals',
      url: '/dashboard/provider/myMeals',
      icon: PieChart,
      role: 'Provider',
    },
    {
      name: 'Create Meal',
      url: '/dashboard/provider/createMeal',
      icon: SquareTerminal,
      role: 'Provider',
    },
  ];
  const adminItems = [
    {
      name: 'Manage Users',
      url: '/dashboard/admin/users',
      icon: Users,
      role: 'Admin',
    },
    {
      name: 'Manage Orders',
      url: '/dashboard/admin/orders',
      icon: FileText,
      role: 'Admin',
    },
    {
      name: 'Manage Categories',
      url: '/dashboard/admin/categories',
      icon: Grid3X3,
      role: 'Admin',
    },
  ];
  // @ts-ignore
  const role = session.data?.user?.role;
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {role == 'Customer' && <NavItems items={userItems} />}
        {role == 'Provider' && <NavItems items={providerItems} />}
        {role == 'Admin' && <NavItems items={adminItems} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

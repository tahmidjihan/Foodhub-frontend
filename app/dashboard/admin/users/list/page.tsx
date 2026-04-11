'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';
import Suspend from '../suspend';
import Activate from '../activate';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Provider' | 'Customer';
  isActive: boolean;
}

export default function AdminUsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/admin/users', {
          credentials: 'include',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(Array.isArray(data) ? data : []);
        } else {
          const errorData = await res.json().catch(() => ({}));
          setError(errorData.message || `Failed to fetch users (${res.status})`);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className='py-6 space-y-6 mx-auto max-w-7xl w-full'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-xl bg-[#ff4d00]/10 flex items-center justify-center'>
            <Shield className='w-5 h-5 text-[#ff4d00]' />
          </div>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold text-white'>User Management</h1>
            <p className='text-zinc-400 text-sm'>Manage all platform users</p>
          </div>
        </div>
        <Link href='/dashboard/admin/users'>
          <Button
            variant='outline'
            size='sm'
            className='border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 hover:text-white'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Admin
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      {!loading && !error && (
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          <Card className='bg-zinc-900/50 border-zinc-800'>
            <CardContent className='p-4'>
              <p className='text-xs text-zinc-500 mb-1'>Total Users</p>
              <p className='text-2xl font-bold text-white'>{users.length}</p>
            </CardContent>
          </Card>
          <Card className='bg-zinc-900/50 border-zinc-800'>
            <CardContent className='p-4'>
              <p className='text-xs text-zinc-500 mb-1'>Active</p>
              <p className='text-2xl font-bold text-emerald-400'>
                {users.filter((u) => u.isActive).length}
              </p>
            </CardContent>
          </Card>
          <Card className='bg-zinc-900/50 border-zinc-800'>
            <CardContent className='p-4'>
              <p className='text-xs text-zinc-500 mb-1'>Suspended</p>
              <p className='text-2xl font-bold text-red-400'>
                {users.filter((u) => !u.isActive).length}
              </p>
            </CardContent>
          </Card>
          <Card className='bg-zinc-900/50 border-zinc-800'>
            <CardContent className='p-4'>
              <p className='text-xs text-zinc-500 mb-1'>Providers</p>
              <p className='text-2xl font-bold text-blue-400'>
                {users.filter((u) => u.role === 'Provider').length}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className='bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center'>
          <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
          <p className='text-red-400'>{error}</p>
          <p className='text-zinc-500 text-sm mt-2'>Please try refreshing the page</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <Card className='bg-zinc-900/50 border-zinc-800'>
          <CardContent className='p-6'>
            <Skeleton className='h-8 w-48 bg-zinc-800 mb-4' />
            <div className='space-y-3'>
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className='h-12 w-full bg-zinc-800' />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      {!loading && !error && users.length > 0 && (
        <Card className='bg-zinc-900/50 border-zinc-800 overflow-hidden'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-white flex items-center gap-2'>
              <Users className='w-5 h-5 text-[#ff4d00]' />
              All Users
            </CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <Table>
              <TableCaption className='pb-4'>
                A list of all users in the system
              </TableCaption>
              <TableHeader>
                <TableRow className='border-zinc-800 hover:bg-transparent'>
                  <TableHead className='w-[200px] text-zinc-400'>Name</TableHead>
                  <TableHead className='w-[250px] text-zinc-400'>Email</TableHead>
                  <TableHead className='w-[100px] text-zinc-400'>Role</TableHead>
                  <TableHead className='w-[100px] text-zinc-400'>Status</TableHead>
                  <TableHead className='w-[120px] text-zinc-400'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className='border-zinc-800/50'>
                    <TableCell className='font-medium text-white'>
                      {user.name}
                    </TableCell>
                    <TableCell className='text-zinc-400'>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          user.role === 'Provider'
                            ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                            : user.role === 'Admin'
                              ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                              : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          user.isActive
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                            : 'bg-red-500/15 text-red-400 border border-red-500/20'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Suspended'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className='flex gap-2'>
                        {user.isActive ? (
                          <Suspend id={user.id} />
                        ) : (
                          <Activate id={user.id} />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && users.length === 0 && (
        <div className='text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-xl'>
          <Users className='w-16 h-16 text-zinc-600 mx-auto mb-4' />
          <h3 className='text-xl font-bold text-white mb-2'>No users found</h3>
          <p className='text-zinc-400 mb-6'>
            There are no users registered in the system yet.
          </p>
          <Link href='/dashboard/admin/users'>
            <Button className='bg-[#ff4d00] hover:bg-[#ff7433] text-white'>
              Back to Admin Dashboard
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

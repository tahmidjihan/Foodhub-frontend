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
import { Users, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Suspend from './suspend';
import Activate from './activate';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  let users: any[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/admin/users`,
      {
        credentials: 'include',
        cache: 'no-store',
      },
    );
    if (res.ok) {
      const data = await res.json();
      users = Array.isArray(data) ? data : [];
    } else {
      error = 'Failed to fetch users';
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    error = 'Error connecting to server';
  }

  return (
    <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-neutral-50'>Admin - Users</h1>
      </div>

      {error && (
        <div className='bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center'>
          <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
          <p className='text-red-400'>{error}</p>
          <p className='text-zinc-500 text-sm mt-2'>Please try refreshing the page</p>
        </div>
      )}

      {!error && users.length > 0 ? (
        <Table>
          <TableCaption>A list of all users in the system</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[250px]'>Name</TableHead>
              <TableHead className='w-[250px]'>Email</TableHead>
              <TableHead className='w-[100px]'>Role</TableHead>
              <TableHead className='w-[100px]'>Status</TableHead>
              <TableHead className='w-[150px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell className='font-medium text-white'>
                  {user.name}
                </TableCell>
                <TableCell className='font-medium text-white'>
                  {user.email}
                </TableCell>
                <TableCell className='font-medium text-white'>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.role === 'Provider'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className='font-medium text-white'>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.isActive
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {user.isActive ? 'Active' : 'Suspended'}
                  </span>
                </TableCell>
                <TableCell className='font-medium text-white'>
                  <div className='flex gap-2'>
                    {user.isActive == true ? (
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
      ) : (
        !error && (
          <div className='text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-xl'>
            <Users className='w-16 h-16 text-zinc-600 mx-auto mb-4' />
            <h3 className='text-xl font-bold text-white mb-2'>No users found</h3>
            <p className='text-zinc-400 mb-6'>
              There are no users registered in the system yet.
            </p>
            <Link href='/dashboard'>
              <Button className='bg-[#ff4d00] hover:bg-[#ff7433] text-white'>
                Back to Dashboard
              </Button>
            </Link>
          </div>
        )
      )}
    </div>
  );
}

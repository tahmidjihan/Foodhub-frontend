import React from 'react';
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
import { cookies } from 'next/headers';

export default async function AdminUsersPage() {
  const cookieStore = await cookies();
  const users: any[] = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/admin/users`,
    {
      headers: {
        cookie: cookieStore.toString(),
      },
    },
  ).then((res) => res.json());

  return (
    <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-neutral-50'>Admin - Users</h1>
      </div>

      <Table>
        <TableCaption>A list of all users in the system</TableCaption>
        <TableHeader>
          <TableRow>
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
                <div className='flex gap-2'>
                  <Button variant='outline' size='sm'>
                    Edit
                  </Button>
                  <Button variant='destructive' size='sm'>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

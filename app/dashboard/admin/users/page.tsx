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

// Mock data for admin users
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'User',
    status: 'Active',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Provider',
    status: 'Active',
    createdAt: '2024-01-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'Inactive',
    createdAt: '2024-02-01',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Provider',
    status: 'Active',
    createdAt: '2024-02-10',
  },
];

export default function AdminUsersPage() {
  return (
    <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-neutral-50'>Admin - Users</h1>
        <Button>Add User</Button>
      </div>

      <Table>
        <TableCaption>A list of all users in the system</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>ID</TableHead>
            <TableHead className='w-[200px]'>Name</TableHead>
            <TableHead className='w-[250px]'>Email</TableHead>
            <TableHead className='w-[100px]'>Role</TableHead>
            <TableHead className='w-[100px]'>Status</TableHead>
            <TableHead className='w-[120px]'>Joined</TableHead>
            <TableHead className='w-[150px]'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className='font-medium text-white'>#{user.id}</TableCell>
              <TableCell className='font-medium text-white'>{user.name}</TableCell>
              <TableCell className='font-medium text-white'>{user.email}</TableCell>
              <TableCell className='font-medium text-white'>
                <span className={`px-2 py-1 rounded text-xs ${
                  user.role === 'Provider' 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {user.role}
                </span>
              </TableCell>
              <TableCell className='font-medium text-white'>
                <span className={`px-2 py-1 rounded text-xs ${
                  user.status === 'Active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {user.status}
                </span>
              </TableCell>
              <TableCell className='font-medium text-white'>{user.createdAt}</TableCell>
              <TableCell className='font-medium text-white'>
                <div className='flex gap-2'>
                  <Button variant='outline' size='sm'>Edit</Button>
                  <Button variant='destructive' size='sm'>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

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
import { Input } from '@/components/ui/input';
import CreateCategory from './createCategory';
import DeleteCategory from './deleteCategory';

export default async function AdminCategoriesPage() {
  const cookieStore = await cookies();
  let categories: any[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/categories`,
      {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      console.error('Failed to fetch categories');
      categories = [];
    } else {
      const data = await response.json();
      categories = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    categories = [];
  }

  console.log(categories);

  return (
    <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
      <div className='flex justify-between items-center flex-wrap space-y-2'>
        <h1 className='text-3xl font-bold text-neutral-50'>
          Admin - Categories
        </h1>
        <CreateCategory />
      </div>

      <Table>
        <TableCaption>A list of all categories in the system</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[150px]'>Name</TableHead>
            <TableHead className='w-[300px]'>Description</TableHead>
            <TableHead className='w-[100px]'>Status</TableHead>
            <TableHead className='w-[120px]'>Created</TableHead>
            <TableHead className='w-[150px]'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category: any) => (
              <TableRow key={category.id}>
                <TableCell className='font-medium text-white'>
                  {category.name}
                </TableCell>
                <TableCell className='font-medium text-white text-sm'>
                  {category.description || 'No description'}
                </TableCell>
                <TableCell className='font-medium text-white'>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      category.status === 'Active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {category.status || 'Active'}
                  </span>
                </TableCell>
                <TableCell className='font-medium text-white text-sm'>
                  {category.createdAt
                    ? new Date(category.createdAt).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell className='font-medium text-white'>
                  <div className='flex gap-2'>
                    <DeleteCategory id={category.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className='text-center text-white py-8'>
                No categories found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

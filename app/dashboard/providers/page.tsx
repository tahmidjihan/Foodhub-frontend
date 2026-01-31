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
import Link from 'next/link';
import { cookies } from 'next/headers';

interface Props {
  searchParams: { skip?: string; take?: string };
}

async function Page(props: Props) {
  const { searchParams } = props;
  const { skip = '0', take = '10' } = searchParams;
  const pagination = {
    skip: Math.max(0, parseInt(skip) || 0),
    take: Math.min(50, parseInt(take) || 10),
  };

  const cookieStore = cookies(); // Not strictly needed for public endpoint, but good practice if it becomes authenticated
  let data: any[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/providers?skip=${pagination.skip}&take=${pagination.take}`,
    );
    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error('Error fetching providers:', error);
    data = [];
  }
  if (!Array.isArray(data)) data = [];

  return (
    <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
      <h1 className='text-3xl font-bold text-neutral-50'>Providers</h1>
      <Table>
        <TableCaption>A list of all FoodHub providers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Name</TableHead>
            <TableHead className='w-[100px]'>Email</TableHead>
            {/* Add more headers if needed */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((provider: any) => (
              <TableRow key={provider.id}>
                <TableCell className='font-medium text-white'>
                  <Link href={`/dashboard/providers/${provider.id}`}>
                    {provider.name}
                  </Link>
                </TableCell>
                <TableCell className='font-medium text-white'>
                  {provider.email}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={2}
                className='text-center text-muted-foreground py-8'
              >
                No providers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination can be added here if needed, consistent with other list pages */}
    </div>
  );
}

export default Page;

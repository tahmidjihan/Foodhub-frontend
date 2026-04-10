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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { cookies } from 'next/headers';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Props {
  searchParams: Promise<{ skip?: string; take?: string }>;
}

async function Page(props: Props) {
  const { searchParams } = await props;
  const { skip = '0', take = '10' } = searchParams;
  const pagination = {
    skip: Math.max(0, parseInt(skip) || 0),
    take: Math.min(50, parseInt(take) || 10),
  };

  let data: any[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/providers?skip=${pagination.skip}&take=${pagination.take}`,
      { cache: 'no-store' }
    );
    if (res.ok) {
      data = await res.json();
    } else {
      error = 'Failed to fetch providers';
    }
  } catch (error) {
    console.error('Error fetching providers:', error);
    error = 'Error connecting to server';
    data = [];
  }
  if (!Array.isArray(data)) data = [];

  const currentPage = Math.floor(pagination.skip / pagination.take) + 1;
  const hasMore = data.length === pagination.take;

  return (
    <div className='dark bg-black min-h-screen'>
      <Navbar />
      <div className='p-8 space-y-6 mx-auto max-w-7xl w-full pt-40'>
        <div>
          <h1 className='text-3xl font-bold text-neutral-50'>Providers</h1>
          <p className='text-zinc-400 text-sm mt-1'>
            {data.length} provider{data.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {error && (
          <div className='bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center'>
            <p className='text-red-400'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md'
            >
              Try Again
            </button>
          </div>
        )}

        {data.length > 0 ? (
          <>
            <Table>
              <TableCaption>A list of all FoodHub providers.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>Name</TableHead>
                  <TableHead className='w-[100px]'>Email</TableHead>
                  <TableHead className='w-[100px]'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((provider: any) => (
                  <TableRow key={provider.id}>
                    <TableCell className='font-medium text-white'>
                      <Link
                        href={`/providers/${provider.id}`}
                        className='hover:text-[#ff4d00] transition-colors'
                      >
                        {provider.name}
                      </Link>
                    </TableCell>
                    <TableCell className='font-medium text-zinc-300'>
                      {provider.user?.email || provider.email || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/meals?provider=${provider.id}`}
                        className='text-[#ff4d00] hover:underline text-sm'
                      >
                        View Meals
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {(currentPage > 1 || hasMore) && (
              <div className='bg-orange-500/10 border border-orange-500/30 rounded-xl py-3 flex items-center justify-center'>
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          href={`?skip=${Math.max(
                            0,
                            pagination.skip - pagination.take
                          )}&take=${pagination.take}`}
                        />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        href={`?skip=${pagination.skip}&take=${pagination.take}`}
                        isActive
                      >
                        {currentPage}
                      </PaginationLink>
                    </PaginationItem>
                    {hasMore && (
                      <PaginationItem>
                        <PaginationNext
                          href={`?skip=${
                            pagination.skip + pagination.take
                          }&take=${pagination.take}`}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          !error && (
            <div className='text-center py-16'>
              <div className='w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-4xl'>👨‍🍳</span>
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>
                No providers found
              </h3>
              <p className='text-zinc-400'>
                Check back later or sign up to become a provider!
              </p>
            </div>
          )
        )}

        {/* Skeleton loader for initial load */}
        {data.length === 0 && !error && (
          <div className='space-y-4'>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className='bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex items-center gap-4'
              >
                <Skeleton className='h-6 w-32' />
                <Skeleton className='h-6 w-48' />
                <Skeleton className='h-6 w-20' />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Page;

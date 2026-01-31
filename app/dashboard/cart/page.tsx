import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
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
import Link from 'next/link';
import { cookies } from 'next/headers';
import TR from './tableRow';

interface Props {}

async function Page(props: Props) {
  const {} = props;
  const cookieStore = await cookies();
  //   const pagination = { skip: 0, take: 10 };
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/cart`, {
    headers: {
      cookie: cookieStore.toString(),
    },
  }).then((res) => res.json());
  console.log(data);
  return (
    <>
      <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
        <div>
          <h1 className='text-3xl font-bold text-neutral-50'>Providers</h1>
        </div>
        <Table>
          <TableCaption>A list of meals in your cart.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Name</TableHead>
              <TableHead className='w-[100px]'>Order Now</TableHead>
              <TableHead className='w-[50px]'>Order Now</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any) => (
              <TR key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
        {/* <div className='bg-orange-500 rounded-md py-2 flex items-center justify-center'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?skip=${pagination.skip - pagination.take}&take=${pagination.take}`}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href={`?skip=${pagination.skip + pagination.take}&take=${pagination.take}`}
                  isActive
                >
                  {pagination.skip / pagination.take + 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={`?skip=${pagination.skip + pagination.take}&take=${pagination.take}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div> */}
      </div>
    </>
  );
}

export default Page;

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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

interface Props {}

async function Page(props: Props) {
  const {} = props;
  const pagination = { skip: 0, take: 10 };
  const data = await fetch(
    `${process.env.BACKEND}/api/providers?skip=${pagination.skip}&take=${pagination.take}`,
  ).then((res) => res.json());
  //   console.log(data);
  return (
    <>
      <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
        <div>
          <h1 className='text-3xl font-bold text-neutral-50'>Providers</h1>
        </div>
        <Table>
          <TableCaption>A list of Providers.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium  text-white'>
                  <Link href={`/dashboard/providers/${item.id}`}>
                    {item.name}
                  </Link>
                  {/* {item.name} */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='bg-orange-500 rounded-md py-2 flex items-center justify-center'>
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
        </div>
      </div>
    </>
  );
}

export default Page;

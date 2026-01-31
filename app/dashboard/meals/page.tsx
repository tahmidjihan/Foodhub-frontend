import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from 'lucide-react';
import MealCard from './mealCard';

interface Props {}

async function Page(props: Props) {
  // const {} = props;
  const pagination = { skip: 0, take: 10 };
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/meals?skip=${pagination.skip}&take=${pagination.take}`,
  ).then((res) => res.json());
  //   console.log(data);
  return (
    <>
      <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
        <div>
          <h1 className='text-3xl font-bold text-neutral-50'>Meals</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {data.map((item: any) => (
            <MealCard key={item.id} item={item} />
          ))}
        </div>
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

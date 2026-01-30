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

interface Props {}

async function Page(props: Props) {
  const {} = props;
  const pagination = { skip: 0, take: 10 };
  const data = await fetch(
    `${process.env.BACKEND}/api/meals?skip=${pagination.skip}&take=${pagination.take}`,
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
            <Card
              key={item.id}
              className='relative mx-auto w-full max-w-sm pt-0'
            >
              <div className='absolute inset-0 z-30 aspect-video bg-black/35' />
              <img
                src={item.image}
                alt='Event cover'
                className='relative rounded-t-md z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40'
              />
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className='w-full'>Order Now</Button>
              </CardFooter>
            </Card>
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
                <PaginationLink href={`?skip=0&take=${pagination.take}`}>
                  1
                </PaginationLink>
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

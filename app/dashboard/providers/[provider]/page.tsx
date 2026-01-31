import React from 'react';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MealCard from '../../meals/mealCard';
interface Props {}

async function Page({ params, searchParams }: any) {
  const param = await params;
  const provider = await param.provider;
  console.log(provider);
  // const pagination = { skip: 0, take: 10 };
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/providers/${provider}`,
  )
    .then((res) => res.json())
    .catch((error) => console.error(error));
  // const data = [
  //   {
  //     id: 1,
  //     name: 'Provider 1',
  //     description: 'Description 1',
  //     image: 'https://via.placeholder.com/150',
  //     meals: [
  //       {
  //         id: 1,
  //         name: 'Meal 1',
  //         description: 'Description 1',
  //         image: 'https://via.placeholder.com/150',
  //       },
  //       {
  //         id: 2,
  //         name: 'Meal 2',
  //         description: 'Description 2',
  //         image: 'https://via.placeholder.com/150',
  //       },
  //     ],
  //   },
  // ];
  return (
    <>
      <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
        <div>
          <h1 className='text-3xl font-bold text-neutral-50'>
            Meals by your provider
          </h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {data.meals.map((item: any) => (
            <MealCard key={item.id} item={item} />
          ))}
        </div>
      </div>
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
    </>
  );
}

export default Page;

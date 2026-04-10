'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, ShoppingCart, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface MealClientProps {
  data: any[];
  error: string | null;
  initialFilters: {
    category: string;
    search: string;
    type: string;
    sortBy: string;
    sortOrder: string;
    skip: number;
    take: number;
  };
  total?: number;
}

function MealCard({ item }: { item: any }) {
  async function addToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/cart`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        MealId: item.id,
        quantity: 1,
      }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success('Added to Cart successfully');
          return res.json();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error adding to Cart');
      });
  }

  return (
    <Link href={`/meals/${item.id}`} className='group block h-full'>
      <Card className='bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all h-full flex flex-col'>
        <div className='relative aspect-video overflow-hidden rounded-t-xl'>
          <img
            src={item.image}
            alt={item.name}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
          {item.avgRating && (
            <div className='absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1'>
              <Star className='w-3 h-3 text-yellow-400 fill-yellow-400' />
              <span className='text-xs text-white font-medium'>
                {item.avgRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <CardHeader className='pb-2 flex-1'>
          <CardTitle className='text-lg text-white group-hover:text-[#ff4d00] transition-colors line-clamp-1'>
            {item.name}
          </CardTitle>
          <CardDescription className='line-clamp-2 text-sm text-zinc-400'>
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent className='pb-2'>
          <div className='flex items-center gap-2 flex-wrap'>
            <Badge className='bg-zinc-800 text-zinc-300 capitalize'>
              {item.type}
            </Badge>
            {item.Category && (
              <Badge variant='outline' className='border-zinc-700 text-zinc-400'>
                {item.Category.name}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className='flex items-center justify-between pt-2 border-t border-zinc-800'>
          <span className='text-xl font-bold text-[#ff4d00]'>
            ${item.price.toFixed(2)}
          </span>
          <Button
            onClick={addToCart}
            size='sm'
            className='bg-[#ff4d00] hover:bg-[#ff7433] text-white'
          >
            <ShoppingCart className='w-4 h-4 mr-1' />
            Add
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

function MealSkeleton() {
  return (
    <Card className='bg-zinc-900/50 border-zinc-800 h-full'>
      <Skeleton className='aspect-video w-full rounded-t-xl' />
      <CardHeader className='pb-2'>
        <Skeleton className='h-5 w-3/4 mb-2' />
        <Skeleton className='h-4 w-full' />
      </CardHeader>
      <CardContent className='pb-2'>
        <Skeleton className='h-6 w-20' />
      </CardContent>
      <CardFooter className='pt-2 border-t border-zinc-800'>
        <Skeleton className='h-8 w-24' />
      </CardFooter>
    </Card>
  );
}

export default function MealClient({ data, error, initialFilters, total }: MealClientProps) {
  const [loading, setLoading] = useState(true);
  const [preference, setPreference] = useState(initialFilters.type || 'both');
  const [category, setCategory] = useState(initialFilters.category || 'all');
  const [categories, setCategories] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || '');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>(
    (initialFilters.sortOrder as 'asc' | 'desc' | '') || ''
  );
  const [searchQuery, setSearchQuery] = useState(initialFilters.search || '');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/api/categories`
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  useEffect(() => {
    // Simulate brief loading for skeleton display
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Filter by type
    if (preference !== 'both') {
      filtered = filtered.filter((item) => item.type === preference);
    }

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter((item) => item.categoryId === category);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy) {
      filtered.sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'price') {
          comparison = a.price - b.price;
        } else if (sortBy === 'name') {
          comparison = a.name.localeCompare(b.name);
        }
        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return filtered;
  }, [preference, category, searchQuery, sortBy, sortOrder, data]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger re-filter (searchQuery is already in useMemo deps)
  };

  const pagination = {
    skip: initialFilters.skip,
    take: initialFilters.take,
  };

  const currentPage = Math.floor(pagination.skip / pagination.take) + 1;

  return (
    <div className='p-8 space-y-6 mx-auto max-w-7xl w-full pt-24'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-neutral-50'>Meals</h1>
          <p className='text-zinc-400 text-sm mt-1'>
            {loading ? 'Loading...' : `${filteredData.length} meals found`}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className='flex gap-2 w-full md:w-96'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500' />
            <Input
              type='text'
              placeholder='Search meals...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-10 bg-zinc-900/50 border-zinc-800 text-white'
            />
          </div>
          <Button
            type='button'
            variant='outline'
            onClick={() => setShowFilters(!showFilters)}
            className='border-zinc-800'
          >
            <Filter className='w-4 h-4 md:mr-2' />
            <span className='hidden md:inline'>Filters</span>
          </Button>
        </form>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className='bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {/* Type Filter */}
          <div>
            <label className='text-sm font-medium text-zinc-300 mb-2 block'>
              Type
            </label>
            <div className='flex gap-2'>
              {['both', 'veg', 'non-veg'].map((type) => (
                <Button
                  key={type}
                  size='sm'
                  variant={preference === type ? 'default' : 'outline'}
                  onClick={() => setPreference(type)}
                  className={`flex-1 ${
                    preference === type
                      ? 'bg-[#ff4d00] hover:bg-[#ff7433]'
                      : 'border-zinc-800'
                  }`}
                >
                  {type === 'both' ? 'All' : type === 'veg' ? 'Veg' : 'Non-Veg'}
                </Button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className='text-sm font-medium text-zinc-300 mb-2 block'>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full bg-zinc-900 border border-zinc-800 text-white p-2.5 rounded-md'
            >
              <option value='all' className='bg-zinc-900'>
                All Categories
              </option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id} className='bg-zinc-900'>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className='text-sm font-medium text-zinc-300 mb-2 block'>
              Sort By
            </label>
            <div className='flex gap-2'>
              <Button
                size='sm'
                variant={sortBy === 'price' ? 'default' : 'outline'}
                onClick={() => {
                  setSortBy('price');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
                className={`flex-1 ${
                  sortBy === 'price'
                    ? 'bg-[#ff4d00] hover:bg-[#ff7433]'
                    : 'border-zinc-800'
                }`}
              >
                <ArrowUpDown className='w-3 h-3 mr-1' />
                Price
              </Button>
              <Button
                size='sm'
                variant={sortBy === 'name' ? 'default' : 'outline'}
                onClick={() => {
                  setSortBy('name');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}
                className={`flex-1 ${
                  sortBy === 'name'
                    ? 'bg-[#ff4d00] hover:bg-[#ff7433]'
                    : 'border-zinc-800'
                }`}
              >
                Name
              </Button>
            </div>
          </div>

          {/* Sort Order */}
          <div>
            <label className='text-sm font-medium text-zinc-300 mb-2 block'>
              Order
            </label>
            <div className='flex gap-2'>
              <Button
                size='sm'
                variant={sortOrder === 'asc' ? 'default' : 'outline'}
                onClick={() => setSortOrder('asc')}
                className={`flex-1 ${
                  sortOrder === 'asc'
                    ? 'bg-[#ff4d00] hover:bg-[#ff7433]'
                    : 'border-zinc-800'
                }`}
              >
                Ascending
              </Button>
              <Button
                size='sm'
                variant={sortOrder === 'desc' ? 'default' : 'outline'}
                onClick={() => setSortOrder('desc')}
                className={`flex-1 ${
                  sortOrder === 'desc'
                    ? 'bg-[#ff4d00] hover:bg-[#ff7433]'
                    : 'border-zinc-800'
                }`}
              >
                Descending
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className='bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center'>
          <p className='text-red-400'>{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className='mt-4 bg-red-500 hover:bg-red-600'
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <MealSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* Meals Grid - 4 per row on desktop */}
          {filteredData.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center'>
              {filteredData.map((item: any) => (
                <MealCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className='text-center py-16'>
              <Search className='w-16 h-16 text-zinc-600 mx-auto mb-4' />
              <h3 className='text-xl font-bold text-white mb-2'>
                No meals found
              </h3>
              <p className='text-zinc-400 mb-6'>
                Try adjusting your filters or search terms
              </p>
              <Button
                onClick={() => {
                  setPreference('both');
                  setCategory('all');
                  setSearchQuery('');
                  setSortBy('');
                  setSortOrder('');
                }}
                className='bg-[#ff4d00] hover:bg-[#ff7433] text-white'
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {data.length === initialFilters.take && (
            <div className='bg-orange-500/10 border border-orange-500/30 rounded-xl py-3 flex items-center justify-center'>
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href={`?skip=${Math.max(
                          0,
                          pagination.skip - pagination.take
                        )}&take=${pagination.take}${category !== 'all' ? `&category=${category}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}${preference !== 'both' ? `&type=${preference}` : ''}${sortBy ? `&sortBy=${sortBy}` : ''}${sortOrder ? `&sortOrder=${sortOrder}` : ''}`}
                      />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      href={`?skip=${pagination.skip}&take=${pagination.take}${category !== 'all' ? `&category=${category}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}${preference !== 'both' ? `&type=${preference}` : ''}${sortBy ? `&sortBy=${sortBy}` : ''}${sortOrder ? `&sortOrder=${sortOrder}` : ''}`}
                      isActive
                    >
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href={`?skip=${pagination.skip + pagination.take}&take=${pagination.take}${category !== 'all' ? `&category=${category}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}${preference !== 'both' ? `&type=${preference}` : ''}${sortBy ? `&sortBy=${sortBy}` : ''}${sortOrder ? `&sortOrder=${sortOrder}` : ''}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}

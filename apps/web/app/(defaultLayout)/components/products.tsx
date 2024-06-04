'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from 'lucide-react';

import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import Product from './product';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { axiosInstance } from '@web/common/api';
import { ProductFilter } from './product-filter';
import {
  useQueryParams,
  withDefault,
  NumericArrayParam,
} from 'use-query-params';
import { Skeleton } from '@repo/ui/components/skeleton';

const MyFiltersParam = withDefault(NumericArrayParam, []);

const Products = () => {
  /*const [productTypes] = useQueryParam(
    'productTypes',
    withDefault(NumericArrayParam, [])
  );*/

  const [query, setQuery] = useQueryParams({
    productTypes: MyFiltersParam,
  });

  const { productTypes: selected } = query;

  const { data: productTypes } = useQuery({
    queryKey: ['productTypes'],
    queryFn: async () => {
      const data = await axiosInstance.get('product/types');
      return data.data;
    },
  });

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['productTypes', selected],
    queryFn: async () => {
      console.log('selected');
      console.log(selected);

      const data = await axiosInstance.get(`product`, {
        params: {
          productTypes: selected,
        },
      });
      return data.data;
    },
    placeholderData: keepPreviousData,
    /*refetchOnWindowFocus: false,
        retry: 1,*/
  });

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
      <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-12'>
        {/*  <ProductFilters />*/}
        <Card className='col-span-3' x-chunk='dashboard-01-chunk-5'>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-8'>
            <ProductFilter
              key={'product-type'}
              name='Product Type'
              options={productTypes}
              selected={selected}
              setSelect={setQuery}
            />
          </CardContent>
        </Card>
        <Card className='col-span-9'>
          <CardHeader className='flex flex-row items-center'>
            <div className='grid gap-2'>
              <CardTitle>Products</CardTitle>
              <CardDescription>View products from our store.</CardDescription>
            </div>
            <Button asChild size='sm' className='ml-auto gap-1'>
              <Link href='#'>
                View All
                <ArrowUpRight className='h-4 w-4' />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className='flex flex-wrap gap-x-12  pb-4'>
              {data?.map((product) => {
                return isLoading ? (
                  <div className='flex flex-col space-y-3'>
                    <Skeleton className='h-[125px] w-[250px] rounded-xl' />
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-[250px]' />
                      <Skeleton className='h-4 w-[200px]' />
                    </div>
                  </div>
                ) : (
                  <Link href={`/product/${product?.id}`} key={product?.id}>
                    <Product
                      key={product.name}
                      product={product}
                      className='w-[200px]'
                      aspectRatio='portrait'
                      width={250}
                      height={330}
                    />
                  </Link>
                );
              })}{' '}
            </div>
          </CardContent>
        </Card>{' '}
      </div>
    </main>
  );
};

export default Products;

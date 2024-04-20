'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/ui/components/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@web/common/api';
import { ProductFilter } from './product-filter';

const ProductFilters = () => {
  const {
    isLoading,
    error,
    data: productTypes,
    refetch,
  } = useQuery({
    queryKey: ['product-types'],
    queryFn: async () => {
      const data = await axiosInstance.get('product/types');
      return data.data;
    },
    /*refetchOnWindowFocus: false,
        retry: 1,*/
  });

  const filters = [
    {
      id: 'product-type',
      name: 'Product Type',
      options: [{}],
    },
  ];
  return (
    <Card x-chunk='dashboard-01-chunk-5'>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-8'>
        <ProductFilter
          key={'product-type'}
          name='Product Type'
          options={productTypes}
        />
      </CardContent>
    </Card>
  );
};

export default ProductFilters;

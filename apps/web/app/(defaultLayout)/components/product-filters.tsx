'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@web/common/api';
import { ProductFilter } from './product-filter';
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam,
  withDefault,
  NumericArrayParam,
} from 'use-query-params';

const MyFiltersParam = withDefault(NumericArrayParam, []);

const ProductFilters = () => {
  const [query, setQuery] = useQueryParams({
    productTypes: MyFiltersParam,
  });

  const { productTypes: selected } = query;

  const {
    isLoading,
    error,
    data: productTypes,
    refetch,
  } = useQuery({
    queryKey: ['productTypes'],
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
  );
};

export default ProductFilters;

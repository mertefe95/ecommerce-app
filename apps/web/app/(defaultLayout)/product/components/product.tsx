'use client';
import ProductImages from './product-images';
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam,
  withDefault,
  NumericArrayParam,
} from 'use-query-params';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@web/common/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { StarIcon, HeartIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { Label } from '@repo/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';
import { Button } from '@repo/ui/components/button';
import { Separator } from '@repo/ui/components/separator';

const Product = ({ id }: { id: number }) => {
  const {
    isLoading,
    error,
    data: product,
    refetch,
  } = useQuery({
    queryKey: ['id', id],
    queryFn: async () => {
      const data = await axiosInstance.get(`product/${id}`);
      return data.data;
    },
    /*refetchOnWindowFocus: false,
            retry: 1,*/
  });

  return (
    <div>
      <Card className='overflow-hidden'>
        {/*<CardHeader>
          <CardTitle>{product?.name}</CardTitle>
          <CardDescription>{product?.productType?.name}</CardDescription>
        </CardHeader> */}
        <CardContent>
          <div className='grid grid-cols-12'>
            <div className='col-span-5'>
              <ProductImages />
            </div>
            <div className='col-span-7'>
              <div className='grid gap-4 md:gap-10'>
                <div className='hidden items-start md:flex'>
                  <div className='grid gap-4'>
                    <h1 className='text-3xl font-bold lg:text-4xl'>
                      {product?.name}
                    </h1>
                    <div>
                      <p>{product?.productType?.name}</p>
                    </div>
                    <div>
                      <p className='font-medium text-black'>Description:</p>
                      <p>{product?.description}</p>
                    </div>

                    <Separator />
                    <div>
                      <p className='font-medium text-black'>Brand:</p>
                      <p>{product?.brand?.name}</p>
                    </div>
                    <div>
                      <p className='font-medium text-black'>Brand:</p>
                      <p>{product?.brand?.name}</p>
                    </div>

                    <Separator />
                    <div className='flex items-center gap-4'>
                      <div className='flex items-center gap-0.5'>
                        <StarFilledIcon className='h-5 w-5 fill-primary' />
                        <StarFilledIcon className='h-5 w-5 fill-primary' />
                        <StarFilledIcon className='h-5 w-5 fill-primary' />
                        <StarIcon className='h-5 w-5 fill-muted stroke-muted-foreground' />
                        <StarIcon className='h-5 w-5 fill-muted stroke-muted-foreground' />
                      </div>
                    </div>
                  </div>
                  <div className='ml-auto text-4xl font-bold'>$99</div>
                </div>
                <form className='grid gap-4 md:gap-10'>
                  <div className='grid gap-2'>
                    <Label className='text-base' htmlFor='color'>
                      Color
                    </Label>
                    <RadioGroup
                      className='flex items-center gap-2'
                      defaultValue='black'
                      id='color'
                    >
                      <Label
                        className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                        htmlFor='color-black'
                      >
                        <RadioGroupItem id='color-black' value='black' />
                        Black
                      </Label>
                      <Label
                        className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                        htmlFor='color-white'
                      >
                        <RadioGroupItem id='color-white' value='white' />
                        White
                      </Label>
                      <Label
                        className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                        htmlFor='color-blue'
                      >
                        <RadioGroupItem id='color-blue' value='blue' />
                        Blue
                      </Label>
                    </RadioGroup>
                  </div>
                  <div className='grid gap-2'>
                    <Label className='text-base' htmlFor='size'>
                      Size
                    </Label>
                    <RadioGroup
                      className='flex items-center gap-2'
                      defaultValue='m'
                      id='size'
                    >
                      <Label
                        className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                        htmlFor='size-xs'
                      >
                        <RadioGroupItem id='size-xs' value='xs' />
                        XS
                      </Label>
                      <Label
                        className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                        htmlFor='size-s'
                      >
                        <RadioGroupItem id='size-s' value='s' />S
                        {'\n                              '}
                      </Label>
                      <Label
                        className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                        htmlFor='size-m'
                      >
                        <RadioGroupItem id='size-m' value='m' />M
                        {'\n                              '}
                      </Label>
                      <Label
                        className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                        htmlFor='size-l'
                      >
                        <RadioGroupItem id='size-l' value='l' />L
                        {'\n                              '}
                      </Label>
                      <Label
                        className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                        htmlFor='size-xl'
                      >
                        <RadioGroupItem id='size-xl' value='xl' />
                        XL
                      </Label>
                    </RadioGroup>
                  </div>
                  <div className='grid gap-2'>
                    <Label className='text-base' htmlFor='quantity'>
                      Quantity
                    </Label>
                    <Select defaultValue='1'>
                      <SelectTrigger className='w-24'>
                        <SelectValue placeholder='Select' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='1'>1</SelectItem>
                        <SelectItem value='2'>2</SelectItem>
                        <SelectItem value='3'>3</SelectItem>
                        <SelectItem value='4'>4</SelectItem>
                        <SelectItem value='5'>5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                    <Button size='lg'>Add to cart</Button>
                    <Button size='lg' variant='outline'>
                      <HeartIcon className='mr-2 h-4 w-4' />
                      Add to wishlist
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;

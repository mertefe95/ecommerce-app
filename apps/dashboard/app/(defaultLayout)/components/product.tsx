import Image from 'next/image';
import { PlusCircledIcon } from '@radix-ui/react-icons';

import { clsx } from 'clsx';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@repo/ui/components/context-menu';
import { formatPrice } from '@web/util/format-price';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@web/common/api';

interface ProductProps extends React.HTMLAttributes<HTMLDivElement> {
  product: any;
  aspectRatio?: 'portrait' | 'square';
  width?: number;
  height?: number;
}

export const playlists = [
  'Recently Added',
  'Recently Played',
  'Top Songs',
  'Top Albums',
  'Top Artists',
  'Logic Discography',
  'Bedtime Beats',
  'Feeling Happy',
  'I miss Y2K Pop',
  'Runtober',
  'Mellow Days',
  'Eminem Essentials',
];

export default function Product({
  product,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  ...props
}: ProductProps) {
  const addToShoppingCart = useMutation({
    mutationFn: (newTodo) => {
      return axiosInstance.post('/shopping-cart', newTodo);
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id`);
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const addToFavorites = useMutation({
    mutationFn: (newTodo) => {
      return axiosInstance.post('/shopping-cart', newTodo);
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id`);
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  return (
    <div className={clsx('space-y-3', className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className='overflow-hidden rounded-md'>
            <Image
              src={
                product?.image ?? '/product_photo.png' //https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081
              }
              alt={product?.name}
              width={width}
              height={height}
              className={clsx(
                'h-auto w-auto object-cover transition-all hover:scale-105',
                aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-40'>
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className='w-48'>
              <ContextMenuItem>
                <PlusCircledIcon className='mr-2 h-4 w-4' />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='mr-2 h-4 w-4'
                    viewBox='0 0 24 24'
                  >
                    <path d='M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3' />
                  </svg>
                  {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className='space-y-1 text-sm'>
        <h3 className='font-medium leading-none'>{product.name}</h3>
        <p className='text-xs text-muted-foreground'>{product.artist}</p>

        <p className='text-xs text-muted-foreground'>
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}

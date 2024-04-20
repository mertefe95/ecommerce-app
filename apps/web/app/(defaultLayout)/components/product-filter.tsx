import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/ui/components/accordion';
import { Checkbox } from '@repo/ui/components/checkbox';

export interface ProductFilterOptionProps {
  id: number;
  name: string;
}

export interface ProductFilterProps {
  name: string;
  options: ProductFilterOptionProps[];
}

export const ProductFilter = ({ name, options }: ProductFilterProps) => {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger>{name}</AccordionTrigger>
        <AccordionContent>
          {options?.map((option) => (
            <div className='items-top my-2 flex space-x-2' key={option?.id}>
              <Checkbox
                id={`${option?.id}-${option?.name?.replaceAll(' ', '-')}`}
              />
              <div className='grid gap-1.5 leading-none'>
                <label
                  htmlFor='terms1'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {option?.name}
                </label>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

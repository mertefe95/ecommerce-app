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
  selected: (number | null)[];
  setSelect: any;
}

export const ProductFilter = ({
  name,
  options,
  selected,
  setSelect,
}: ProductFilterProps) => {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger>{name}</AccordionTrigger>
        <AccordionContent>
          {options?.map((option) => {
            const optionName = `${option?.id}-${option?.name?.replaceAll(' ', '-')}`;
            const optionId = option?.id;
            return (
              <div className='items-top my-2 flex space-x-2' key={option?.id}>
                <Checkbox
                  name={optionName}
                  id={optionName}
                  checked={selected.includes(optionId)}
                  defaultChecked={selected.includes(optionId)}
                  defaultValue={optionId}
                  value={optionId}
                  onCheckedChange={(e: boolean) => {
                    if (e)
                      setSelect(
                        { productTypes: [...selected, optionId] },
                        'pushIn'
                      );
                    else
                      setSelect(
                        {
                          productTypes: selected?.filter(
                            (selectedOption) => selectedOption !== optionId
                          ),
                        },
                        'pushIn'
                      );
                  }}
                />
                <div className='grid gap-1.5 leading-none'>
                  <label
                    htmlFor={optionName}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {option?.name}
                  </label>
                </div>
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

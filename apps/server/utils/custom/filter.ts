import Search from '../custom/search';

interface IFilterProps {
  when: boolean;
  filter: object;
}

export default function Filters(
  search?: ReturnType<typeof Search>,
  filters?: IFilterProps[],
) {
  const filtersOut = [];

  filters.forEach((filter) => {
    if (filter.when) filtersOut.push(filter.filter);
  });

  if (search && Object.keys(search)?.length > 0) filtersOut.push(search);

  return { AND: filtersOut };
}

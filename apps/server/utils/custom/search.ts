import { SearchDto } from '../dto/search.dto';

function createSimpleObject(name, value) {
  const obj = {};
  obj[name] = value;
  return obj;
}

export default function Search(
  query: SearchDto,
  searchFields: {
    type?: string;
    relations?: { name: string; some?: boolean }[] | string[];
    field: string;
  }[],
) {
  const types = {
    text: {
      contains: query?.search,
      mode: 'insensitive',
    },
    number: {
      equals: Number(query?.search) > 0 ? Number(query?.search) : 0,
    },
  };

  return query.search
    ? {
        OR: searchFields?.map((field) => {
          const searchValue = types?.[`${field?.type ?? 'text'}`];

          if (!field?.relations || field?.relations?.length === 0) {
            return { [field?.field]: searchValue };
          } else if (field?.relations && field?.relations?.length > 0) {
            let nestedSearchQuery = { [field.field]: searchValue };

            // Loop through relations and construct nested query
            for (let i = field.relations.length - 1; i >= 0; i--) {
              const relation = field.relations[i];
              let relationName;
              let some;

              // Check if relation is a string or an object
              if (typeof relation === 'string') {
                relationName = relation;
                some = false;
              } else {
                relationName = relation.name;
                some = relation.some;
              }

              if (some) {
                nestedSearchQuery = {
                  [relationName]: { some: nestedSearchQuery },
                };
              } else {
                nestedSearchQuery = createSimpleObject(
                  relationName,
                  nestedSearchQuery,
                );
              }
            }

            return nestedSearchQuery;
          }
        }),
      }
    : {};
}

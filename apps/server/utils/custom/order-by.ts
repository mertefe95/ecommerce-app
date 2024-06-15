import { OrderByDto } from '../dto/order-by.dto';

interface OrderByField {
  key: string;
  fields: string[];
  relations?: string[];
  isCount?: boolean;
}

type OrderByEntry = {
  [key: string]: { _count: 'asc' | 'desc' } | 'asc' | 'desc';
};

export default function OrderBy(
  query: OrderByDto,
  orderByFields: OrderByField[]
) {
  const field = orderByFields?.find(
    (field) => field.key === query.orderByColumn
  );

  /**
   * @description
   * Builds a nested object from an array of fields and a value
   * Each field in the array represents a level of nesting within the object.
   *
   * @param fields - Array of fields to nest
   * @param value - Value to assign to the last field
   * @returns - The final object
   */
  const buildNestedObject = (fields: string[], value: any) => {
    const result = {};
    let current = result;

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      current[field] = i === fields.length - 1 ? value : {};
      current = current[field];
    }

    return result;
  };

  const orderBy: OrderByEntry[] = field?.fields?.map((subField) => {
    // If relations are provided, use them to build nested object
    if (field.relations && field.relations.length > 0) {
      const nestedFields = [...field.relations, subField];
      return buildNestedObject(nestedFields, query.orderDirection);
    } else {
      return { [subField]: query.orderDirection };
    }
  }) || [{ id: 'asc' }];

  return { orderBy };
}

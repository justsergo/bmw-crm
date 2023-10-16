import { FieldValues } from 'react-hook-form';

export interface FormValues extends FieldValues {
  regularClient: string;
  phone: string;
  comment: string;
  address: string;
  costDeleviry: number | string;
  date: string;
  name: string;
  articul: string;
  count: string;
  countProducts: number;
  commentProduct: string;
  status: string;
  id: number;
  productsToOrder: [
    {
      name: string;
      articul: string;
      count: string;
      commentProduct: string;
      costProduct: number | undefined;
    }
  ];
}

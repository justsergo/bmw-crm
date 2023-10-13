export const FORMAT = 'YYYY-MM-DD';

export const statusTypes = {
  REJECT: 'REJECT',
  COMPLETE: 'COMPLETE',
  CREATE: 'CREATE'
};

export interface FormValues {
  regularClient: string;
  phone: string;
  comment: string;
  address: string;
  costDeleviry: number | undefined;
  date: string;
  name: string;
  articul: string;
  count: string;
  commentProduct: string;
  costProduct: number | undefined;
  status: string;
}

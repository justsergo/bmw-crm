import { regionTypes } from '../constants';

export const makePhoneNumber = (phone: string, region: string) => {
  switch (region) {
    case regionTypes.BY:
      return `
        +${phone.substring(0, 3)} 
        (${phone.substring(3, 5)}) 
        ${phone.substring(5, 8)}
        -${phone.substring(8, 10)}
        -${phone.substring(10, 12)}
      `;
    case regionTypes.RU:
      return `
        +${phone.substring(0, 1)} 
        (${phone.substring(1, 4)}) 
        ${phone.substring(4, 7)}
        -${phone.substring(7, 9)}
        -${phone.substring(9, 11)}
      `;

    default:
      return '';
  }
};

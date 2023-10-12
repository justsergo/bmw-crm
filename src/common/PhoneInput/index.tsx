import { forwardRef } from 'react';

import { InputMask } from '@react-input/mask';
import { Input } from '@chakra-ui/react';

// const CustomInput = forwardRef((forwardedRef) => {
//   return (
//     <Input
//       type="tel"
//       placeholder="phone number"
//       value="+375 (__) ___-__-__"
//       pattern="^\+375(\s+)?\(?(17|25|29|33|44)\)?(\s+)?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$"
//       ref={forwardedRef}
//     />
//   );
// });

// CustomInput.displayName = 'CustomInput';

const PhoneInput = () => {
  return <InputMask component={Input} mask="___-___" replacement="_" />;
};

export default PhoneInput;

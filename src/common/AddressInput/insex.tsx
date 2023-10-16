import { useCallback, useState } from 'react';
import './styles.css';

import { Select } from 'chakra-react-select';
import { UseFormSetValue } from 'react-hook-form';
import { FormValues } from '../../types';

type Props = {
  value: string;
  setValue: UseFormSetValue<FormValues>;
};

type SelectOptionType = { label: string; value: string };

const apiKey: string = process.env.REACT_APP_DADATA_API_KEY;

const AddressInput = ({ value, setValue }: Props) => {
  const [options, setOptions] = useState<Array<SelectOptionType>>([]);

  const searchAddress = useCallback((value: string) => {
    fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + apiKey
      },
      body: JSON.stringify({ query: value })
    })
      .then((result) => result.json())
      .then((result) => {
        setOptions(
          result.suggestions
            .slice(0, 5)
            .map(({ value }: { value: string }): SelectOptionType => ({ value, label: value }))
        );
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <Select
      onChange={(event: SelectOptionType | null) => setValue('address', event.value)}
      onInputChange={searchAddress}
      options={options}
      value={options.find((c) => c.value === value) || { value: value, label: value }}
      className="select"
    />
  );
};

export default AddressInput;

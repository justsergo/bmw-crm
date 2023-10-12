import { Select } from 'chakra-react-select';
import { useCallback, useState } from 'react';

type Props = {
  value: string;
  onChange: () => void;
};

const AddressInput = ({ value, onChange }: Props) => {
  const [options, setOptions] = useState<Array<{ value: string; label: string }>>([]);
  const searchAddress = useCallback((value: string) => {
    fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + '84e4ac66b6e9a8eee59bb64e66cf3ebad1d37b93'
      },
      body: JSON.stringify({ query: value })
    })
      .then((result) => result.json())
      .then((result) => {
        setOptions(
          result.suggestions
            .slice(0, 5)
            .map(({ value }: { value: string }) => ({ value, label: value }))
        );
      })
      .catch((error) => console.log('error', error));
  }, []);
  return (
    <Select
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      onChange={(event: unknown) => onChange(event.value)}
      onInputChange={searchAddress}
      options={options}
      value={options.find((c) => c.value === value) || { value: value, label: value }}
    />
  );
};

export default AddressInput;

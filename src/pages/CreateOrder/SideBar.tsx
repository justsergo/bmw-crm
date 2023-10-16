import { useCallback, useMemo, useState } from 'react';

import dayjs from 'dayjs';
import './sidebar.css';
import Models from 'BMWCRM';

import { CalendarIcon, CopyIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  Stack,
  Text,
  Textarea,
  Tooltip
} from '@chakra-ui/react';
import { Select as ChakraSelect } from '@chakra-ui/react';
import { Controller, Control, UseFormSetValue, FieldErrors } from 'react-hook-form';
import clients from '../../store/clients/data.json';
import { Select } from 'chakra-react-select';
import AddressInput from '../../common/AddressInput/insex';
import { FORMAT, regionTypes } from '../../constants';
import InputMask from 'react-input-mask';
import { makePhoneNumber } from '../../utils/makePhoneNumber';
import { FormValues } from '../../types';

type Props = {
  setValue: UseFormSetValue<FormValues>;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
};

type OnChangeEvent = {
  value: number;
} | null;

const masks = {
  BY: '+375 (99) 999-99-99',
  RU: '+7 (999) 999-99-99'
};

const SideBar = ({ setValue, control, errors }: Props): JSX.Element => {
  const [idButton, setIdButton] = useState<string | null>(null);
  const [region, setRegion] = useState<string>(regionTypes.RU);

  const chooseRegularClient = useCallback(
    (event: OnChangeEvent) => {
      if (!event) {
        setValue('regularClient', '');
        setValue('phone', '');
        setValue('address', '');
        return;
      }
      const regularClient = clients.find((item) => item.id === event.value);
      if (regularClient) {
        setValue('regularClient', regularClient.name);
        setValue('phone', makePhoneNumber(regularClient.phone, regionTypes.RU));
        setValue('address', regularClient.address);
      }
    },
    [setValue]
  );

  const options = useMemo(
    () => clients.map(({ name, id }: Models.Client) => ({ label: name, value: id })),
    [clients]
  );

  const buttonsData = useMemo(
    () => [
      {
        title: 'Сегодня',
        func: (event: React.MouseEvent<HTMLButtonElement>) => {
          setIdButton(event.currentTarget.id);
          setValue('date', dayjs().format(FORMAT));
        }
      },
      {
        title: 'Завтра',
        func: (event: React.MouseEvent<HTMLButtonElement>) => {
          setIdButton(event.currentTarget.id);
          setValue('date', dayjs().add(1, 'day').format(FORMAT));
        }
      },
      {
        title: 'Послезавтра',
        func: (event: React.MouseEvent<HTMLButtonElement>) => {
          setIdButton(event.currentTarget.id);
          setValue('date', dayjs().add(2, 'day').format(FORMAT));
        }
      }
    ],
    [idButton]
  );

  return (
    <Stack direction="row" h={'100%'} w={'100%'} pr={10}>
      <Grid templateRows="repeat(2, 1fr)" gap={2} paddingRight={10}>
        <GridItem>
          <Text color={'blackAlpha.700'} fontSize="xl" fontWeight={'bold'}>
            Данные заказа
          </Text>
          <Box py={2}>
            <FormControl>
              <FormLabel color={'blackAlpha.700'}>Постоянный клиент</FormLabel>
              <Select
                onChange={chooseRegularClient}
                options={options}
                isClearable
                placeholder="Введите постоянного клиента"
              />
            </FormControl>
          </Box>
          <Box py={2}>
            <Controller
              name="phone"
              control={control}
              rules={{ required: 'required' }}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <FormLabel color={'blackAlpha.700'}>
                    Номер телефона
                    {errors.phone && (
                      <Text as="i" color="tomato" fontSize="sm" ml={2}>
                        Обязательное поле
                      </Text>
                    )}
                  </FormLabel>

                  <InputGroup>
                    <InputLeftAddon background={'none'} p={0}>
                      <ChakraSelect
                        onChange={(value) => setRegion(value.target.value)}
                        value={region}>
                        <option value={regionTypes.RU}>{'\uD83C\uDDF7\uD83C\uDDFA'}</option>
                        <option value={regionTypes.BY}>{'\uD83C\uDDE7\uD83C\uDDFE'}</option>
                      </ChakraSelect>
                    </InputLeftAddon>
                    <InputMask
                      mask={masks[region]}
                      value={value}
                      onChange={onChange}
                      placeholder={masks[region]}>
                      {(inputProps) => <Input type="tel" {...inputProps} />}
                    </InputMask>
                  </InputGroup>
                </FormControl>
              )}
            />
          </Box>
          <Box py={2}>
            <Controller
              name="comment"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <FormLabel color={'blackAlpha.700'}>Комментарий</FormLabel>
                  <Textarea placeholder="Введите комментарий" value={value} onChange={onChange} />
                </FormControl>
              )}
            />
          </Box>
        </GridItem>

        <GridItem>
          <Text color={'blackAlpha.700'} fontSize="xl" fontWeight={'bold'}>
            Доставка
          </Text>
          <Box py={2}>
            <Controller
              name="address"
              control={control}
              rules={{ required: 'required' }}
              render={({ field: { value } }) => (
                <FormControl>
                  <FormLabel color={'blackAlpha.700'}>
                    Адрес
                    {errors.address && (
                      <Text as="i" color="tomato" fontSize="sm" ml={2}>
                        Обязательное поле
                      </Text>
                    )}
                  </FormLabel>
                  <Flex>
                    <AddressInput value={value} setValue={setValue} />
                    <Tooltip label="Скопировать адрес">
                      <Button
                        variant="outline"
                        ml={2}
                        onClick={() => navigator.clipboard.writeText(value)}
                        colorScheme="blue">
                        <CopyIcon />
                      </Button>
                    </Tooltip>
                  </Flex>
                </FormControl>
              )}
            />
          </Box>
          <Box py={2}>
            <Controller
              name="costDeleviry"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <FormLabel color={'blackAlpha.700'}>Стоиомсть</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      placeholder="Введите стоимость"
                      onChange={onChange}
                      value={value}
                    />
                    <InputRightAddon>RUB</InputRightAddon>
                  </InputGroup>
                </FormControl>
              )}
            />
          </Box>
          <Box py={2}>
            <Controller
              name="date"
              control={control}
              rules={{ required: 'required' }}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <FormLabel color={'blackAlpha.700'}>
                    Дата
                    {errors.date && (
                      <Text as="i" color="tomato" fontSize="sm" ml={2}>
                        Обязательное поле
                      </Text>
                    )}
                  </FormLabel>
                  <InputGroup size="md">
                    <InputLeftElement>
                      <CalendarIcon color={'blue.500'} />
                    </InputLeftElement>
                    <Input
                      placeholder="Select Date and Time"
                      size="md"
                      type="date"
                      className="date"
                      value={value}
                      onChange={onChange}
                    />
                  </InputGroup>
                </FormControl>
              )}
            />
          </Box>
          <Box py={2}>
            <ButtonGroup gap="2">
              {buttonsData.map(({ title, func }) => {
                const isActive = idButton === title;
                return (
                  <Button
                    key={title}
                    onClick={func}
                    id={title}
                    variant={isActive ? 'solid' : 'outline'}
                    colorScheme="blue">
                    {title}
                  </Button>
                );
              })}
            </ButtonGroup>
          </Box>
        </GridItem>
      </Grid>
      <Divider orientation="vertical" />
    </Stack>
  );
};

export default SideBar;

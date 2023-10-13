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
import {
  Controller,
  Control,
  UseFormSetValue,
  FieldError,
  UseControllerProps
} from 'react-hook-form';
import clients from '../../store/clients/data.json';
import { Select } from 'chakra-react-select';
import AddressInput from '../../common/AddressInput/insex';
import { FormValues, FORMAT } from '../../constants';

type Props = {
  setValue: UseFormSetValue<FormValues>;
  control: Control<FormValues>;
  errors: UseControllerProps<FieldError>;
};

type OnChangeEvent = {
  value: number;
} | null;

const ButtonItem = ({
  onClick,
  title,
  isActive
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  isActive: boolean;
}) => {
  return (
    <Button onClick={onClick} id={title} variant={isActive ? 'solid' : 'outline'}>
      {title}
    </Button>
  );
};

const SideBar = ({ setValue, control, errors }: Props): JSX.Element => {
  const [idButton, setIdButton] = useState<string | null>(null);

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
        setValue('phone', regularClient.phone);
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
          <Text fontSize="xl" fontWeight={'bold'}>
            Данные заказа
          </Text>
          <Box py={2}>
            <FormControl>
              <FormLabel>Постоянный клиент</FormLabel>
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
                  <FormLabel>
                    Номер телефона
                    {errors.phone && (
                      <Text as="i" color="tomato" fontSize="sm" ml={2}>
                        Обязательное поле
                      </Text>
                    )}
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>+234</InputLeftAddon>
                    <Input
                      type="tel"
                      placeholder="phone number"
                      value={value}
                      onChange={onChange}
                    />
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
                  <FormLabel>Комментарий</FormLabel>
                  <Textarea placeholder="Введите комментарий" value={value} onChange={onChange} />
                </FormControl>
              )}
            />
          </Box>
        </GridItem>

        <GridItem>
          <Text fontSize="md">Доставка</Text>
          <Box py={2}>
            <Controller
              name="address"
              control={control}
              rules={{ required: 'required' }}
              render={({ field: { value } }) => (
                <FormControl>
                  <FormLabel>
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
                        onClick={() => navigator.clipboard.writeText(value)}>
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
                  <FormLabel>Стоиомсть</FormLabel>
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
                  <FormLabel>
                    Дата
                    {errors.date && (
                      <Text as="i" color="tomato" fontSize="sm" ml={2}>
                        Обязательное поле
                      </Text>
                    )}
                  </FormLabel>
                  <InputGroup size="md">
                    <InputLeftElement>
                      <CalendarIcon />
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
                return <ButtonItem onClick={func} title={title} key={title} isActive={isActive} />;
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

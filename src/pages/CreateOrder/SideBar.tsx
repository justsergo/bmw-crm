import dayjs from 'dayjs';
import './sidebar.css';

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
  Textarea
} from '@chakra-ui/react';
import { Controller, UseControllerProps } from 'react-hook-form';
import clients from '../../store/clients/data.json';
import Models from 'BMWCRM';
import { useCallback, useMemo, useState } from 'react';
import { Select } from 'chakra-react-select';
import AddressInput from '../../common/AddressInput/insex';
import { FORMAT } from '../../constants/sideBar';

type Props = {
  setValue: (name: string, value: unknown) => void;
  control: UseControllerProps['control'];
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

const SideBar = ({ setValue, control }: Props): JSX.Element => {
  const [date, setDate] = useState<string>('');
  const [idButton, setIdButton] = useState<string | null>(null);

  const chooseRegularClient = useCallback(
    (event: OnChangeEvent) => {
      if (!event) {
        setValue('phone', '');
        setValue('address', '');
        return;
      }
      const regularClient = clients.find((item) => item.id === event.value);
      if (regularClient) {
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
          setDate(dayjs().format(FORMAT));
        }
      },
      {
        title: 'Завтра',
        func: (event: React.MouseEvent<HTMLButtonElement>) => {
          setIdButton(event.currentTarget.id);
          setDate(dayjs().add(1, 'day').format(FORMAT));
        }
      },
      {
        title: 'Послезавтра',
        func: (event: React.MouseEvent<HTMLButtonElement>) => {
          setIdButton(event.currentTarget.id);
          setDate(dayjs().add(2, 'day').format(FORMAT));
        }
      }
    ],
    [idButton]
  );

  const dateHandler = ({ target: { value } }: { target: HTMLInputElement }) => {
    setDate(dayjs(value).format(FORMAT));
  };

  return (
    <Stack direction="row" h={'100%'} w={'100%'} pr={10}>
      <Grid templateRows="repeat(2, 1fr)" gap={2} paddingRight={10}>
        <GridItem>
          <Text fontSize="md">Данные заказа</Text>
          <Box py={2}>
            <FormControl>
              <FormLabel>Постоянный клиент</FormLabel>
              <Select onChange={chooseRegularClient} options={options} isClearable />
            </FormControl>
          </Box>
          <Box py={2}>
            <Controller
              name="phone"
              control={control}
              rules={{ required: 'required' }}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <FormLabel>Номер телефона</FormLabel>
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
            <FormControl>
              <FormLabel>Комментарий</FormLabel>
              <Textarea placeholder="Here is a sample placeholder" />
            </FormControl>
          </Box>
        </GridItem>

        <GridItem>
          <Text fontSize="md">Доставка</Text>
          <Box py={2}>
            <Controller
              name="address"
              control={control}
              rules={{ required: 'required' }}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <FormLabel>Адрес</FormLabel>
                  <Flex>
                    <AddressInput value={value} onChange={onChange} />
                    <Button>
                      <CopyIcon />
                    </Button>
                  </Flex>
                </FormControl>
              )}
            />
          </Box>
          <Box py={2}>
            <FormControl>
              <FormLabel>Стоиомсть</FormLabel>
              <InputGroup>
                <Input type="tel" placeholder="phone number" />
                <InputRightAddon>rub</InputRightAddon>
              </InputGroup>
            </FormControl>
          </Box>
          <Box py={2}>
            <FormControl>
              <FormLabel>Дата</FormLabel>
              <InputGroup size="md">
                <InputLeftElement>
                  <CalendarIcon />
                </InputLeftElement>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  className="date"
                  value={date}
                  onChange={dateHandler}
                />
              </InputGroup>
            </FormControl>
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

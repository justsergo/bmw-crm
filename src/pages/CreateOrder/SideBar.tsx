import { CalendarIcon, CopyIcon, TriangleDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
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
  InputRightElement,
  Select,
  Textarea
} from '@chakra-ui/react';
import { Controller, UseControllerProps } from 'react-hook-form';
import clients from '../../store/clients/data.json';
import Models from 'BMWCRM';
import { useCallback } from 'react';

type Props = {
  setValue: (name: string, value: unknown) => void;
  control: UseControllerProps['control'];
};

const SideBar = ({ setValue, control }: Props): JSX.Element => {
  const chooseRegularClient = useCallback(
    ({ target: { value } }: any) => {
      const regularClient = clients.find((item) => item.id === Number(value));
      if (regularClient) {
        setValue('phone', regularClient.phone);
        setValue('address', regularClient.address);
        console.log('3141');
      }
    },
    [setValue]
  );
  return (
    <Grid templateRows="repeat(2, 1fr)" gap={2}>
      <GridItem>
        <Box py={2}>
          <FormControl>
            <FormLabel>Постоянный клиент</FormLabel>
            <Select placeholder="Select option" onChange={chooseRegularClient}>
              {clients.map(({ name, id }: Models.Client) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </Select>
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
                  <Input type="tel" placeholder="phone number" value={value} onChange={onChange} />
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
        <Box py={2}>
          <FormControl>
            <FormLabel>Адрес</FormLabel>
            <Flex>
              <Select placeholder="Select option">
                <option value="option1">Option 1</option>
              </Select>
              <Button>
                <CopyIcon />
              </Button>
            </Flex>
          </FormControl>
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
              <InputLeftElement width="4.5rem">
                <Button h="1.75rem" size="sm">
                  <CalendarIcon />
                </Button>
              </InputLeftElement>
              <Input placeholder="Select Date and Time" size="md" type="datetime-local" />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm">
                  <TriangleDownIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Box py={2}>
          <ButtonGroup gap="2">
            <Button colorScheme="blackAlpha">Сегодня</Button>
            <Button colorScheme="blackAlpha">Завтра</Button>
            <Button colorScheme="blackAlpha">Послезавтра</Button>
          </ButtonGroup>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default SideBar;

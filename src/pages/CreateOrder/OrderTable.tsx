import {
  Box,
  Button,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import { FormValues } from '../../types';

type Props = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
};

const OrderTable = ({ control, errors, register, setValue }: Props): JSX.Element => {
  const { fields, append } = useFieldArray({
    control,
    name: 'productsToOrder'
  });

  const addRows = () => {
    append({ name: '', articul: '', count: '', commentProduct: '', costProduct: undefined });
  };

  return (
    <Box>
      <Text color={'blackAlpha.700'} fontSize="xl" fontWeight={'bold'}>
        Товары к заказу
      </Text>
      <TableContainer py={5}>
        <Table variant="simple" colorScheme="blackAlpha">
          <Thead backgroundColor={'blackAlpha.50'}>
            <Tr>
              <Th>№</Th>
              <Th>Название</Th>
              <Th>Артикул</Th>
              <Th>Количество</Th>
              <Th>Цена (rub)</Th>
              <Th>Комментарий</Th>
            </Tr>
          </Thead>
          <Tbody>
            {fields.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>
                  <Input
                    type="text"
                    placeholder="Название"
                    {...register(`productsToOrder.${index}.name` as const, {
                      required: true
                    })}
                    isInvalid={Boolean(errors?.productsToOrder?.[index]?.name)}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    placeholder="Название"
                    {...register(`productsToOrder.${index}.articul` as const, {
                      required: true,
                      onChange: (ev) =>
                        setValue(
                          `productsToOrder.${index}.articul`,
                          String(
                            ev.target.value.replace(/[^A-Za-z0-9]+/g, '')
                          ).toUpperCase() as never
                        )
                    })}
                    isInvalid={Boolean(errors?.productsToOrder?.[index]?.articul)}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    placeholder="Название"
                    {...register(`productsToOrder.${index}.count` as const, {
                      required: true
                    })}
                    isInvalid={Boolean(errors?.productsToOrder?.[index]?.count)}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    placeholder="Название"
                    {...register(`productsToOrder.${index}.costProduct` as const, {
                      required: true
                    })}
                    isInvalid={Boolean(errors?.productsToOrder?.[index]?.costProduct)}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    placeholder="Название"
                    {...register(`productsToOrder.${index}.commentProduct` as const)}
                  />
                </Td>
              </Tr>
            ))}
            <Tr>
              <Td colSpan={5} textAlign={'center'}>
                <Button variant="link" onClick={addRows}>
                  Заполните данные по товару
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderTable;

import { useState } from 'react';

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
import { Control, Controller, FieldError, UseControllerProps } from 'react-hook-form';
import { FormValues } from '../../constants';

type Props = {
  control: Control<FormValues>;
  errors: UseControllerProps<FieldError>;
};

const OrderTable = ({ control, errors }: Props): JSX.Element => {
  const [tableRows, addTableRows] = useState<number[]>([]);

  const addRows = () => {
    const itemId = new Date().getTime();
    addTableRows((prevRows) => prevRows.concat([itemId]));
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight={'bold'}>
        Товары к заказу
      </Text>
      <TableContainer py={5}>
        <Table variant="simple" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>№</Th>
              <Th>
                Название
                {errors.name && (
                  <Text as="i" color="tomato" fontSize="xs" textTransform="none" ml={2}>
                    Обязательное поле
                  </Text>
                )}
              </Th>
              <Th>
                Артикул
                {errors.articul && (
                  <Text as="i" color="tomato" fontSize="xs" textTransform="none" ml={2}>
                    Обязательное поле
                  </Text>
                )}
              </Th>
              <Th>
                Количество
                {errors.count && (
                  <Text as="i" color="tomato" fontSize="xs" textTransform="none" ml={2}>
                    Обязательное поле
                  </Text>
                )}
              </Th>
              <Th>
                Цена (rub)
                {errors.costProduct && (
                  <Text as="i" color="tomato" fontSize="xs" textTransform="none" ml={2}>
                    Обязательное поле
                  </Text>
                )}
              </Th>
              <Th>Комментарий</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableRows.map((value, index) => (
              <Tr key={value}>
                <Td>{index + 1}</Td>
                <Td>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'required' }}
                    render={({ field: { onChange, value } }) => (
                      <Input type="text" placeholder="Название" value={value} onChange={onChange} />
                    )}
                  />
                </Td>
                <Td>
                  <Controller
                    name="articul"
                    control={control}
                    rules={{ required: 'required' }}
                    render={({ field: { onChange, value } }) => (
                      <Input type="text" placeholder="Артикул" value={value} onChange={onChange} />
                    )}
                  />
                </Td>
                <Td>
                  <Controller
                    name="count"
                    control={control}
                    rules={{ required: 'required' }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type="number"
                        placeholder="Количество"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Td>
                <Td>
                  <Controller
                    name="costProduct"
                    control={control}
                    rules={{ required: 'required' }}
                    render={({ field: { onChange, value } }) => (
                      <Input type="number" placeholder="Цена" value={value} onChange={onChange} />
                    )}
                  />
                </Td>
                <Td>
                  <Controller
                    name="commentProduct"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type="text"
                        placeholder="Комментарий"
                        value={value}
                        onChange={onChange}
                      />
                    )}
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

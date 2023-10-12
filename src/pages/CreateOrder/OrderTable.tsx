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
import { useState } from 'react';
import { UseControllerProps } from 'react-hook-form';

const OrderTable = ({ control }: { control: UseControllerProps['control'] }): JSX.Element => {
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
              <Th>Название</Th>
              <Th>Артикул</Th>
              <Th>Количество</Th>
              <Th>Цена (rub)</Th>
              <Th>Комментарий</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableRows.map((value, index) => (
              <Tr key={value}>
                <Td>{index + 1}</Td>
                <Td>
                  <Input type="tel" placeholder="Название" />
                </Td>
                <Td>
                  <Input type="tel" placeholder="Артикул" />
                </Td>
                <Td>
                  <Input type="tel" placeholder="Количество" />
                </Td>
                <Td>комментарий</Td>
                <Td>цена</Td>
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

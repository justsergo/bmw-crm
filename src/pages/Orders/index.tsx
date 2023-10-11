import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Flex,
  IconButton,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  CardBody,
  Heading
} from '@chakra-ui/react';
import { equals } from 'ramda';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../store/selectors';

const Orders = () => {
  const navigate = useNavigate();
  const toCreateOrder = () => navigate('/create');
  const orders = useSelector(getOrders, equals);
  return (
    <Card>
      <CardHeader>
        <Flex>
          <Heading size="md">Заказы</Heading>
          <Spacer />
          <Button leftIcon={<AddIcon />} colorScheme="blue" variant="solid" onClick={toCreateOrder}>
            Добавить заказ
          </Button>
        </Flex>
      </CardHeader>

      <CardBody>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>№</Th>
                <Th>Клиент</Th>
                <Th>Номер телефона</Th>
                <Th>Статус</Th>
                <Th>Дата доставки</Th>
                <Th>Адрес доставки</Th>
                <Th>Кол-во</Th>
                <Th>Стоимость товаров (rub)</Th>
                <Th>Стоимость доставки (rub)</Th>
                <Th>Комментарий</Th>
                <Th>Действия</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>millimetres (mm)</Td>
                <Td>millimetres (mm)</Td>
                <Td>millimetres (mm)</Td>
                <Td>millimetres (mm)</Td>
                <Td>millimetres (mm)</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Tooltip label="Отменить заказ">
                      <IconButton
                        aria-label="declare order"
                        variant="ghost"
                        colorScheme="red"
                        icon={<CloseIcon />}
                      />
                    </Tooltip>
                    <Tooltip label="Завершить заказ">
                      <IconButton
                        aria-label="approve order"
                        variant="ghost"
                        colorScheme="green"
                        icon={<CheckIcon />}
                      />
                    </Tooltip>
                  </ButtonGroup>
                </Td>
              </Tr>
              {orders.map((item: any) => (
                <Tr key={item}>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>{item.phone}</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>{item.address}</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                  <Td isNumeric>25.4</Td>
                  <Td>
                    <ButtonGroup gap="2">
                      <Tooltip label="Отменить заказ">
                        <IconButton
                          aria-label="declare order"
                          variant="ghost"
                          colorScheme="red"
                          icon={<CloseIcon />}
                        />
                      </Tooltip>
                      <Tooltip label="Завершить заказ">
                        <IconButton
                          aria-label="approve order"
                          variant="ghost"
                          colorScheme="green"
                          icon={<CheckIcon />}
                        />
                      </Tooltip>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

export default Orders;

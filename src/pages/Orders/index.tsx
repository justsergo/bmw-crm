import { useEffect, useState } from 'react';

import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  Heading,
  Box
} from '@chakra-ui/react';
import { equals } from 'ramda';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOrders } from '../../store/selectors';
import { updateOrders } from '../../store/store';
import { statusTypes } from '../../constants';
import { FormValues } from '../../types';
import Status from '../../common/Status';

const Orders = () => {
  const [orders, setOrders] = useState<FormValues[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ordersState = useSelector(getOrders, equals);

  useEffect(() => {
    setOrders(ordersState as FormValues[]);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(updateOrders(orders));
    };
  }, [orders]);

  const toCreateOrder = () => navigate('/create');

  const rejectOrder = (id: number) => {
    const prevOrders = JSON.parse(JSON.stringify(orders));
    const newOrders = prevOrders.map((item: FormValues) => {
      if (item.id === id) {
        item.status = statusTypes.REJECT;
      }
      return item;
    });
    setOrders(newOrders);
  };

  const completeOrder = (id: number) => {
    const prevOrders = JSON.parse(JSON.stringify(orders));
    const newOrders = prevOrders.map((item: FormValues) => {
      if (item.id === id) {
        item.status = statusTypes.COMPLETE;
      }
      return item;
    });
    setOrders(newOrders);
  };

  return (
    <Box p={10}>
      <Flex>
        <Heading lineHeight="tall" mb={5} color={'blackAlpha.700'}>
          Заказы
        </Heading>
        <Spacer />
        <Button leftIcon={<AddIcon />} colorScheme="blue" variant="solid" onClick={toCreateOrder}>
          Добавить заказ
        </Button>
      </Flex>

      <TableContainer>
        <Table variant="simple" colorScheme="blackAlpha">
          <Thead backgroundColor={'blackAlpha.50'}>
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
            {orders.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.regularClient}</Td>
                <Td>{item.phone}</Td>
                <Td>{<Status status={item.status} />}</Td>
                <Td>{item.date}</Td>
                <Td>{item.address}</Td>
                <Td>{item.countProducts}</Td>
                <Td>
                  {item.productsToOrder.reduce(
                    (acc, { costProduct }) => Number(costProduct || 0) + acc,
                    0
                  )}
                </Td>
                <Td>{item.costDeleviry}</Td>
                <Td>{item.comment}</Td>
                <Td>
                  {item?.status === statusTypes.CREATE && (
                    <ButtonGroup gap="2">
                      <Tooltip label="Отменить заказ">
                        <IconButton
                          aria-label="declare order"
                          variant="ghost"
                          colorScheme="red"
                          icon={<CloseIcon />}
                          onClick={() => rejectOrder(item.id)}
                        />
                      </Tooltip>
                      <Tooltip label="Завершить заказ">
                        <IconButton
                          aria-label="complete order"
                          variant="ghost"
                          colorScheme="green"
                          icon={<CheckIcon />}
                          onClick={() => completeOrder(item.id)}
                        />
                      </Tooltip>
                    </ButtonGroup>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orders;

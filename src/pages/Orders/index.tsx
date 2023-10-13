import { useEffect, useState } from 'react';

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
  Tag,
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
import { FormValues, statusTypes } from '../../constants';

const statusVariant = {
  CREATE: { title: 'Создан', color: 'green', status: statusTypes.CREATE },
  COMPLETE: { title: 'Завершен', color: 'purple', status: statusTypes.COMPLETE },
  REJECT: { title: 'Отменён', color: 'red', status: statusTypes.REJECT }
};

const Status = ({ rowStatus, index }: { rowStatus: RowStatus; index: number }) => {
  const findItem = rowStatus?.find((item) => item.index === index)?.status || '';
  const variant = statusVariant[findItem];
  return (
    <Tag variant="subtle" colorScheme={variant?.color} border="1px solid">
      {variant?.title}
    </Tag>
  );
};

type RowStatus = Array<{ status: string; index: number }>;

const Orders = () => {
  const [rowStatus, setRowStatus] = useState<RowStatus>([]);

  const navigate = useNavigate();

  const orders: FormValues[] = useSelector(getOrders, equals);

  const toCreateOrder = () => navigate('/create');

  useEffect(() => {
    setRowStatus(orders.map(({ status }, index) => ({ status: status, index: index })));
  }, []);

  const rejectOrder = (index: number) => {
    setRowStatus([
      ...rowStatus,
      (rowStatus.find((item) => item.index === index).status = statusTypes.REJECT)
    ]);
  };

  const completeOrder = (index: number) => {
    setRowStatus([
      ...rowStatus,
      (rowStatus.find((item) => item.index === index).status = statusTypes.COMPLETE)
    ]);
  };

  useEffect(() => {
    console.log('rowStatus', rowStatus);
  }, [rowStatus]);

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
              {orders.map((item, index) => (
                <Tr key={item.phone + item.regularClient}>
                  <Td>{index + 1}</Td>
                  <Td>{item.regularClient}</Td>
                  <Td>{item.phone}</Td>
                  <Td>{<Status rowStatus={rowStatus} index={index} />}</Td>
                  <Td>{item.date}</Td>
                  <Td>{item.address}</Td>
                  <Td>{item.count}</Td>
                  <Td>{item.costProduct}</Td>
                  <Td>{item.costDeleviry}</Td>
                  <Td>{item.comment}</Td>
                  <Td>
                    {rowStatus?.find((item) => item.index === index)?.status ===
                      statusTypes.CREATE && (
                      <ButtonGroup gap="2">
                        <Tooltip label="Отменить заказ">
                          <IconButton
                            aria-label="declare order"
                            variant="ghost"
                            colorScheme="red"
                            icon={<CloseIcon />}
                            onClick={() => rejectOrder(index)}
                          />
                        </Tooltip>
                        <Tooltip label="Завершить заказ">
                          <IconButton
                            aria-label="complete order"
                            variant="ghost"
                            colorScheme="green"
                            icon={<CheckIcon />}
                            onClick={() => completeOrder(index)}
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
      </CardBody>
    </Card>
  );
};

export default Orders;

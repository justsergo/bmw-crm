import { useCallback } from 'react';

import { Box, Button, ButtonGroup, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import SideBar from './SideBar';
import OrderTable from './OrderTable';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../../store/store';
import { useDispatch } from 'react-redux';
import { FormValues, statusTypes } from '../../constants';

const CreateOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      regularClient: '',
      phone: '',
      comment: '',
      address: '',
      costDeleviry: undefined,
      date: '',
      name: '',
      articul: '',
      count: '',
      commentProduct: '',
      costProduct: undefined,
      status: statusTypes.CREATE
    }
  });

  const values = getValues();

  const goBack = () => navigate('/');

  const sumbitHandler = useCallback(
    handleSubmit((data) => {
      console.log(data);
      dispatch(addOrder(data));
      goBack();
    }),
    [handleSubmit]
  );

  return (
    <Box p={10}>
      <Heading lineHeight="tall" mb={5}>
        Создание заказов
      </Heading>
      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem>
          <SideBar setValue={setValue} control={control} errors={errors} />
        </GridItem>
        <GridItem colSpan={3}>
          <OrderTable control={control} errors={errors} />
          <Grid templateColumns="repeat(3, 1fr)">
            <GridItem>
              <Text>Сумма</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text pl={'70px'}>{values.costProduct}</Text>
            </GridItem>
            <GridItem>
              <Text>Сумма с доставкой</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text pl={'70px'}>
                {Number(values.costProduct || 0) + Number(values.costDeleviry || 0)}
              </Text>
            </GridItem>
          </Grid>
          <Box py={2} display={'flex'} justifyContent={'flex-end'}>
            <ButtonGroup gap="2">
              <Button variant="ghost" onClick={goBack}>
                Отменить
              </Button>
              <Button variant="solid" onClick={sumbitHandler}>
                Сохранить
              </Button>
            </ButtonGroup>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CreateOrder;

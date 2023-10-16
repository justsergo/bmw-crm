import { useCallback, useEffect, useState } from 'react';

import { Box, Button, ButtonGroup, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import SideBar from './SideBar';
import OrderTable from './OrderTable';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../../store/store';
import { useDispatch } from 'react-redux';
import { statusTypes } from '../../constants';
import { FormValues } from '../../types';
import { getId } from '../../utils/getId';

const CreateOrder = () => {
  const [productsCost, setProductsCost] = useState<number>(0);
  const [deleviryCost, setDeleviryCost] = useState<number>(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    setValue,
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      regularClient: '',
      phone: '',
      comment: '',
      address: '',
      costDeleviry: '',
      date: '',
      name: '',
      articul: '',
      count: '',
      commentProduct: '',
      status: statusTypes.CREATE,
      productsToOrder: []
    }
  });

  useEffect(() => {
    const subscription = watch((data) => {
      const costProduct = data.productsToOrder.reduce(
        (acc, { costProduct }) => Number(costProduct || 0) + acc,
        0
      );
      const delivery = Number(data.costDeleviry) || 0;
      setProductsCost(costProduct);
      setDeleviryCost(delivery);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const goBack = () => navigate('/');

  const sumbitHandler = useCallback(
    handleSubmit((formValue: FormValues) => {
      const data = {
        ...formValue,
        status: statusTypes.CREATE,
        countProducts: formValue.productsToOrder.reduce(
          (acc, { count }) => Number(count || 0) + acc,
          0
        ),
        id: getId()
      };
      dispatch(addOrder(data));
      goBack();
    }),
    [handleSubmit]
  );

  return (
    <Box p={10}>
      <Heading lineHeight="tall" mb={5} color={'blackAlpha.700'}>
        Создание заказов
      </Heading>
      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem>
          <SideBar setValue={setValue} control={control} errors={errors} />
        </GridItem>
        <GridItem colSpan={3}>
          <OrderTable control={control} errors={errors} register={register} setValue={setValue} />
          <Grid templateColumns="repeat(3, 1fr)">
            <GridItem>
              <Text color={'blackAlpha.700'} fontWeight="bold" textTransform={'uppercase'}>
                Сумма
              </Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text
                color={'blackAlpha.700'}
                fontWeight="bold"
                textTransform={'uppercase'}
                pl={'70px'}>
                {productsCost}
              </Text>
            </GridItem>
            <GridItem>
              <Text color={'blackAlpha.700'} fontWeight="bold" textTransform={'uppercase'}>
                Сумма с доставкой
              </Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text
                color={'blackAlpha.700'}
                fontWeight="bold"
                textTransform={'uppercase'}
                pl={'70px'}>
                {productsCost + deleviryCost}
              </Text>
            </GridItem>
          </Grid>
          <Box py={2} display={'flex'} justifyContent={'flex-end'}>
            <ButtonGroup gap="2" colorScheme={'blue'}>
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

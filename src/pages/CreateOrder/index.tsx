import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Text
} from '@chakra-ui/react';
import SideBar from './SideBar';
import OrderTable from './OrderTable';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { addOrder } from '../../store/store';
import { useDispatch } from 'react-redux';

interface Form {
  phone: string | undefined;
  address: string | undefined;
  cost: string | undefined;
  date: string | undefined;
}

const CreateOrder = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { control, setValue, watch, handleSubmit } = useForm({
    // const { control, setValue, watch } = useForm<Form>({
    // defaultValues: {
    //   phone: '',
    //   address: '',
    //   cost: '',
    //   date: ''
    // }
  });
  console.log(watch());
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
          <SideBar setValue={setValue} control={control} />
        </GridItem>
        <GridItem colSpan={3}>
          <OrderTable control={control} />
          <Grid templateColumns="repeat(3, 1fr)">
            <GridItem>
              <Text>Сумма</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text pl={'70px'}>12</Text>
            </GridItem>
            <GridItem>
              <Text>Сумма с доставкой</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text pl={'70px'}>13</Text>
            </GridItem>
          </Grid>
          <Box py={2} display={'flex'} justifyContent={'flex-end'}>
            <ButtonGroup gap="2">
              <Button colorScheme="blackAlpha" onClick={sumbitHandler}>
                Сохранить
              </Button>
              <Button colorScheme="blackAlpha" onClick={goBack}>
                Отменить
              </Button>
            </ButtonGroup>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CreateOrder;

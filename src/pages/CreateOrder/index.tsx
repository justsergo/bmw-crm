import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading
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
    <Card>
      <CardHeader>
        <Heading size="md">Создание заказов</Heading>
      </CardHeader>

      <CardBody>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          <GridItem>
            <SideBar setValue={setValue} control={control} />
          </GridItem>
          <GridItem colSpan={2}>
            <OrderTable control={control} />
          </GridItem>
        </Grid>
        <Box py={2}>
          <ButtonGroup gap="2">
            <Button colorScheme="blackAlpha" onClick={sumbitHandler}>
              Сохранить
            </Button>
            <Button colorScheme="blackAlpha" onClick={goBack}>
              Отменить
            </Button>
          </ButtonGroup>
        </Box>
      </CardBody>
    </Card>
  );
};

export default CreateOrder;

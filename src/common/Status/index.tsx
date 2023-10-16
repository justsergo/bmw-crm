import { Tag } from '@chakra-ui/react';
import { statusTypes } from '../../constants';

const statusVariant = {
  CREATE: { title: 'Создан', color: 'green' },
  COMPLETE: { title: 'Завершен', color: 'purple' },
  REJECT: { title: 'Отменён', color: 'red' }
};

const Status = ({ status = statusTypes.CREATE }: { status: string }) => {
  return (
    <Tag variant="subtle" colorScheme={statusVariant[status].color} border="1px solid">
      {statusVariant[status].title}
    </Tag>
  );
};

export default Status;

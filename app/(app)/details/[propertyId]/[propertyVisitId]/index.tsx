import Header from '@/components/layout/header';
import VisitForm from '@/pages/valuations/forms/visit';
import { useLocalSearchParams } from 'expo-router';

const Details = () => {
  const { propertyId, propertyVisitId } = useLocalSearchParams();
  return (
    <>
      <Header />
      <VisitForm
        propertyId={Number(propertyId)}
        propertyVisitId={Number(propertyVisitId)}
      />
    </>
  );
};

export default Details;

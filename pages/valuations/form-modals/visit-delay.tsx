import { Modal } from '@/components/modal';
import { CalendarX } from 'lucide-react-native';
import { usePropertyById } from '../api-queries/property';
import VisitDelayForm from '../forms/visit-delay';

const VisitDelayModal = ({ propertyId }: { propertyId: number }) => {
  const { data: property } = usePropertyById(propertyId);
  return (
    <Modal triggerIcon={<CalendarX size={18} color="#f55" />}>
      {property?.id && <VisitDelayForm property={property} />}
    </Modal>
  );
};

export default VisitDelayModal;

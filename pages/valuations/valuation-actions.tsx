import { router } from 'expo-router';
import { DoorOpen } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import VisitDelayModal from './form-modals/visit-delay';
import { ValuationIndex } from './models';

interface ValuationActionsProps {
  valuation: ValuationIndex;
}

export const ValuationActions: React.FC<ValuationActionsProps> = ({
  valuation,
}) => {
  const navigateToVisitDetail = () => {
    console.log(valuation);
    router.push({
      pathname: '/details/[propertyId]/[propertyVisitId]',
      params: {
        propertyId: valuation?.property_id,
        propertyVisitId: valuation?.property_visit_id ?? '0',
      },
    });
  };

  return (
    <View style={styles.container}>
      {!valuation?.draft && !valuation?.valuation_cancelled && (
        <Pressable
          style={{
            padding: 4,
            backgroundColor: '#fff',
            borderRadius: 4,
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 1,
          }}
          onPress={navigateToVisitDetail}
        >
          <DoorOpen size={18} color="#444" />
        </Pressable>
      )}

      {valuation?.ready_for_visit_or_delayed &&
        !valuation?.valuation_cancelled && (
          <VisitDelayModal propertyId={valuation?.property_id} />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 4,
    flexWrap: 'wrap',
  },
});

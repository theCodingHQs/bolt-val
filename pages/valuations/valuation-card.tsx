import { accordionColorTrigger, usePhoneDialer } from '@/hooks';
import {
  Building2,
  Calendar,
  Hash,
  MapPin,
  Phone,
  PhoneCall,
  User,
} from 'lucide-react-native';
import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useValuationById } from './api-queries/valuation';
import { ValuationIndex } from './models';
import { ValuationActions } from './valuation-actions';

const ValuationCard = ({
  valuation: valuationInfo,
}: {
  valuation: ValuationIndex;
}) => {
  const { data: valuation } = useValuationById(valuationInfo.id);

  const { backgroundColor, color } = accordionColorTrigger(
    valuationInfo.status_code
  );
  return (
    <View style={{ ...valuationStyles.card, borderColor: `#fff` }}>
      <View style={{ ...valuationStyles.cardHeader, backgroundColor }}>
        <View style={valuationStyles.headerItem}>
          <User size={18} color="#444" />
          <Text
            style={{
              ...valuationStyles.headerText,
              fontWeight: 'bold',
              fontSize: 14,
            }}
          >
            {valuation?.applicant_name}
          </Text>
        </View>
        <View style={valuationStyles.headerItem}>
          <Building2 size={18} color="#444" />
          <Text style={valuationStyles.headerText}>
            {valuation?.institution_name}
          </Text>
        </View>
        <View style={valuationStyles.headerItem}>
          <Hash size={18} color="#444" />
          <Text style={valuationStyles.headerTitle}>Reference Number:</Text>
          <Text
            style={{ ...valuationStyles.headerText, fontWeight: 'bold', color }}
          >
            {valuation?.reference_number}
          </Text>
        </View>
      </View>

      <View
        style={{
          ...valuationStyles.cardBody,
          boxShadow: `inset 0 3px 10px ${backgroundColor}`,
          borderColor: backgroundColor,
        }}
      >
        <Section title="Applicant Details">
          <Detail
            value={valuation?.applicant_phone_number}
            isPhoneNumber
            icon={<Phone color="#444" size={16} />}
          />
          <Detail
            value={valuation?.address}
            icon={<MapPin color="#444" size={16} />}
          />
        </Section>

        <Section title="Contact Information">
          <Detail
            value={valuation?.contact_name}
            icon={<User color="#444" size={16} />}
          />
          <Detail
            value={valuation?.contact_phone_number}
            isPhoneNumber
            icon={<Phone color="#444" size={16} />}
          />
          <Detail
            value={valuation?.contact_alternate_phone_number}
            isPhoneNumber
            icon={<PhoneCall color="#444" size={16} />}
          />
          <Detail
            title="Status :"
            value={valuation?.status_desc}
            detailValueStyle={{ color, fontWeight: 'bold' }}
          />
        </Section>

        <Section title="Branch Contact">
          <Detail
            value={valuation?.branch_contact_person_name}
            icon={<User color="#444" size={16} />}
          />
          <Detail
            value={valuation?.branch_contact_person_phone_number}
            isPhoneNumber
            icon={<Phone color="#444" size={16} />}
          />
          <Detail
            value={valuation?.branch_contact_person_alternate_phone_number}
            isPhoneNumber
            icon={<PhoneCall color="#444" size={16} />}
          />
        </Section>

        <Section title="Important Dates">
          <Detail
            title="Initiation Date"
            value={valuation?.formatted_initiation_date}
            icon={<Calendar color="#444" size={16} />}
          />
          <Detail
            title="Expected Completion"
            value={valuation?.expected_completion_date}
            icon={<Calendar color="#444" size={16} />}
          />
        </Section>
      </View>

      <View style={{ ...valuationStyles.cardFooter, backgroundColor }}>
        <ValuationActions valuation={valuation} />
      </View>
    </View>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={{ ...valuationStyles.section }}>
    <Text style={valuationStyles.sectionTitle}>{title}</Text>
    <View style={valuationStyles.sectionContent}>{children}</View>
  </View>
);

const Detail = ({
  title,
  value,
  icon,
  detailValueStyle,
  isPhoneNumber,
}: {
  title?: string;
  value: string;
  icon?: React.ReactNode;
  detailValueStyle?: TextStyle;
  isPhoneNumber?: boolean;
}) => {
  const { dial } = usePhoneDialer();
  const { colors, roundness } = useTheme();
  return (
    <View
      style={{
        ...valuationStyles.detailRow,
        backgroundColor: isPhoneNumber && value ? '#00000008' : 'none',
      }}
    >
      {icon && <View style={valuationStyles.icon}>{icon}</View>}
      {title && <Text style={valuationStyles.detailLabel}>{title}</Text>}

      {value ? (
        isPhoneNumber ? (
          <Pressable onPress={() => dial(value)} style={{ flex: 1 }}>
            <Text
              style={[
                valuationStyles.detailValue,
                detailValueStyle,
                {
                  color: colors.primary,
                  borderRadius: roundness,
                  textAlign: 'center',
                },
              ]}
            >
              {value}
            </Text>
          </Pressable>
        ) : (
          <Text style={[valuationStyles.detailValue, detailValueStyle]}>
            {value}
          </Text>
        )
      ) : (
        <Text style={[valuationStyles.detailValue, detailValueStyle]}>NA</Text>
      )}
    </View>
  );
};

export default ValuationCard;

const valuationStyles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    minWidth: 300,
    flexShrink: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#00000044',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    padding: 10,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    zIndex: 1,
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#222',
  },
  headerTitle: {
    fontWeight: 'bold',
    marginLeft: 6,
    color: '#666',
  },
  cardBody: {
    // backgroundColor: '#f8f8f8',
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 10,
    paddingTop: 4,
    paddingBottom: 0,
    flex: 1,
  },
  section: {
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomColor: '#aaaa',
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: '#333',
  },
  sectionContent: {
    paddingLeft: 8,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailRow: {
    minWidth: 130,
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 2,
    // margin: 2,
    marginLeft: 0,
    marginRight: 5,
    borderRadius: 4,
    flexWrap: 'wrap',
    // backgroundColor: '#fafafa',
    // boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  icon: {
    marginRight: 4,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    paddingRight: 4,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#555',
    marginRight: 4,
  },
  detailValue: {
    color: '#000',
    flexShrink: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
    boxShadow: '0 -1px 3px rgba(0,0,0,0.1)',
  },
  actionButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  actionText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

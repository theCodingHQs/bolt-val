import Header from '@/components/layout/header';
import SearchButtonInput from '@/components/search-button-input';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useValuations } from './api-queries/valuation';
import ValuationCard from './valuation-card';
import QueriesInvalidatorButton from '@/components/ui/queries-invalidator-button';

const Valuations = () => {
  const { data, isLoading } = useValuations();
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const filteredData = (data as any[])?.filter((item: any) => {
    //["applicant_name", "address", "title", "reference_number", "institution_name", "status_desc", "visitor_name"]
    return item.applicant_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <QueriesInvalidatorButton />
      <Header>
        <SearchButtonInput value={searchQuery} onChangeText={setSearchQuery} />
      </Header>
      <ScrollView contentContainerStyle={valuationStyles.container}>
        {filteredData?.map((item: any, index: number) => {
          return <ValuationCard key={index} valuation={item} />;
        })}
      </ScrollView>
    </>
  );
};

const valuationStyles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    minWidth: 300,
    flex: 1,
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
  },
  section: {
    marginBottom: 5,
    paddingBottom: 8,
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
    padding: 2,
    margin: 2,
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

export default Valuations;

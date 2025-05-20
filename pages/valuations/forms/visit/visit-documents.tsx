import FileItem from '@/components/ui/input/file-item';
import FileSelector from '@/components/ui/input/file-selector';
import { upload } from '@/helpers/api-client';
import { FileInfo } from '@/types/file-types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useGetDocumentsByPropertyVisitId } from '../../api-queries/property-visit';
import { PropertyVisit } from '../../models';
import { PropertyVisitDocumentType } from '../../models/documents';

interface VisitDocumentFormProps {
  propertyVisit?: PropertyVisit;
}

const VisitDocuments = ({ propertyVisit }: VisitDocumentFormProps) => {
  const queryClient = useQueryClient();
  const [documents, setDocuments] = useState<PropertyVisitDocumentType[]>([]);
  const { data: propertyVisitDocuments } = useGetDocumentsByPropertyVisitId(
    propertyVisit?.id!
  );

  const [files, setFiles] = useState<FileInfo[]>([]);

  const url = `/property_visits/${propertyVisit?.id}/property_visit_documents`;
  const { colors, roundness } = useTheme();

  const handleFilesSelected = useCallback((files: FileInfo[]) => {
    setFiles(files);
  }, []);

  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach(async (fileInfo, index) => {
      if (Platform.OS === 'web' && files) {
        formData.append(
          'valuations_property_visit_document[document]',
          fileInfo.file!
        );
        formData.append(
          `valuations_property_visit_document[title]`,
          fileInfo.name
        );
        formData.append(
          `valuations_property_visit_document[description]`,
          fileInfo.name
        );
      } else {
        // React Native: Create a file object compatible with FormData
        const fileUri = fileInfo.uri;
        const fileType = fileInfo.type;
        const fileName = fileInfo.name;

        // For React Native, we need to create a blob with the right structure
        const file: any = {
          uri: fileUri,
          type: fileType,
          name: fileName,
        };

        formData.append('valuations_property_visit_document[document]', file);
        formData.append(`valuations_property_visit_document[title]`, file.name);
        formData.append(
          `valuations_property_visit_document[description]`,
          file.name
        );
      }
      const uploadResult = upload(url, formData);

      await Promise.all([uploadResult]);

      uploadResult.then((result) => {
        if (result.data?.id) {
          queryClient.invalidateQueries({
            queryKey: ['property_visit_documents'],
          });
          console.log(`${fileInfo.name} - Upload Successfully !`);
        } else {
          result.data.document.forEach((message: string) => {
            console.log(`${fileInfo.name} - ${message}`);
          });
        }
      });
    });
  };

  const removeFile = (fileId: string) => {
    setFiles((files) => files.filter((file) => file.id !== fileId));
  };

  useEffect(() => {
    if (propertyVisitDocuments?.length >= 0) {
      setDocuments(
        propertyVisitDocuments?.map((document: PropertyVisitDocumentType) => {
          return { ...document, rotation: 0 };
        })
      );
    }
  }, [propertyVisitDocuments]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FileSelector onFilesSelected={handleFilesSelected} multiple={true} />
      </View>
      {files.length > 0 && (
        <View style={styles.filesContainer}>
          <Text
            style={{
              ...styles.sectionTitle,
              color: colors.onBackground,
              width: '100%',
            }}
          >
            Selected Files
          </Text>
          {files.map((file) => (
            <FileItem
              key={file.id}
              isImage
              file={file}
              onRemove={() => removeFile(file.id)}
            />
          ))}
        </View>
      )}

      <Button
        mode="contained"
        style={styles.submitButton}
        onPress={handleUpload}
      >
        Submit
      </Button>
      <View>
        {documents?.map((document) => (
          <View key={document.id}>
            <Image
              source={{ uri: document.image_url }}
              style={{ width: 250, height: 250 }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default VisitDocuments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  filesContainer: {
    marginTop: 24,
    display: 'flex',
    gap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

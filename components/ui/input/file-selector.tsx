import { FileInfo, FileSelectorProps } from '@/types/file-types';
import { generateUniqueId } from '@/utils/file-utils';
import * as DocumentPicker from 'expo-document-picker';
import { FileUp } from 'lucide-react-native';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebFileSelector } from './web-file-selector';

const FileSelector: React.FC<FileSelectorProps> = ({
  onFilesSelected,
  multiple = false,
  accept,
  maxSize,
}) => {
  const handleSelectFiles = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web file selection is handled by the WebFileSelector component
        return;
      }

      // Mobile file selection using DocumentPicker
      const result = multiple
        ? await DocumentPicker.getDocumentAsync({
            multiple: true,
            copyToCacheDirectory: true,
          })
        : await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
          });

      if (result.canceled) {
        return;
      }

      const selectedFiles: FileInfo[] = result.assets.map((asset) => ({
        id: generateUniqueId(),
        name: asset.name || 'Unknown file',
        size: asset.size || 0,
        type: asset.mimeType || 'application/octet-stream',
        uri: asset.uri,
      }));

      // Filter by file type if specified
      const filteredFiles =
        accept && accept.length > 0
          ? selectedFiles.filter((file) => {
              return accept.some((acceptType) =>
                file.type.startsWith(acceptType.replace('*', ''))
              );
            })
          : selectedFiles;

      // Filter by file size if specified
      const sizeFilteredFiles = maxSize
        ? filteredFiles.filter((file) => file.size <= maxSize)
        : filteredFiles;

      onFilesSelected(sizeFilteredFiles);
    } catch (error) {
      console.error('Error selecting files:', error);
    }
  };

  if (Platform.OS === 'web') {
    return (
      <WebFileSelector
        onFilesSelected={onFilesSelected}
        multiple={multiple}
        accept={accept}
        maxSize={maxSize}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSelectFiles}>
        <FileUp size={24} color="#007AFF" />
        <Text style={styles.buttonText}>
          {multiple ? 'Select Files' : 'Select a File'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderStyle: 'dashed',
    width: '100%',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
  helperText: {
    fontSize: 14,
    color: '#8A8A8E',
    textAlign: 'center',
  },
});

export default FileSelector;

import { FileInfo, FileSelectorProps } from '@/types/file-types';
import { generateUniqueId } from '@/utils/file-utils';
import { FileUp } from 'lucide-react-native';
import React, { useRef } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const WebFileSelector: React.FC<FileSelectorProps> = ({
  onFilesSelected,
  multiple = false,
  accept,
  maxSize,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // This is only available on Web, so we need to guard it
  if (Platform.OS !== 'web') {
    return null;
  }

  const handlePress = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    const selectedFiles: FileInfo[] = Array.from(fileList).map((file) => ({
      id: generateUniqueId(),
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
      uri: URL.createObjectURL(file),
      file: file, // Store the actual File object for web
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

    // Reset the input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const acceptString = accept?.join(',') || '';

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <FileUp size={24} color="#007AFF" />
        <Text style={styles.buttonText}>
          {multiple ? 'Select Files' : 'Select a File'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.helperText}>
        {multiple
          ? 'Click to select one or more files from your device'
          : 'Click to select a file from your device'}
      </Text>

      {/* Hidden file input - only rendered on web */}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        multiple={multiple}
        accept={acceptString}
        onChange={handleFileChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderStyle: 'dashed',
    width: '100%',
    marginBottom: 12,
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

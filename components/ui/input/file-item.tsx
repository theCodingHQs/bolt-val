import { FileInfo } from '@/types/file-types';
import { formatFileSize, getFileIcon } from '@/utils/file-utils';
import { X } from 'lucide-react-native';
import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FileItemProps {
  file: FileInfo;
  isImage?: boolean;
  onRemove: () => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, isImage, onRemove }) => {
  const FileIcon = getFileIcon(file.type);

  return (
    <View style={styles.container}>
      <View style={styles.fileInfo}>
        <View style={styles.iconContainer}>
          {isImage ? (
            <Image
              source={{ uri: file.uri }}
              style={{ width: 40, height: 40, borderRadius: 5 }}
            />
          ) : (
            <FileIcon size={24} color="#007AFF" />
          )}
        </View>
        <View style={styles.details}>
          <Text
            style={styles.fileName}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {file.name}
          </Text>
          <Text style={styles.fileSize}>{formatFileSize(file.size)}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={onRemove}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <X size={18} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    flex:1,
    minWidth:200
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#000000',
  },
  fileSize: {
    fontSize: 14,
    color: '#8A8A8E',
  },
  removeButton: {
    padding: 6,
  },
});

export default FileItem;

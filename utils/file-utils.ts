import { File, FileText, Image, Music, Video } from 'lucide-react-native';

export function generateUniqueId(): string {
  return (
    Math.random()?.toString(36).substring(2, 15) +
    Math.random()?.toString(36).substring(2, 15)
  );
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) {
    return Image;
  } else if (mimeType.startsWith('video/')) {
    return Video;
  } else if (mimeType.startsWith('audio/')) {
    return Music;
  } else if (
    mimeType.includes('pdf') ||
    mimeType.includes('text') ||
    mimeType.includes('document')
  ) {
    return FileText;
  } else {
    return File;
  }
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function isValidFileType(
  filename: string,
  acceptedTypes: string[]
): boolean {
  if (!acceptedTypes || acceptedTypes.length === 0) return true;

  const extension = getFileExtension(filename);
  return acceptedTypes.some((type) => {
    // Handle mime types like "image/*"
    if (type.includes('*')) {
      const mainType = type.split('/')[0];
      return filename.includes(mainType);
    }

    // Handle specific extensions like ".jpg"
    if (type.startsWith('.')) {
      return `.${extension}` === type;
    }

    // Handle full mime types
    return filename.includes(type);
  });
}

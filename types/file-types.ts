export interface FileInfo {
    id: string;
    name: string;
    size: number;
    type: string;
    uri: string;
    file?: File | Blob; // Web-specific
  }
  
  export type FileSelectorProps = {
    onFilesSelected: (files: FileInfo[]) => void;
    multiple?: boolean;
    accept?: string[];
    maxSize?: number; // in bytes
  };
  
  export type UploadProgressCallback = (progress: number) => void;
  
  export type FileUploadOptions = {
    method?: 'POST' | 'PUT';
    headers?: Record<string, string>;
    field?: string;
    onProgress?: UploadProgressCallback;
  };
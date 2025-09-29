import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FileText, UploadCloud, X, CheckCircle2 } from 'lucide-react';
import { useComparisonStore } from '@/store/useComparisonStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
interface DropzoneProps {
  index: number;
}
function Dropzone({ index }: DropzoneProps) {
  const file = useComparisonStore((state) => state.files[index]);
  const setFile = useComparisonStore((state) => state.setFile);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(index, acceptedFiles[0]);
      }
    },
    [index, setFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      'application/pdf': ['.pdf'] 
    },
    maxFiles: 1,
  });
  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(index, null);
  };
  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 text-center transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary/5',
        isDragActive && 'border-primary bg-primary/10 ring-4 ring-primary/20'
      )}
    >
      <input {...getInputProps()} />
      {file ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center p-4"
        >
          <div className="relative">
            <FileText className="h-12 w-12 text-primary" />
            <CheckCircle2 className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-background text-green-500" />
          </div>
          <p className="mt-2 max-w-full truncate px-2 text-sm font-medium text-foreground">{file.name}</p>
          <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7 rounded-full"
            onClick={removeFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <UploadCloud className={cn('h-12 w-12 text-muted-foreground', isDragActive && 'text-primary')} />
          <p className="mt-2 text-sm text-muted-foreground">
            {isDragActive ? 'Drop the file here' : 'Drag & drop PDF, or click'}
          </p>
        </div>
      )}
    </div>
  );
}
interface UploadAreaProps {
  onGenerate: () => void;
}
export function UploadArea({ onGenerate }: UploadAreaProps) {
  const files = useComparisonStore((state) => state.files);
  const uploadedFilesCount = files.filter(Boolean).length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-8"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Dropzone key={i} index={i} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={onGenerate}
          disabled={uploadedFilesCount < 2}
          className="px-12 py-6 text-lg font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-95 disabled:shadow-none"
        >
          Generate Comparison
        </Button>
      </div>
    </motion.div>
  );
}
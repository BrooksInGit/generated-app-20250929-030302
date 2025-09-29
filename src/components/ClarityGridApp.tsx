import { AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useComparisonStore } from '@/store/useComparisonStore';
import { UploadArea } from './UploadArea';
import { LoadingState } from './LoadingState';
import { ComparisonTable } from './ComparisonTable';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
export function ClarityGridApp() {
  const status = useComparisonStore((state) => state.status);
  const files = useComparisonStore((state) => state.files);
  const error = useComparisonStore((state) => state.error);
  const setStatus = useComparisonStore((state) => state.setStatus);
  const setError = useComparisonStore((state) => state.setError);
  const setData = useComparisonStore((state) => state.setData);
  const reset = useComparisonStore((state) => state.reset);
  const handleGenerate = async () => {
    setStatus('processing');
    setError(null);
    setData(null);
    const formData = new FormData();
    files.forEach((file) => {
      if (file) {
        formData.append('files', file);
      }
    });
    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process PDFs.');
      }
      const result = await response.json();
      if (result.success) {
        setData(result.data);
        setStatus('success');
      } else {
        throw new Error(result.error || 'An unknown error occurred.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
      setStatus('error');
    }
  };
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status === 'idle' && <UploadArea onGenerate={handleGenerate} />}
        {status === 'processing' && <LoadingState />}
        {status === 'success' && <ComparisonTable />}
        {status === 'error' && (
          <div className="w-full max-w-2xl mx-auto">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Processing Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="mt-6 flex justify-center">
              <Button onClick={reset}>Try Again</Button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
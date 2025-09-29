import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
const messages = [
  'Parsing PDF documents...',
  'Extracting tabular data...',
  'Normalizing feature fields...',
  'Structuring comparison grid...',
  'Almost there...',
];
export function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-6 p-8 text-center"
    >
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-foreground">Generating Comparison</h3>
        <p className="text-muted-foreground mt-2 text-lg">{messages[messageIndex]}</p>
      </div>
    </motion.div>
  );
}
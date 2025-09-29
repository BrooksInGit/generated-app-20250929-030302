import pdf from 'pdf-parse/lib/pdf-parse.js';
const synonymMap: { [key: string]: string } = {
  'throughput': 'Performance',
  'req/s': 'Performance',
  'requests per second': 'Performance',
  'latency': 'Latency',
  'response time': 'Latency',
  'p99 latency': 'Latency (p99)',
  'memory usage': 'Memory',
  'ram': 'Memory',
  'cpu usage': 'CPU',
  'processor': 'CPU',
  'price': 'Cost',
  'cost': 'Cost',
  'monthly price': 'Cost',
  'storage': 'Storage',
  'disk space': 'Storage',
};
function normalizeFeature(feature: string): string {
  const lowerFeature = feature.toLowerCase().trim();
  return synonymMap[lowerFeature] || feature.trim();
}
async function parsePdf(fileBuffer: ArrayBuffer): Promise<Map<string, string>> {
  try {
    // pdf-parse returns a default export which is the function to call
    const data = await pdf(fileBuffer);
    const text = data.text;
    const lines = text.split('\n').filter((line: string) => line.trim() !== '');
    const features = new Map<string, string>();
    // This is a very basic heuristic to extract key-value pairs.
    // A more robust solution would involve more advanced NLP or layout analysis.
    lines.forEach((line: string) => {
      const parts = line.split(/:\s|--\s|\s\s+/);
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(' ').trim();
        if (key && value && isNaN(parseInt(key, 10))) {
          const normalizedKey = normalizeFeature(key);
          if (!features.has(normalizedKey)) {
            features.set(normalizedKey, value);
          }
        }
      }
    });
    if (features.size === 0) {
        // Fallback for lines without clear separators
        for (let i = 0; i < lines.length - 1; i++) {
            const currentLine = lines[i];
            const nextLine = lines[i+1];
            // Heuristic: if a line seems like a label and the next seems like a value
            if (isNaN(parseInt(currentLine)) && !isNaN(parseInt(nextLine.split(' ')[0]))) {
                const normalizedKey = normalizeFeature(currentLine);
                if (!features.has(normalizedKey)) {
                    features.set(normalizedKey, nextLine);
                }
            }
        }
    }
    return features;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Could not parse the PDF file.');
  }
}
export async function processPdfsForComparison(files: File[]) {
  if (files.length < 2 || files.length > 3) {
    throw new Error('Please upload 2 or 3 files for comparison.');
  }
  const productNames = files.map(file => file.name.replace(/\.pdf$/i, ''));
  const parsedData = await Promise.all(
    files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      return parsePdf(arrayBuffer);
    })
  );
  const allFeatures = new Set<string>();
  parsedData.forEach(productFeatures => {
    productFeatures.forEach((_, key) => {
      allFeatures.add(key);
    });
  });
  if (allFeatures.size === 0) {
    throw new Error('No comparable features could be extracted from the PDFs. Please try different documents.');
  }
  const sortedFeatures = Array.from(allFeatures).sort();
  const headers = ['Feature', ...productNames];
  const rows = sortedFeatures.map(feature => {
    const rowData: (string | null)[] = [feature];
    parsedData.forEach(productFeatures => {
      rowData.push(productFeatures.get(feature) || null);
    });
    return rowData;
  });
  return { headers, rows, productNames };
}
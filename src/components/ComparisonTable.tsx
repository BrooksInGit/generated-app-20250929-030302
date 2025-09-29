import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp, ChevronsUpDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useComparisonStore } from '@/store/useComparisonStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Papa from 'papaparse';
type SortDirection = 'asc' | 'desc' | null;
export function ComparisonTable() {
  const { data, reset } = useComparisonStore((state) => ({ data: state.data, reset: state.reset }));
  const [sortConfig, setSortConfig] = useState<{ key: number; direction: SortDirection }>({
    key: 0,
    direction: 'asc',
  });
  const sortedRows = useMemo(() => {
    if (!data?.rows) return [];
    const sortableItems = [...data.rows];
    if (sortConfig.direction !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA === null || valA === '') return 1;
        if (valB === null || valB === '') return -1;
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
        }
        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        if (strA < strB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (strA > strB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data?.rows, sortConfig]);
  const requestSort = (key: number) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };
  const getSortIcon = (key: number) => {
    if (sortConfig.key !== key || sortConfig.direction === null) {
      return <ChevronsUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };
  const handleExport = () => {
    if (!data) return;
    const csvData = [
      data.headers,
      ...data.rows.map(row => row.map(cell => (cell === null ? '' : cell)))
    ];
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'comparison.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  if (!data) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <Card className="w-full border-0 shadow-2xl shadow-primary/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold font-display">Comparison Results</CardTitle>
          <div className="flex items-center space-x-2">
            <Button onClick={handleExport} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={reset}>Start New Comparison</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  {data.headers.map((header, index) => (
                    <TableHead
                      key={header}
                      onClick={() => requestSort(index)}
                      className={`cursor-pointer select-none transition-colors hover:bg-muted/50 ${index === 0 ? 'w-[250px]' : ''}`}
                    >
                      <div className="flex items-center">
                        {header}
                        {getSortIcon(index)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRows.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="transition-colors hover:bg-muted/50">
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex} className={cellIndex === 0 ? 'font-medium' : ''}>
                        {cell === null ? <span className="text-muted-foreground">-</span> : String(cell)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
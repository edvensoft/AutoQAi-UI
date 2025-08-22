// utils/exportToExcel.ts
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Exports JSON data to an Excel (.xlsx) file.
 * @param data - Array of objects (JSON)
 * @param filename - Name of the Excel file (without extension)
 */
export function exportToExcel<T>(data: T[], filename: string = 'data') {
  // Create a worksheet from the JSON data
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a workbook and add the worksheet to it
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate Excel file as a blob
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  // Use FileSaver to save the file
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, `${filename}.xlsx`);
}

export default exportToExcel
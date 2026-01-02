import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export interface ExcelExportOptions<T> {
  data: T[];
  fileName: string;
  sheetName?: string;
}

export const exportToExcel = <T>({
  data,
  fileName,
  sheetName = 'Sheet1',
}: ExcelExportOptions<T>) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  const blob = new Blob([excelBuffer], {
    type:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });

  saveAs(blob, `${fileName}.xlsx`);
};

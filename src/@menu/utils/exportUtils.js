import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import copy from 'copy-to-clipboard'

export const exportCSV = (data, filename = 'data.csv') => {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, filename)
}

export const exportExcel = (data, filename = 'data.xlsx') => {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, filename)
}

export const exportPDF = (data, columns, filename = 'data.pdf') => {
  const doc = new jsPDF()

  doc.autoTable({
    head: [columns],
    body: data.map(row => columns.map(col => row[col])),
  })
  doc.save(filename)
}

export const copyToClipboard = (data) => {
  copy(JSON.stringify(data, null, 2))
  alert('Copied to clipboard')
}

export const printTable = (data, columns) => {
  const printWindow = window.open('', '_blank')

  const tableHTML = `
    <html>
      <head>
        <title>Print Data</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h3>Branch List</h3>
        <table>
          <thead>
            <tr>${columns.map(col => `<th>${col}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${data.map(row => `<tr>${columns.map(col => `<td>${row[col]}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `

  printWindow.document.write(tableHTML)
  printWindow.document.close()
  printWindow.print()
}

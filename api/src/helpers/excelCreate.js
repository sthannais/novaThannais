const ExcelJS = require('exceljs');

const createExcelBuffer = async (data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Hoja 1');
    const columns = Object.keys(data[0]);
    const rows = data.map((row) => Object.values(row));
    worksheet.columns = columns.map((column) => ({ header: column, key: column }));
    worksheet.addRows(rows);
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

module.exports = {
    createExcelBuffer
}
const ExcelJS = require('exceljs');

const createExcelBuffer = async (data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Ordenes');
    const columns = Object.keys(data[0]);
    const rows = data.map((row) => Object.values({
        ...row,
        // se le da el formato de moneda con puntos y comas a la columna de totalRecaudacion
        totalRecaudacion: new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(row.totalRecaudacion)
    }));
    worksheet.columns = columns.map((column) => ({ header: column, key: column, width: 22 }));
    worksheet.addRows(rows);
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

module.exports = {
    createExcelBuffer
}
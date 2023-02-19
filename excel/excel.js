const ExcelJS = require('exceljs');

const createExcel = async (req, res) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet('Usuário 1');

  worksheet.getCell('A1').value = 'Valor da Célula A1';

  workbook.xlsx.writeBuffer().then((buffer) => {
    // Envie o buffer como resposta para a requisição de API
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=arquivo.xlsx');
    res.send(buffer);
  });
};

export default createExcel;

import { getClientsSells } from '../backend/controllers/client';
import { LocaltoUTC, UTCtoLocal } from '../utils/utils';

const ExcelJS = require('exceljs');

const createExcel = async (req, res) => {
  let dateMax = LocaltoUTC(new Date(req.body.dateMax));
  dateMax.setDate(dateMax.getDate() + 1);
  dateMax.setMilliseconds(dateMax.getMilliseconds() - 1);
  const clients = await getClientsSells(
    LocaltoUTC(new Date(req.body.dateMin)),
    dateMax
  );

  const workbook = new ExcelJS.Workbook();

  // Criar uma nova worksheet para cada cliente
  clients.forEach((client) => {
    if (client.products.length === 0 && client.purchases.length === 0) return;

    const worksheet = workbook.addWorksheet(client.name.replace(/\//g, '-'));
    worksheet.views = [{ showGridLines: false }];

    // Cria a célula do título "Dados do Cliente"
    const titleCell = worksheet.getCell('B2');
    titleCell.value = 'Dados do Cliente';
    titleCell.font = { size: 20, bold: true };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
    titleCell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'FFC0C0C0' } },
    };
    worksheet.getRow(2).height = 40;
    worksheet.mergeCells('B2:G2');
    // Adicionar o nome, id, nome e telefone do cliente na parte superior da worksheet
    const clientInfRow = worksheet.addRow([
      '',
      'ID:',
      client.id,
      'Nome:',
      client.name,
      'Telefone:',
      client.phone,
    ]);
    worksheet.getRow(3).height = 40;
    clientInfRow.getCell(2).font = { bold: true, size: 14 };
    clientInfRow.getCell(3).font = { size: 14 };
    clientInfRow.getCell(4).font = { bold: true, size: 14 };
    clientInfRow.getCell(5).font = { size: 14 };
    clientInfRow.getCell(6).font = { bold: true, size: 14 };
    clientInfRow.getCell(7).font = { size: 14 };

    clientInfRow.getCell(3).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin', color: { argb: 'FFC0C0C0' } },
    };
    clientInfRow.getCell(2).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    clientInfRow.getCell(4).border = { bottom: { style: 'thin' } };
    clientInfRow.getCell(5).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin', color: { argb: 'FFC0C0C0' } },
    };
    clientInfRow.getCell(6).border = { bottom: { style: 'thin' } };
    clientInfRow.getCell(7).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };

    clientInfRow.getCell(1).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    clientInfRow.getCell(2).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    clientInfRow.getCell(3).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    clientInfRow.getCell(4).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    clientInfRow.getCell(5).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    clientInfRow.getCell(6).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    clientInfRow.getCell(7).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };

    // Adicionar a tabela de produtos do cliente
    let emptyRow = worksheet.addRow([]);
    emptyRow.height = 40;

    let row = worksheet.addRow(['', 'Vendas']);

    row.height = 40;

    worksheet.mergeCells(
      row.getCell(2).address + ':' + row.getCell(13).address
    );

    row.getCell(2).font = { bold: true, size: 20 };
    row.getCell(2).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(2).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'FFC0C0C0' } },
    };

    let headerRow = worksheet.addRow([
      '',
      'ID',
      'ID da Venda',
      'Preço',
      'Preço de Venda',
      'Produto',
      'Marca',
      'Tamanho',
      'Cor',
      'Descrição',
      'Data de Entrada',
      'Data de Saída',
      'Comprador',
    ]);

    for (let i = 2; i < 14; i++) {
      headerRow.getCell(i).style = {
        ...headerRow.getCell(i).style,
        border: {
          top: { style: 'thin', color: { argb: 'FFC0C0C0' } },
          left: { style: 'thin', color: { argb: 'FFC0C0C0' } },
          bottom: { style: 'thin', color: { argb: 'FFC0C0C0' } },
          right: { style: 'thin', color: { argb: 'FFC0C0C0' } },
        },
        alignment: {
          vertical: 'middle',
          horizontal: 'center',
        },
        font: { bold: true, size: 13 },
      };
    }

    headerRow.getCell(2).style = {
      ...headerRow.getCell(2).style,
      border: { ...headerRow.getCell(2).style.border, left: { style: 'thin' } },
    };
    headerRow.getCell(13).style = {
      ...headerRow.getCell(13).style,
      border: {
        ...headerRow.getCell(13).style.border,
        right: { style: 'thin' },
      },
    };

    headerRow.height = 25;
    let somaTotal = 0;
    let soma = 0;
    client.products.forEach((product) => {
      somaTotal += parseFloat(product.price);
      soma += parseFloat(product.sellPrice);
      row = worksheet.addRow([
        '',
        product.id,
        product.sellId,
        parseFloat(product.price),
        parseFloat(product.sellPrice),
        product.product,
        product.brand,
        product.size,
        product.color,
        product.description,
        UTCtoLocal(product.entry),
        UTCtoLocal(product.sell.createdAt),
        product.sell.buyer.name,
      ]);

      row.getCell(4).numFmt = '#,##0.00';
      row.getCell(5).numFmt = '#,##0.00';

      for (let i = 2; i < 14; i++) {
        row.getCell(i).style = {
          ...row.getCell(i).style,
          border: {
            top: { style: 'thin', color: { argb: 'FFC0C0C0' } },
            left: { style: 'thin', color: { argb: 'FFC0C0C0' } },
            bottom: { style: 'thin', color: { argb: 'FFC0C0C0' } },
            right: { style: 'thin', color: { argb: 'FFC0C0C0' } },
          },
          alignment: {
            vertical: 'middle',
            horizontal: 'center',
          },
          font: { size: 13 },
        };
      }
      row.getCell(2).style = {
        ...row.getCell(2).style,
        border: { ...row.getCell(2).style.border, left: { style: 'thin' } },
      };
      row.getCell(13).style = {
        ...row.getCell(13).style,
        border: { ...row.getCell(13).style.border, right: { style: 'thin' } },
      };
      row.height = 25;
    });

    if (client.products.length > 0) {
      for (let i = 2; i < 14; i++) {
        row.getCell(i).style = {
          ...row.getCell(i).style,
          border: {
            ...row.getCell(i).style.border,
            bottom: { style: 'thin' },
          },
        };
      }
    }

    row = worksheet.addRow(['', '', '', somaTotal, soma]);

    row.alignment = { vertical: 'middle', horizontal: 'center' };

    row = worksheet.addRow([]);
    row.height = 40;

    row = worksheet.addRow(['', 'Compras']);

    row.height = 40;

    worksheet.mergeCells(
      row.getCell(2).address + ':' + row.getCell(13).address
    );

    row.getCell(2).font = { bold: true, size: 20 };
    row.getCell(2).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(2).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'FFC0C0C0' } },
    };

    let headerRow2 = worksheet.addRow([
      '',
      'ID',
      'ID da Venda',
      'Preço',
      'Preço de Venda',
      'Produto',
      'Marca',
      'Tamanho',
      'Cor',
      'Descrição',

      'Data de Entrada',
      'Data de Saída',
      'Fornecedor',
    ]);

    for (let i = 2; i < 14; i++) {
      headerRow2.getCell(i).style = {
        ...headerRow2.getCell(i).style,
        border: {
          top: { style: 'thin', color: { argb: 'FFC0C0C0' } },
          left: { style: 'thin', color: { argb: 'FFC0C0C0' } },
          bottom: { style: 'thin', color: { argb: 'FFC0C0C0' } },
          right: { style: 'thin', color: { argb: 'FFC0C0C0' } },
        },
        alignment: {
          vertical: 'middle',
          horizontal: 'center',
        },
        font: { bold: true, size: 13 },
      };
    }

    headerRow2.getCell(2).style = {
      ...headerRow2.getCell(2).style,
      border: {
        ...headerRow2.getCell(2).style.border,
        left: { style: 'thin' },
      },
    };
    headerRow2.getCell(13).style = {
      ...headerRow2.getCell(13).style,
      border: {
        ...headerRow2.getCell(13).style.border,
        right: { style: 'thin' },
      },
    };

    headerRow2.height = 25;
    somaTotal = 0;
    soma = 0;
    client.purchases.forEach((purchase) => {
      purchase.products.forEach((product) => {
        somaTotal += parseFloat(product.price);
        soma += parseFloat(product.sellPrice);
        row = worksheet.addRow([
          '',
          product.id,
          product.sellId,
          parseFloat(product.price),
          parseFloat(product.sellPrice),
          product.product,
          product.brand,
          product.size,
          product.color,
          product.description,
          UTCtoLocal(product.entry),
          UTCtoLocal(purchase.createdAt),
          product.provider.name,
        ]);

        row.getCell(4).numFmt = '#,##0.00';
        row.getCell(5).numFmt = '#,##0.00';

        for (let i = 2; i < 14; i++) {
          row.getCell(i).style = {
            ...row.getCell(i).style,
            border: {
              top: { style: 'thin', color: { argb: 'FFC0C0C0' } },
              left: { style: 'thin', color: { argb: 'FFC0C0C0' } },
              bottom: { style: 'thin', color: { argb: 'FFC0C0C0' } },
              right: { style: 'thin', color: { argb: 'FFC0C0C0' } },
            },
            alignment: {
              vertical: 'middle',
              horizontal: 'center',
            },
            font: { size: 13 },
          };
        }
        row.getCell(2).style = {
          ...row.getCell(2).style,
          border: { ...row.getCell(2).style.border, left: { style: 'thin' } },
        };
        row.getCell(13).style = {
          ...row.getCell(13).style,
          border: { ...row.getCell(13).style.border, right: { style: 'thin' } },
        };
        row.height = 25;
      });
    });
    for (let i = 2; i < 14; i++) {
      row.getCell(i).style = {
        ...row.getCell(i).style,
        border: {
          ...row.getCell(i).style.border,
          bottom: { style: 'thin' },
        },
      };
    }

    row = worksheet.addRow(['', '', '', somaTotal, soma]);
    row.alignment = { vertical: 'middle', horizontal: 'center' };

    // Ajustar o tamanho das colunas com base no tamanho do conteúdo
    headerRow.eachCell((cell, colNumber) => {
      let maxLength = cell.value.toString().length;
      worksheet
        .getColumn(colNumber)
        .eachCell({ includeEmpty: true }, (cell) => {
          const columnLength = cell.value ? cell.value.toString().length : 0;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
      worksheet.getColumn(colNumber).width = ((maxLength + 3) * 13) / 12; // Adiciona 3 caracteres extras para evitar que o conteúdo seja truncado
    });
  });

  return workbook.xlsx.writeBuffer().then((buffer) => {
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

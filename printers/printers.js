import * as qz from 'qz-tray';
import { baseURL } from '../config/config';

const padId = (id) => {
  let strID = String(id);
  for (let i = strID.length; i < 9; i++) {
    strID = '0'.concat(strID);
  }
  return strID;
};

export const printEtiqueta = (productsId) => {
  if (productsId.length > 0) {
    const body = {
      action: 'GET',
      fields: {
        id: true,
        product: true,
        color: true,
        brand: true,
        entry: true,
        size: true,
        price: true,
      },
      filter: {
        id: {
          in: productsId,
        },
      },
    };

    fetch(baseURL + '/product', {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          if (qz.websocket.isActive()) {
            qz.websocket.disconnect().then(() => printEtiqueta2(data));
          } else {
            printEtiqueta2(data);
          }
        }
      });
  }
};

const printEtiqueta2 = (products) => {
  qz.websocket
    .connect()
    .then(() => {
      return qz.printers.find('Argox');
    })
    .then(async (found) => {
      var config = qz.configs.create(found, {
        size: { width: 10.5, height: 6 },
        colorType: 'blackwhite',
        units: 'cm',
      });

      var data = [];

      for (let i = 0; i < Math.floor(products.length / 3); i++) {
        data = [
          '\x02L\n', // Important DPL/CLP must begin with STX (x02) on
          'A3\n',
          'D11\n',
          'H30\n',
          'Q1\n',
          //Etq 1
          //Renova
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0040' + //row bottom to top - max 200
            '0080' + // collumn left to right - max 400
            'RENOVA' + // data
            '\n',
          // Desc
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0065' + //row bottom to top - max 200
            '0110' + // collumn left to right - max 400
            products[i * 3].product +
            products[i * 3].color +
            '\n',
          //Marca
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0090' + //row bottom to top - max 200
            '0110' + // collumn left to right - max 400
            products[i * 3].brand + // data
            '\n',
          // Data
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0115' + //row bottom to top - max 200
            '0110' + // collumn left to right - max 400
            products[i * 3].entry + // data
            '\n',
          //Tam
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0140' + //row bottom to top - max 200
            '0050' + // collumn left to right - max 400
            products[i * 3].size + // data
            '\n',
          //Preco
          '3' + // rotation
            '3' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0140' + //row bottom to top - max 200
            '0110' + // collumn left to right - max 400
            'R$' +
            products[i * 3].price + // data
            '\n',
          //Barcode
          '3D5200002000110' + padId(products[i * 3].id) + '\n',
          //Etq 2
          //Renova
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0040' + //row bottom to top - max 200
            '0215' + // collumn left to right - max 400
            'RENOVA' + // data
            '\n',
          // Desc
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0065' + //row bottom to top - max 200
            '0245' + // collumn left to right - max 400
            products[i * 3 + 1].product +
            products[i * 3 + 1].color +
            '\n',
          //Marca
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0090' + //row bottom to top - max 200
            '0245' + // collumn left to right - max 400
            products[i * 3 + 1].brand + // data
            '\n',
          // Data
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0115' + //row bottom to top - max 200
            '0245' + // collumn left to right - max 400
            products[i * 3 + 1].entry + // data
            '\n',
          //Tam
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0140' + //row bottom to top - max 200
            '0185' + // collumn left to right - max 400
            products[i * 3 + 1].size + // data
            '\n',
          //Preco
          '3' + // rotation
            '3' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0140' + //row bottom to top - max 200
            '0245' + // collumn left to right - max 400
            'R$' +
            products[i * 3 + 1].price + // data
            '\n',
          //Barcode
          '3D5200002000245' + padId(products[i * 3 + 1].id) + '\n',

          //Etq 3
          //Renova
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0040' + //row bottom to top - max 200
            '0350' + // collumn left to right - max 400
            'RENOVA' + // data
            '\n',
          // Desc
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0065' + //row bottom to top - max 200
            '0380' + // collumn left to right - max 400
            products[i * 3 + 2].product +
            products[i * 3 + 2].color +
            '\n',
          // Marca
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0090' + //row bottom to top - max 200
            '0380' + // collumn left to right - max 400
            products[i * 3 + 2].brand + // data
            '\n',
          // Data
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0115' + //row bottom to top - max 200
            '0380' + // collumn left to right - max 400
            products[i * 3 + 2].entry + // data
            '\n',
          //Tam
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0140' + //row bottom to top - max 200
            '0320' + // collumn left to right - max 400
            products[i * 3 + 2].size + // data
            '\n',
          //Preco
          '3' + // rotation
            '3' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0140' + //row bottom to top - max 200
            '0380' + // collumn left to right - max 400
            'R$' +
            products[i * 3 + 2].price + // data
            '\n',
          //Barcode
          '3D5200002000380' + padId(products[i * 3 + 2].id) + '\n',

          'E\n',
        ];
        await qz.print(config, data).catch(function (e) {
          console.error(e);
        });
        console.log('impressao 1');
      }

      if (products.length % 3 === 1) {
        data = [
          '\x02L\n', // Important DPL/CLP must begin with STX (x02) on
          'A3\n',
          'D11\n',
          'H30\n',
          'Q1\n',
          //Etq 1
          //Renova
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0040' + //row bottom to top - max 200
            '0080' + // collumn left to right - max 400
            'RENOVA' + // data
            '\n',
          // Desc
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0065' + //row bottom to top - max 200
            '0110' + // collumn left to right - max 400
            products[products.length - 1].product +
            products[products.length - 1].color +
            '\n',
          // Desc
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0090' + //row bottom to top - max 200
            '0110' + // collumn left to right - max 400
            products[products.length - 1].brand + // data
            '\n',
          // Data
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0110' + //row bottom to top - max 200
            '0110' + // collumn left to right - max 0
            products[products.length - 1].entry + // data
            '\n',
          //Tam
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0140' + //row bottom to top - max 200
            '0050' + // collumn left to right - max 400
            products[products.length - 1].size + // data
            '\n',
          //Preco
          '3' + // rotation
            '3' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0140' + //row bottom to top - max 200
            '0110' + // collumn left to right - max 400
            'R$' +
            products[products.length - 1].price + // data
            '\n',
          //Barcode
          '3D5200002000110' + padId(products[products.length - 1].id) + '\n',

          'E\n',
        ];
        await qz.print(config, data).catch(function (e) {
          console.error(e);
        });
      }

      if (products.length % 3 === 2) {
        data = [
          '\x02L\n', // Important DPL/CLP must begin with STX (x02) on
          'A3\n',
          'D11\n',
          'H30\n',
          'Q1\n',
          //Etq 1
          //Renova
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0040' + //row bottom to top - max 200
            '0080' + // collumn left to right - max 400
            'RENOVA' + // data
            '\n',
          // Desc
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0065' + //row bottom to top - max 200
            '0110' + // collumn left to right - max 400
            products[products.length - 1].product +
            products[products.length - 1].color +
            '\n',
          // Desc
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0090' + //row bottom to top - max 200
            '0110' + // collumn left to right - max 400
            products[products.length - 1].brand + // data
            '\n',
          // Data
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0110' + //row bottom to top - max 200
            '0110' + // collumn left to right - max 0
            products[products.length - 1].entry + // data
            '\n',
          //Tam
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0140' + //row bottom to top - max 200
            '0050' + // collumn left to right - max 400
            products[products.length - 1].size + // data
            '\n',
          //Preco
          '3' + // rotation
            '3' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0140' + //row bottom to top - max 200
            '0110' + // collumn left to right - max 400
            'R$' +
            products[products.length - 1].price + // data
            '\n',
          //Barcode
          '3D5200002000110' + padId(products[products.length - 1].id) + '\n',

          //Etq 2
          //Renova
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0040' + //row bottom to top - max 200
            '0215' + // collumn left to right - max 400
            'RENOVA' + // data
            '\n',
          // Desc
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0065' + //row bottom to top - max 200
            '0245' + // collumn left to right - max 400
            products[products.length - 2].product +
            products[products.length - 2].color +
            '\n',
          //Marca
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0090' + //row bottom to top - max 200
            '0245' + // collumn left to right - max 400
            products[products.length - 2].brand + // data
            '\n',
          // Data
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0115' + //row bottom to top - max 200
            '0245' + // collumn left to right - max 400
            products[products.length - 2].entry + // data
            '\n',
          //Tam
          '3' + // rotation
            '2' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0140' + //row bottom to top - max 200
            '0185' + // collumn left to right - max 400
            products[products.length - 2].size + // data
            '\n',
          //Preco
          '3' + // rotation
            '3' + // font size
            '1' + // width mult
            '1' + // height mult
            '000' + // pattern
            '0140' + //row bottom to top - max 200
            '0245' + // collumn left to right - max 400
            'R$' +
            products[products.length - 2].price + // data
            '\n',
          //Barcode
          '3D5200002000245' + padId(products[products.length - 2].id) + '\n',

          'E\n',
        ];
        await qz.print(config, data).catch(function (e) {
          console.error(e);
        });
      }
      await qz.websocket.disconnect();
    });
};

export const printRecibo3 = (sellId) => {
  const body = {
    action: 'GET',
    number: 10,
    fields: {
      product: true,
      color: true,
      brand: true,
      sellPrice: true,
      sell: { select: { type: true, buyer: { select: { name: true } } } },
    },
    filter: { sell: { id: sellId } },
  };

  fetch(baseURL + '/product', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        if (data.length > 0)
          printRecibo(data[0].sell.type, data, data[0].sell.buyer.name);
      }
    });
};

export const printRecibo = (sell, products, buyer) => {
  if (qz.websocket.isActive()) {
    qz.websocket.disconnect().then(() => printRecibo2(sell, products));
  } else {
    printRecibo2(sell, products, buyer);
  }
};

const printRecibo2 = (sell, products, buyer) => {
  const date = new Date(Date.now());
  qz.websocket
    .connect()
    .then(() => {
      return qz.printers.find('EPSON TM-T20 Receipt');
    })
    .then(async (found) => {
      var config = qz.configs.create(found);
      var productsData = [];
      var total = 0.0;
      for (var i = 0; i < products.length; i++) {
        total += parseFloat(products[i].sellPrice);
        var text =
          products[i].product +
          ' ' +
          products[i].color +
          ' ' +
          products[i].brand;

        text = text.concat(' '.repeat(40 - text.length));

        text = text.concat(parseFloat(products[i].sellPrice).toFixed(2));

        productsData = productsData.concat([
          text + //40
            '\x1B' +
            '\x74' +
            '\x13' +
            '\xAA', //print special character symbol after numeric value
          '\x0A',
        ]);
      }

      var data = [
        '\x1B' + '\x40', // init
        '\x1B' + '\x61' + '\x31', // center align
        'RENOVA' + '\x0A',

        '\x0A', // line break
        '@renova_sustentavel_curitiba' + '\x0A', // text and line break
        '\x0A', // line break
        buyer,
        '\x0A', // line break
        '\x0A', // line break
        ('00' + date.getDate()).slice(-2) +
          '/' +
          ('00' + (date.getMonth() + 1)).slice(-2) +
          '/' +
          date.getFullYear() +
          ' ' +
          ('00' + date.getHours()).slice(-2) +
          ':' +
          ('00' + date.getMinutes()).slice(-2) +
          ':' +
          ('00' + date.getSeconds()).slice(-2) +
          '\x0A',
        '\x0A', // line break
        '\x0A', // line break
        'Registo de ' + sell + '\x0A',
        '\x0A',
        '\x0A',
        '\x0A',
        '\x0A',
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
      ];

      data = data.concat(productsData);
      data = data.concat([
        '\x1B' + '\x21' + '\x0A' + '\x1B' + '\x45' + '\x0A', // em mode off
        '\x0A' + '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        '----------------------------------------------' + '\x0A',
        'Total                                   ' +
          total.toFixed(2) +
          '\x1B' +
          '\x74' +
          '\x13' +
          '\xAA',
        '\x1B' + '\x61' + '\x30', // left align
        '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
        '\x1B' + '\x69', // cut paper
      ]);

      await qz.print(config, data).catch(function (e) {
        console.error(e);
      });
    });
};

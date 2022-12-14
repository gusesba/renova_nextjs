import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormCheck } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export interface ISearchSellForm {
  fields: {
    description: boolean;
    product: boolean;
    price: boolean;
    brand: boolean;
    size: boolean;
    color: boolean;
    provider: { select: { name: boolean } | undefined };
    entry: boolean;
    sellPrice: boolean;
    sell:
      | {
          select:
            | {
                buyer:
                  | {
                      select:
                        | {
                            name: boolean;
                          }
                        | undefined;
                    }
                  | undefined;
                type: boolean;
              }
            | undefined;
        }
      | undefined;
  };
  filter:
    | {
        id: number | undefined;
        provider: { name: { contains: string } | undefined } | undefined;
        description: { contains: string } | undefined;
        product: { contains: string } | undefined;
        brand: { contains: string } | undefined;
        size: { contains: string } | undefined;
        color: { contains: string } | undefined;
        price: { lte: number | undefined; gte: number | undefined } | undefined;
        entry: { lte: string | undefined; gte: string | undefined } | undefined;
        sellPrice:
          | { lte: number | undefined; gte: number | undefined }
          | undefined;
        sell:
          | {
              type: { contains: string } | undefined;
              buyer: { name: { contains: string } } | undefined;
            }
          | undefined;
      }
    | undefined;
  setFilter: Dispatch<SetStateAction<{} | undefined>>;
  setFields: Dispatch<SetStateAction<{}>>;
  setHeaders: Dispatch<SetStateAction<string[]>>;
}

const SearchSellForm: React.FC<ISearchSellForm> = ({
  fields,
  filter,
  setFilter,
  setFields,
  setHeaders,
}) => {
  const [values, setValues] = useState({
    providerName: filter
      ? filter.provider?.name
        ? filter.provider.name.contains
        : ''
      : '',
    description: filter
      ? filter.description
        ? filter.description.contains
        : ''
      : '',
    product: filter ? (filter.product ? filter.product.contains : '') : '',
    brand: filter ? (filter.brand ? filter.brand.contains : '') : '',
    size: filter ? (filter.size ? filter.size.contains : '') : '',
    color: filter ? (filter.color ? filter.color.contains : '') : '',
    buyer: filter
      ? filter.sell
        ? filter.sell.buyer
          ? filter.sell.buyer.name.contains
          : ''
        : ''
      : '',
    type: filter
      ? filter.sell
        ? filter.sell.type
          ? filter.sell.type.contains
          : ''
        : ''
      : '',
    priceMin: filter
      ? filter.price
        ? filter.price.gte
          ? filter.price.gte
          : ''
        : ''
      : '',
    priceMax: filter
      ? filter.price
        ? filter.price.lte
          ? filter.price.lte
          : ''
        : ''
      : '',
    sellPriceMin: filter
      ? filter.sellPrice
        ? filter.sellPrice.gte
          ? filter.sellPrice.gte
          : ''
        : ''
      : '',
    sellPriceMax: filter
      ? filter.sellPrice
        ? filter.sellPrice.lte
          ? filter.sellPrice.lte
          : ''
        : ''
      : '',
    dateMin: filter
      ? filter.entry
        ? filter.entry.gte
          ? filter.entry.gte
          : ''
        : ''
      : '',
    dateMax: filter
      ? filter.entry
        ? filter.entry.lte
          ? filter.entry.lte
          : ''
        : ''
      : '',
    id: filter ? (filter.id ? filter.id.toString() : '') : '',
    descriptionCheck: fields.description,
    productCheck: fields.product,
    buyerCheck: fields.sell?.select?.buyer?.select?.name,
    typeCheck: fields.sell?.select?.type,
    brandCheck: fields.brand,
    sizeCheck: fields.size,
    colorCheck: fields.color,
    priceCheck: fields.price,
    sellPriceCheck: fields.sellPrice,
    entryCheck: fields.entry,
    providerNameCheck: fields.provider.select?.name,
  });

  const onChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let filter:
      | {
          id: number | undefined;
          provider: { name: { contains: string } | undefined } | undefined;
          description: { contains: string } | undefined;
          product: { contains: string } | undefined;
          brand: { contains: string } | undefined;
          size: { contains: string } | undefined;
          color: { contains: string } | undefined;
          price:
            | { lte: number | undefined; gte: number | undefined }
            | undefined;
          sellPrice:
            | { lte: number | undefined; gte: number | undefined }
            | undefined;
          entry: { lte: Date | undefined; gte: Date | undefined } | undefined;
          sell:
            | {
                type: { contains: string } | undefined;
                buyer: { name: { contains: string } | undefined } | undefined;
              }
            | undefined;
        }
      | undefined = {
      id: undefined,
      provider: { name: undefined },
      description: undefined,
      product: undefined,
      brand: undefined,
      size: undefined,
      color: undefined,
      price: undefined,
      sellPrice: undefined,
      entry: undefined,
      sell: { type: undefined, buyer: { name: undefined } },
    };

    let headers = ['Id'];

    if (values.priceCheck) headers = headers.concat(['Pre??o']);
    if (values.sellPriceCheck) headers = headers.concat(['Pre??o Venda']);
    if (values.typeCheck) headers = headers.concat(['Tipo']);
    if (values.buyerCheck) headers = headers.concat(['Comprador']);
    if (values.productCheck) headers = headers.concat(['Produto']);
    if (values.brandCheck) headers = headers.concat(['Marca']);
    if (values.sizeCheck) headers = headers.concat(['Tamanho']);
    if (values.colorCheck) headers = headers.concat(['Cor']);
    if (values.providerNameCheck) headers = headers.concat(['Fornecedor']);
    if (values.descriptionCheck) headers = headers.concat(['Descri????o']);
    if (values.entryCheck) headers = headers.concat(['Entrada']);

    filter.id = isNaN(parseInt(values.id)) ? undefined : parseInt(values.id);
    filter.product = { contains: values.product };
    filter.brand = { contains: values.brand };
    filter.size = { contains: values.size };
    filter.color = { contains: values.color };
    filter.provider = { name: { contains: values.providerName } };
    filter.sell = {
      type: { contains: values.type },
      buyer: { name: { contains: values.buyer } },
    };
    filter.description = { contains: values.description };
    if (values.priceMin) {
      if (values.priceMax)
        filter.price = {
          lte: parseInt(values.priceMax as string),
          gte: parseInt(values.priceMin as string),
        };
      else
        filter.price = {
          lte: undefined,
          gte: parseInt(values.priceMin as string),
        };
    } else if (values.priceMax)
      filter.price = {
        lte: parseInt(values.priceMax as string),
        gte: undefined,
      };
    if (values.sellPriceMin) {
      if (values.sellPriceMax)
        filter.sellPrice = {
          lte: parseInt(values.sellPriceMax as string),
          gte: parseInt(values.sellPriceMin as string),
        };
      else
        filter.sellPrice = {
          lte: undefined,
          gte: parseInt(values.sellPriceMin as string),
        };
    } else if (values.sellPriceMax)
      filter.sellPrice = {
        lte: parseInt(values.sellPriceMax as string),
        gte: undefined,
      };
    else
      filter.sellPrice = {
        lte: undefined,
        gte: -10000,
      };

    if (values.dateMin) {
      if (values.dateMax)
        filter.entry = {
          lte: new Date(values.dateMax),
          gte: new Date(values.dateMin),
        };
      else
        filter.entry = {
          lte: undefined,
          gte: new Date(values.dateMin),
        };
    } else if (values.dateMax)
      filter.entry = {
        lte: new Date(values.dateMax),
        gte: undefined,
      };

    setFilter(filter);
    setHeaders(headers);

    setFields({
      id: true,
      price: values.priceCheck,
      sellPrice: values.sellPriceCheck,
      sell: values.typeCheck
        ? values.buyerCheck
          ? { select: { buyer: { select: { name: true } }, type: true } }
          : { select: { type: true } }
        : values.buyerCheck
        ? { select: { buyer: { select: { name: true } } } }
        : false,
      product: values.productCheck,
      brand: values.brandCheck,
      size: values.sizeCheck,
      color: values.colorCheck,
      provider: values.providerNameCheck ? { select: { name: true } } : false,
      description: values.descriptionCheck,
      entry: values.entryCheck,
    });
  };

  return (
    <Form onSubmit={handleSubmit} id="addForm">
      <div className="flex justify-around">
        <Form.Group className="mb-3 w-[45%]" controlId="formId">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Id"
            value={values.id}
            name={'id'}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-[45%]" controlId="formProduct">
          <div className="flex">
            <FormCheck
              className="mr-1"
              checked={values.productCheck}
              onChange={() =>
                setValues({ ...values, productCheck: !values.productCheck })
              }
            />
            <Form.Label>Produto</Form.Label>
          </div>
          <Form.Control
            type="text"
            placeholder="Produto"
            value={values.product}
            name={'product'}
            onChange={onChange}
          />
        </Form.Group>
      </div>
      <div className="flex justify-around">
        <Form.Group className="mb-3 w-[45%]" controlId="formType">
          <div className="flex">
            <FormCheck
              className="mr-1"
              checked={values.typeCheck}
              onChange={() =>
                setValues({ ...values, typeCheck: !values.typeCheck })
              }
            />
            <Form.Label>Tipo</Form.Label>
          </div>
          <Form.Control
            type="text"
            placeholder="Tipo"
            name="type"
            value={values.type}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-[45%]" controlId="formBuyer">
          <div className="flex">
            <FormCheck
              className="mr-1"
              checked={values.buyerCheck}
              onChange={() =>
                setValues({
                  ...values,
                  buyerCheck: !values.buyerCheck,
                })
              }
            />
            <Form.Label>Comprador</Form.Label>
          </div>
          <Form.Control
            type="text"
            placeholder="Comprador"
            name="buyer"
            value={values.buyer}
            onChange={onChange}
          />
        </Form.Group>
      </div>
      <div className="flex justify-around">
        <Form.Group className="mb-3 w-[45%]" controlId="formPriceMin">
          <div className="flex">
            <FormCheck
              className="mr-1"
              checked={values.priceCheck}
              onChange={() =>
                setValues({ ...values, priceCheck: !values.priceCheck })
              }
            />
            <Form.Label>Pre??o Min</Form.Label>
          </div>
          <Form.Control
            type="text"
            placeholder="Pre??o M??nimo"
            value={values.priceMin}
            name={'priceMin'}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-[45%]" controlId="formPriceMax">
          <Form.Label>Max</Form.Label>
          <Form.Control
            type="text"
            placeholder="Pre??o M??ximo"
            value={values.priceMax}
            name={'priceMax'}
            onChange={onChange}
          />
        </Form.Group>
      </div>
      <div className="flex justify-around">
        <Form.Group className="mb-3 w-[45%]" controlId="formSellPriceMin">
          <div className="flex">
            <FormCheck
              className="mr-1"
              checked={values.sellPriceCheck}
              onChange={() =>
                setValues({ ...values, sellPriceCheck: !values.sellPriceCheck })
              }
            />
            <Form.Label>Pre??o Venda Min</Form.Label>
          </div>
          <Form.Control
            type="text"
            placeholder="Pre??o Venda M??nimo"
            value={values.sellPriceMin}
            name={'sellPriceMin'}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-[45%]" controlId="formSellPriceMax">
          <Form.Label>Max</Form.Label>
          <Form.Control
            type="text"
            placeholder="Pre??o Venda M??ximo"
            value={values.sellPriceMax}
            name={'sellPriceMax'}
            onChange={onChange}
          />
        </Form.Group>
      </div>
      <div className="flex justify-around">
        <Form.Group className="mb-3 w-[45%]" controlId="formBrand">
          <div className="flex">
            <FormCheck
              className="mr-1"
              checked={values.brandCheck}
              onChange={() =>
                setValues({ ...values, brandCheck: !values.brandCheck })
              }
            />
            <Form.Label>Marca</Form.Label>
          </div>
          <Form.Control
            type="text"
            placeholder="Marca"
            name="brand"
            value={values.brand}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-[45%]" controlId="formSize">
          <div className="flex">
            <FormCheck
              className="mr-1"
              checked={values.sizeCheck}
              onChange={() =>
                setValues({ ...values, sizeCheck: !values.sizeCheck })
              }
            />
            <Form.Label>Tamanho</Form.Label>
          </div>
          <Form.Control
            type="text"
            placeholder="Tamanho"
            name="size"
            value={values.size}
            onChange={onChange}
          />
        </Form.Group>
      </div>
      <div className="flex justify-around">
        <Form.Group className="mb-3 w-[45%]" controlId="formColor">
          <div className="flex">
            <FormCheck
              className="mr-1"
              checked={values.colorCheck}
              onChange={() =>
                setValues({ ...values, colorCheck: !values.colorCheck })
              }
            />
            <Form.Label>Cor</Form.Label>
          </div>
          <Form.Control
            type="text"
            placeholder="Cor"
            name="color"
            value={values.color}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-[45%]" controlId="formProvider">
          <div className="flex">
            <FormCheck
              className="mr-1"
              checked={values.providerNameCheck}
              onChange={() =>
                setValues({
                  ...values,
                  providerNameCheck: !values.providerNameCheck,
                })
              }
            />
            <Form.Label>Fornecedor</Form.Label>
          </div>
          <Form.Control
            type="text"
            placeholder="Fornecedor"
            name="providerName"
            value={values.providerName}
            onChange={onChange}
          />
        </Form.Group>
      </div>
      <div className="flex justify-around">
        <Form.Group className="mb-3 w-[45%]" controlId="formBuyer">
          <div className="flex">
            <FormCheck
              className="mr-1"
              checked={values.descriptionCheck}
              onChange={() =>
                setValues({
                  ...values,
                  descriptionCheck: !values.descriptionCheck,
                })
              }
            />
            <Form.Label>Comprador</Form.Label>
          </div>
          <Form.Control
            type="text"
            placeholder="Comprador"
            name="buyer"
            value={values.description}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-[45%]" controlId="formDescription">
          <div className="flex">
            <FormCheck
              className="mr-1"
              checked={values.descriptionCheck}
              onChange={() =>
                setValues({
                  ...values,
                  descriptionCheck: !values.descriptionCheck,
                })
              }
            />
            <Form.Label>Descri????o</Form.Label>
          </div>
          <Form.Control
            type="text"
            placeholder="Descri????o"
            name="description"
            value={values.description}
            onChange={onChange}
          />
        </Form.Group>
      </div>
      <div className="flex justify-around">
        <Form.Group className="mb-3 w-[45%]" controlId="formDateMin">
          <div className="flex">
            <FormCheck
              className="mr-1"
              checked={values.entryCheck}
              onChange={() =>
                setValues({ ...values, entryCheck: !values.entryCheck })
              }
            />
            <Form.Label>Data Min</Form.Label>
          </div>
          <Form.Control
            type="date"
            placeholder="Data M??nima"
            value={values.dateMin}
            name={'dateMin'}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-[45%]" controlId="formDateMax">
          <Form.Label>Max</Form.Label>
          <Form.Control
            type="date"
            placeholder="Data M??xima"
            value={values.dateMax}
            name={'dateMax'}
            onChange={onChange}
          />
        </Form.Group>
      </div>
    </Form>
  );
};

export default SearchSellForm;

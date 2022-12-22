import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormCheck } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export interface ISearchProductForm {
  fields: {
    description: boolean;
    product: boolean;
    brand: boolean;
    size: boolean;
    color: boolean;
    provider: { select: { name: boolean } | undefined };
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
      }
    | undefined;
  setFilter: Dispatch<SetStateAction<{} | undefined>>;
  setFields: Dispatch<SetStateAction<{}>>;
  setHeaders: Dispatch<SetStateAction<string[]>>;
}

const SearchProductForm: React.FC<ISearchProductForm> = ({
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
    id: filter ? (filter.id ? filter.id.toString() : '') : '',
    descriptionCheck: fields.description,
    productCheck: fields.product,
    brandCheck: fields.brand,
    sizeCheck: fields.size,
    colorCheck: fields.color,
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
        }
      | undefined = {
      id: undefined,
      provider: { name: undefined },
      description: undefined,
      product: undefined,
      brand: undefined,
      size: undefined,
      color: undefined,
    };

    let headers = ['Id', 'Preço'];

    if (values.productCheck) headers = headers.concat(['Produto']);
    if (values.brandCheck) headers = headers.concat(['Marca']);
    if (values.sizeCheck) headers = headers.concat(['Tamanho']);
    if (values.colorCheck) headers = headers.concat(['Cor']);
    if (values.providerNameCheck) headers = headers.concat(['Fornecedor']);
    if (values.descriptionCheck) headers = headers.concat(['Descrição']);
    headers = headers.concat(['Entrada']);

    filter.id = isNaN(parseInt(values.id)) ? undefined : parseInt(values.id);
    filter.product = { contains: values.product };
    filter.brand = { contains: values.brand };
    filter.size = { contains: values.size };
    filter.color = { contains: values.color };
    filter.provider = { name: { contains: values.providerName } };
    filter.description = { contains: values.description };

    setFilter(filter);
    setHeaders(headers);

    setFields({
      id: true,
      price: true,
      product: values.productCheck,
      brand: values.brandCheck,
      size: values.sizeCheck,
      color: values.colorCheck,
      provider: values.providerNameCheck ? { select: { name: true } } : false,
      description: values.descriptionCheck,
      entry: true,
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
      <Form.Group
        className="mb-3 w-[95%] ml-[2.5%]"
        controlId="formDescription"
      >
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
          <Form.Label>Descrição</Form.Label>
        </div>
        <Form.Control
          type="text"
          placeholder="Descrição"
          name="description"
          value={values.description}
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  );
};

export default SearchProductForm;

import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { baseURL } from '../../config/config';
import { optionsColor, optionsProduct, optionsSize } from './options';

export interface IAddProductForm {}

const AddProductForm: React.FC<IAddProductForm> = () => {
  const [values, setValues] = useState({
    price: '',
    product: '',
    brand: '',
    size: '',
    color: '',
    providerId: 0,
    description: '',
  });

  const [optionsProvider, setOptionsProvider] = useState([]);

  useEffect(() => {
    const body = {
      action: 'GET',
      select: { id: true, name: true },
    };

    fetch(baseURL + '/client', {
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
          setOptionsProvider(
            data.map((item: any) => {
              return {
                value: item.id,
                label: item.name,
                target: {
                  name: 'providerId',
                  value: item.id,
                },
              };
            })
          );
        }
      });
  }, []);

  const onChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      values.price &&
      values.product &&
      values.brand &&
      values.size &&
      values.color &&
      values.providerId
    ) {
      const body = {
        action: 'POST',
        ...values,
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
            setValues({
              price: '',
              product: '',
              brand: '',
              size: '',
              color: '',
              providerId: 0,
              description: '',
            });
          }
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit} id="addForm">
      <div className="flex justify-around">
        <Form.Group className="mb-3 w-[45%]" controlId="formProviderId">
          <Form.Label>Fornecedor</Form.Label>
          <Select onChange={onChange} options={optionsProvider} />
        </Form.Group>
        <Form.Group className="mb-3 w-[45%]" controlId="formProduct">
          <Form.Label>Produto</Form.Label>
          <Select onChange={onChange} options={optionsProduct} />
        </Form.Group>
      </div>
      <div className="flex justify-around">
        <Form.Group className="mb-3 w-[45%]" controlId="formBrand">
          <Form.Label>Marca</Form.Label>
          <Form.Control
            type="text"
            placeholder="Marca"
            name="brand"
            value={values.brand}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-[45%]" controlId="formSize">
          <Form.Label>Tamanho</Form.Label>
          <Select onChange={onChange} options={optionsSize} />
        </Form.Group>
      </div>
      <div className="flex justify-around">
        <Form.Group className="mb-3 w-[45%]" controlId="formColor">
          <Form.Label>Cor</Form.Label>
          <Select onChange={onChange} options={optionsColor} />
        </Form.Group>
        <Form.Group className="mb-3 w-[45%]" controlId="formPrice">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="number"
            placeholder="Preço"
            name="price"
            value={values.price}
            onChange={onChange}
          />
        </Form.Group>
      </div>
      <div className="div-large-form justify-around w-full">
        <Form.Group
          className="mb-3 w-[95%] ml-[2.3%]"
          controlId="formDescription"
        >
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            placeholder="Descrição"
            name="description"
            value={values.description}
            onChange={onChange}
          />
        </Form.Group>
      </div>
    </Form>
  );
};

export default AddProductForm;
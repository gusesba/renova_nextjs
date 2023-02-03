import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { baseURL } from '../../config/config';
import AlertContext from '../../contexts/AlertContext';
import { optionsColor, optionsProduct, optionsSize } from './options';

export interface IEditProductForm {
  setUpload: Function;
  id: number;
}

const EditProductForm: React.FC<IEditProductForm> = ({ setUpload, id }) => {
  const [values, setValues] = useState({
    price: '',
    product: '',
    brand: '',
    size: '',
    color: '',
    providerId: 0,
    description: '',
    entry: '',
  });

  const [optionsProvider, setOptionsProvider] = useState([]);
  const { setAlerts } = useContext(AlertContext) as any;

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

    const body = {
      id,
      price: values.price == '' ? undefined : values.price,
      product: values.product == '' ? undefined : values.product,
      brand: values.brand == '' ? undefined : values.brand,
      size: values.size == '' ? undefined : values.size,
      color: values.color == '' ? undefined : values.color,
      providerId: values.providerId == 0 ? undefined : values.providerId,
      description: values.description == '' ? undefined : values.description,
      entry: values.entry == '' ? undefined : new Date(values.entry),
    };
    fetch(baseURL + '/product', {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);

          setAlerts((oldAlerts: any) => {
            return [
              ...oldAlerts,
              {
                variant: 'danger',
                message: 'Erro ao editar produto!',
              },
            ];
          });
          setTimeout(() => {
            setAlerts((oldAlerts: any) => {
              return oldAlerts.slice(1);
            });
          }, 3000);
        } else {
          setUpload(Math.random());
          setValues({
            ...values,
            price: '',
            brand: '',
            description: '',
            entry: '',
          });

          setAlerts((oldAlerts: any) => {
            return [
              ...oldAlerts,
              {
                variant: 'success',
                message: 'Produto editado com sucesso!',
              },
            ];
          });
          setTimeout(() => {
            setAlerts((oldAlerts: any) => {
              return oldAlerts.slice(1);
            });
          }, 3000);
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit} id="addForm">
      <Form.Group className="mb-3 w-[95%] ml-[2.3%]" controlId="formId">
        <Form.Label>Id</Form.Label>
        <Form.Control
          type="text"
          name="id"
          disabled
          value={id}
          onChange={onChange}
        />
      </Form.Group>
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
      <div className="flex justify-around">
        <Form.Group className="mb-3 w-[45%]" controlId="formDescription">
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
        <Form.Group className="mb-3 w-[45%]" controlId="formEntry">
          <Form.Label>Entrada</Form.Label>
          <Form.Control
            type="date"
            placeholder="Entrada"
            name="entry"
            value={values.entry}
            onChange={onChange}
          />
        </Form.Group>
      </div>
    </Form>
  );
};

export default EditProductForm;

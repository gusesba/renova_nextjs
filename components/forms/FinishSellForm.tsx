import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { baseURL } from '../../config/config';
import { optionsSell } from './options';

export interface IFinishSellForm {
  finishSell: Function;
}

const FinishSellForm: React.FC<IFinishSellForm> = ({ finishSell }) => {
  const [values, setValues] = useState({ clientId: '', type: '' });
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
                  name: 'clientId',
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
    if (values.clientId && values.type) {
      finishSell(values.type, parseInt(values.clientId));
    }
  };

  return (
    <Form onSubmit={handleSubmit} id="addForm">
      <Form.Group className="mb-3" controlId="formClientId">
        <Form.Label>Cliente</Form.Label>
        <Select onChange={onChange} options={optionsProvider} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formType">
        <Form.Label>Tipo</Form.Label>
        <Select onChange={onChange} options={optionsSell} />
      </Form.Group>
    </Form>
  );
};

export default FinishSellForm;

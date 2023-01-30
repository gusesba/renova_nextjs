import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { baseURL } from '../../config/config';

export interface IChangeClientForm {
  setClientId: Dispatch<SetStateAction<number>>;
}

const ChangeClientForm: React.FC<IChangeClientForm> = ({ setClientId }) => {
  const [values, setValues] = useState({ id: 1 });

  const onChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

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
                  name: 'id',
                  value: item.id,
                },
              };
            })
          );
        }
      });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setClientId(values.id);
  };

  return (
    <Form onSubmit={handleSubmit} id="addForm">
      <Form.Group className="mb-3" controlId="formProviderId">
        <Form.Label>Fornecedor</Form.Label>
        <Select onChange={onChange} options={optionsProvider} />
      </Form.Group>
    </Form>
  );
};

export default ChangeClientForm;

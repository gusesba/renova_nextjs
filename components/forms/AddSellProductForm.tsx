import React, { Dispatch, SetStateAction, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { baseURL } from '../../config/config';

export interface IAddSellProductForm {
  setRows: Dispatch<SetStateAction<Array<Object>>>;
  rows: Array<Object>;
}

const AddSellProductForm: React.FC<IAddSellProductForm> = ({
  rows,
  setRows,
}) => {
  const [values, setValues] = useState({ id: '' });

  const onChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (values.id.length) {
      let controll = 1;
      rows.forEach((column: any) => {
        if (parseInt(values.id) == column.id) controll = 0;
      });
      if (controll) {
        fetch(baseURL + '/product/' + values.id, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              data.sellPrice = data.price;
              setRows([data].concat([...rows]));
            }
          });
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} id="addForm">
      <Form.Group className="mb-3" controlId="formID">
        <Form.Control
          type="text"
          placeholder="ID"
          value={values.id}
          name="id"
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  );
};

export default AddSellProductForm;

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

export interface IEditSellPriceForm {
  editSellPrice: Function;
}

const EditSellPriceForm: React.FC<IEditSellPriceForm> = ({ editSellPrice }) => {
  const [values, setValues] = useState({ sellPrice: 0 });

  const onChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (values.sellPrice) {
      editSellPrice(values.sellPrice);
    }
  };

  return (
    <Form onSubmit={handleSubmit} id="addForm">
      <Form.Group className="mb-3" controlId="formSellPrice">
        <Form.Label>Preço</Form.Label>
        <Form.Control
          type="number"
          placeholder="Preço"
          name="sellPrice"
          value={values.sellPrice}
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  );
};

export default EditSellPriceForm;

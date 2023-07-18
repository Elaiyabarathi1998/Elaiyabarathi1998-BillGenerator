import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './form.css'; 

const FormItem = ({ index, handleInputChange, handleRemoveItem }) => {
  const [sNo, setSNo] = useState('');
  const [treatment, setTreatment] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');
  const [amount, setAmount] = useState('');

  const [error, setError] = useState(false);

  const validateInput = (value) => {
    return value?.trim() !== '';
  };

  const validateFields = () => {
    return (
      validateInput(sNo) &&
      validateInput(treatment) &&
      validateInput(description) &&
      validateInput(quantity) &&
      validateInput(rate) &&
      validateInput(amount)
    );
  };

  const handleInputBlur = (e, setter) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');
    setter(sanitizedValue);

    setError(!validateInput(sanitizedValue));
  };

  return (
    <div className={`register-style ${error ? 'error' : ''}`}>
      <label className="label-style">S.No:</label>
      <input
        type="text"
        name="sNo"
        value={sNo}
        placeholder="Enter S.No"
        onChange={(e) => handleInputChange(e, setSNo, index)}
        onBlur={(e) => handleInputBlur(e, setSNo)}
        className={`form-control input-style ${error ? 'error' : ''}`}
      />
      {error && <span className="error-message">Please fill in the S.No field.</span>}

      <label className="label-style">Treatment:</label>
      <input
        type="text"
        name="treatment"
        value={treatment}
        placeholder="Enter Treatment"
        onChange={(e) => handleInputChange(e, setTreatment, index)}
        onBlur={(e) => handleInputBlur(e, setTreatment)}
        className={`form-control input-style ${error ? 'error' : ''}`}
      />
      {error && <span className="error-message">Please fill in the Treatment field.</span>}

      <label className="label-style">Description:</label>
      <input
        type="text"
        name="description"
        value={description}
        placeholder="Enter Description"
        onChange={(e) => handleInputChange(e, setDescription, index)}
        onBlur={(e) => handleInputBlur(e, setDescription)}
        className={`form-control input-style ${error ? 'error' : ''}`}
      />
      {error && <span className="error-message">Please fill in the Description field.</span>}

      <label className="label-style">Quantity:</label>
      <input
        type="number"
        name="quantity"
        value={quantity}
        placeholder="Enter Quantity"
        onChange={(e) => handleInputChange(e, setQuantity, index)}
        onBlur={(e) => handleInputBlur(e, setQuantity)}
        className={`form-control input-style ${error ? 'error' : ''}`}
      />
      {error && <span className="error-message">Please fill in the Quantity field.</span>}

      <label className="label-style">Rate:</label>
      <input
        type="number"
        name="rate"
        value={rate}
        placeholder="Enter Rate"
        onChange={(e) => handleInputChange(e, setRate, index)}
        onBlur={(e) => handleInputBlur(e, setRate)}
        className={`form-control input-style ${error ? 'error' : ''}`}
      />
      {error && <span className="error-message">Please fill in the Rate field.</span>}

      <label className="label-style">Amount:</label>
      <input
        type="number"
        name="amount"
        value={amount}
        placeholder="Enter Amount"
        onChange={(e) => handleInputChange(e, setAmount, index)}
        onBlur={(e) => handleInputBlur(e, setAmount)}
        className={`form-control input-style ${error ? 'error' : ''}`}
      />
      {error && <span className="error-message">Please fill in the Amount field.</span>}

      {index > 0 && (
        <button
          className="btn btn-danger remove-item-button float-right"
          onClick={() => handleRemoveItem(index)}
        >
          Remove Item
        </button>
      )}
    </div>
  );
};

const Form = () => {
  const navigate = useNavigate();

  const [invoiceNo, setInvoiceNo] = useState(Math.floor(Math.random() * 100000).toString());
  const [billTo, setBillTo] = useState('');
  const [registerNo, setRegisterNo] = useState(Math.floor(Math.random() * 100000).toString());
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate.toDateString());
  const [items, setItems] = useState([{ id: 1 }]);

  const [error, setError] = useState(false);

  const handleInputChange = (e, setter, index) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');
    setter(sanitizedValue);

    const { name } = e.target;
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: sanitizedValue,
    };
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    const newId = items.length + 1;
    const newItem = { id: newId };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleInputBlur = (e, setter) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');
    setter(sanitizedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
// Check if required fields are empty
    if (
      !invoiceNo?.trim() ||
      !billTo?.trim() ||
      !registerNo?.trim() ||
      !date?.trim()
    ) {
      alert('Please fill in all required fields.');
      return;
    }
// Check if any of the form item fields are empty
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (
        !item.sNo?.trim() ||
        !item.treatment?.trim() ||
        !item.description?.trim() ||
        !item.quantity?.trim() ||
        !item.rate?.trim() ||
        !item.amount?.trim()
      ) {
        alert('Please fill in all fields for item ' + (i + 1) + '.');
        return;
      }
    }

    const url = `/invoice?${items
        .map(
          (item) =>
            `sNo=${item.sNo}&treatment=${item.treatment}&description=${item.description}&quantity=${item.quantity}&rate=${item.rate}&amount=${item.amount}`
        )
        .join('&')}&billTo=${billTo}&registerNo=${registerNo}&date=${date}`; // Add billTo, registerNo, and date to the URL
    
      navigate(url);
    };

  return (
    <div>
      <header>
        <span style={{ fontWeight: 'bold' }}>Bill Process</span>
        <nav className="d-flex justify-content-around">
          <a href="#">Home</a>
          <a href="#">Contact</a>
          <a href="#">Services</a>
        </nav>
      </header>

      <div className="billing-details">
        <h2>Billing Details</h2>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 container-style">
            <form onSubmit={handleSubmit}>
              <label className="label-style">Invoice No:</label>
              <input
                type="text"
                value={invoiceNo}
                placeholder="Enter Invoice No"
                onChange={(e) => handleInputChange(e, setInvoiceNo)}
                onBlur={(e) => handleInputBlur(e, setInvoiceNo)}
                className={`form-control input-style ${error ? 'error' : ''}`}
              />
              {error && <span className="error-message">Please fill in the Invoice No field.</span>}

              <label className="label-style">Bill To:</label>
              <input
                type="text"
                value={billTo}
                placeholder="Enter Patient Name"
                onChange={(e) => handleInputChange(e, setBillTo)}
                onBlur={(e) => handleInputBlur(e, setBillTo)}
                className={`form-control input-style ${error ? 'error' : ''}`}
              />
              {error && <span className="error-message">Please fill in the Bill To field.</span>}

              <label className="label-style">Register No:</label>
              <input
                type="text"
                value={registerNo}
                placeholder="Enter Register No"
                onChange={(e) => handleInputChange(e, setRegisterNo)}
                onBlur={(e) => handleInputBlur(e, setRegisterNo)}
                className={`form-control input-style ${error ? 'error' : ''}`}
              />
              {error && <span className="error-message">Please fill in the Register No field.</span>}

              <label className="label-style">Date:</label>
              <input
                type="text"
                value={date}
                placeholder="Enter Date"
                onChange={(e) => handleInputChange(e, setDate)}
                onBlur={(e) => handleInputBlur(e, setDate)}
                className={`form-control input-style ${error ? 'error' : ''}`}
              />
              {error && <span className="error-message">Please fill in the Date field.</span>}

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>

          <div className="col-md-6 container-style">
            {items.map((item, index) => (
              <FormItem
                key={item.id}
                index={index}
                handleInputChange={handleInputChange}
                handleRemoveItem={handleRemoveItem}
              />
            ))}

            <button className="btn btn-primary" onClick={handleAddItem}>
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

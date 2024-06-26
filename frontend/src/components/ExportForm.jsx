import './exports1.css';
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

const ExportForm = () => {
  const navigate = useNavigate();
  const [exportOrderID, setExportOrderID] = useState('');
  const [importer, setImporter] = useState('');
  const [items, setItems] = useState([{ itemID: '', itemName: '', quantity: '', unitPrice: '' }]);
  const [totalCost, setTotalCost] = useState('');
  const [status, setStatus] = useState(''); // Changed to state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    // Generate export order ID here if needed
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleItemChange = async (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);

    if (field === 'itemID' && value) {
      const selectedProduct = products.find((product) => product.itemCode === value);
      if (selectedProduct) {
        updatedItems[index].unitPrice = selectedProduct.unitPrice;
        updatedItems[index].itemName = selectedProduct.name; // Update itemName field
        setItems(updatedItems);
      }
    }

    // Recalculate total cost
    const total = updatedItems.reduce((acc, item) => acc + (parseFloat(item.quantity) * parseFloat(item.unitPrice)), 0);
    setTotalCost(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Export Order ID format
    const exportOrderIDRegex = /^E\d{3}$/; // Regex for format E followed by any three numbers
    if (!exportOrderIDRegex.test(exportOrderID)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Export Order ID format is incorrect!",
        showConfirmButton: false,
        timer: 1500
      });
      return; // Stop form submission if format is incorrect
    }

    const importerRegex = /^I\d{3}$/; // Regex for format E followed by any three numbers
    if (!importerRegex.test(importer)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Importer ID format is incorrect!",
        showConfirmButton: false,
        timer: 1500
      });
      return; // Stop form submission if format is incorrect
    }


    // Check if any fields are empty
    if (!exportOrderID || !importer || items.some(item => !item.itemID || !item.quantity)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please fill out all fields!",
        showConfirmButton: false,
        timer: 1500
      });
      return; // Stop form submission if any fields are empty
    }

    const newExportOrder = {
      exportOrderID,
      importer,
      items,
      totalCost,
      status,
    };

    try {
      // Submit new export order
      await axios.post("http://localhost:4000/api/export/", newExportOrder);

      // Update product quantities
      items.forEach(async (item) => {
        const { itemID, quantity } = item;
        if (itemID && quantity) {
          const product = products.find((p) => p.itemCode === itemID);
          if (product) {
            const updatedQuantity = product.quantity - parseInt(quantity);
            await axios.put(`http://localhost:4000/api/products/${product._id}`, { quantity: updatedQuantity });
          }
        }
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Submitted!",
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
        navigate(`/ExportsDashboard`);
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error('Error submitting export order:', err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error in Submitting!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };



  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { itemID: '', itemName: '', quantity: '', unitPrice: '' }]);
  };

  return (
    <Container>
      <div className="form-container">
        <h1>Create Export Order</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formExportOrderID">
              <Form.Label>Export Order ID</Form.Label>
              <Form.Control type="text" value={exportOrderID} onChange={(e) => setExportOrderID(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formImporter">
              <Form.Label>Importer ID</Form.Label>
              <Form.Control type="text" value={importer} onChange={(e) => setImporter(e.target.value)} />
            </Form.Group>
          </Row>

          {items.map((item, index) => (
            <div key={index}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId={`formItemNumber${index}`}>
                  <Form.Label>Item Number</Form.Label>
                  <Form.Control
                    as="select"
                    value={item.itemID}
                    onChange={(e) => handleItemChange(index, 'itemID', e.target.value)}
                  >
                    <option value="">Select an item</option>
                    {products.map((product) => (
                      <option key={product._id} value={product.itemCode}>
                        {product.itemCode}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId={`formItemName${index}`}>
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={item.itemName}
                    readOnly
                  />
                </Form.Group>

                <Form.Group as={Col} controlId={`formQuantity${index}`}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId={`formUnitPrice${index}`}>
                  <Form.Label>Unit Price</Form.Label>
                  <Form.Control
                    type="text"
                    value={item.unitPrice}
                    readOnly
                  />
                </Form.Group>

                <Button variant="danger" size="sm" onClick={() => handleRemoveItem(index)}>
                  Remove
                </Button>
              </Row>
            </div>
          ))}

          <Row className="mb-3">
            <Button variant="secondary" onClick={handleAddItem}>
              Add New Item
            </Button>

            <Form.Group as={Col} controlId="formTotalCost">
              <Form.Label>Total Cost</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={totalCost}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select" // Changed to select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="On the way to the destination country">On the way to the destination country</option>
                <option value="In transit">In transit</option>
              </Form.Control>
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ExportForm;

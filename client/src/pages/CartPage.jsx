import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopUp, setBillPopUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.rootReducer);

  const handleIncreament = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const handleDecrement = (record) => {
    if (record.quantity > 1) {
      if (record.quantity !== 1) {
        dispatch({
          type: "UPDATE_CART",
          payload: { ...record, quantity: record.quantity - 1 },
        });
      }
    } else {
      dispatch({
        type: "DELETE_FROM_CART",
        payload: { _id: record._id },
      });
    }
  };

  const handleDelete = (record) => {
    dispatch({
      type: "DELETE_FROM_CART",
      payload: { _id: record._id },
    });
  };

  const clear_cart = () => {
    dispatch({
      type: "CLEAR_CART",
    
  })
}

  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text, record) => {
        const amount = (record.unitPrice * record.quantity).toFixed(2); // Calculate total amount
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 2,
        }).format(amount); // Format the amount as currency
      },
    },

    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-5"
            onClick={() => handleIncreament(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-5"
            onClick={() => handleDecrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined onClick={() => handleDelete(record)} />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);

  const handleSubmit = async (value) => {
    try {
      const billObject = {
        ...value,
        cartItems,
        subTotal,
        // userId: JSON.parse(localStorage.getItem('auth'))._id
        //need to setup login wala part then we use the auth things.
      };

      // console.log(billObject)
      await axios.post("/api/bills/add-bills", billObject);
      message.success("Bills has been generated....");
      console.log(billObject);
      navigate("/bills");
      clear_cart()

      // cart should be reset
    } catch (error) {
      console.log(error, "Error cart page mein h bill generate wale mein");
      // message.error("error cart page mein h bill generate wale mein")
    }
  };

  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItems} />
      <div className="sub-total">
        <h3>
          Sub Total:{" "}
          <b>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 2,
            }).format(subTotal)}
          </b>
        </h3>
        <Button
          type="primary"
          onClick={() => {

            if (cartItems.length == 0) {
              message.error("Cart is empty")
              return;
            } setBillPopUp(true);
          }}
          disabled={cartItems.length === 0}
        >
          Create Invoice
        </Button>
      </div>
      {/* <Modal onCancel={setBillPopUp(false) open={billPopUp}} footer={false} > */}
      <Modal
        title="Create Invoice Bill"
        open={billPopUp}
        onCancel={() => {
          setBillPopUp(false);
        }}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="Customer Name" rules={[{ required: true, message: "This field is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true, message: "This field is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true, message: "This field is required" }]}
          >
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="cards">Cards</Select.Option>
              <Select.Option value="upi">UPI</Select.Option>
            </Select>
          </Form.Item>

          <h3>
            {/* Sub Total: <b>${subTotal}</b> */}
            Sub Total:{" "}
            <b>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 2,
              }).format(subTotal)}
            </b>
          </h3>
          <div className="" style={{ display: "flex", justifyContent: "end" }}>
            <Button type="primary" htmlType="submit" >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;

import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Table } from "antd";

const CartPage = () => {
  const dispatch = useDispatch();

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

  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },
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

  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItems} />
    </DefaultLayout>
  );
};

export default CartPage;

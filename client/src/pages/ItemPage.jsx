import DefaultLayout from "../components/DefaultLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import { Form, Input, Select, message, Modal, Button, Table } from "antd";

const ItemPage = () => {
  const [itemsData, setItemsData] = useState();
  const dispatch = useDispatch();
  const [popUpModal, setPopUpModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/items/get-item");
      // console.log("Maal yahan h items:", data);
      setItemsData(data);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      console.error("Kuch to gadbad h:", error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  // handleDelete

  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("/api/items/delete-item", { itemId: record._id });
      message.success("Items deleted Successfully");
      getAllItems();
      setPopUpModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      console.error("Kuch to gadbad h delete:", error);
    }
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
    {
      title: "Price",
      dataIndex: "price",
      // render: (price) => price.toFixed(2),
      render: (price) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 2,
        }).format(price),
    },
    // {
    //   title: "Quantity",
    //   dataIndex: "_id",
    //   render: (id, record) => (
    //     <div>
    //       <PlusCircleOutlined
    //         className="mx-5"
    //         onClick={() => handleIncreament(record)}
    //       />
    //       <b>{record.quantity}</b>
    //       <MinusCircleOutlined
    //         className="mx-5"
    //         onClick={() => handleDecrement(record)}
    //       />
    //     </div>
    //   ),
    // },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setPopUpModal(true);
            }}
          />

          <DeleteOutlined
            onClick={() => handleDelete(record)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post("/api/items/add-item", value);
        message.success("Items Added Successfully");
        getAllItems();
        setPopUpModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        message.error("something went wrong while product adding");
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put("/api/items/edit-item", {
          ...value,
          itemId: editItem._id,
        });
        message.success("Items Updated Successfully");
        getAllItems();
        setPopUpModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        message.error("something went wrong while product adding");
        console.log(error);
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="item-page-row-1">
        <h1 className="h1-item-page">Item Page</h1>
        <Button
          type="primary"
          onClick={() => {
            setPopUpModal(true);
          }}
        >
          Add Items
        </Button>

        {popUpModal && (
          <Modal
            title={`${editItem !== null ? "Edit Item" : "Add New Item"}`}
            open={popUpModal}
            onCancel={() => {
              setEditItem(null);
              setPopUpModal(false);
            }}
            footer={false}
          >
            <Form
              layout="vertical"
              initialValues={editItem}
              onFinish={handleSubmit}
            >
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="price" label="Price">
                <Input />
              </Form.Item>
              <Form.Item name="image" label="Image URL">
                <Input />
              </Form.Item>
              <Form.Item name="category" label="Category">
                <Select>
                  <Select.Option value="veggies">Veggies</Select.Option>
                  <Select.Option value="fruits">Fruits</Select.Option>
                  <Select.Option value="nov-veg">Non-Veg</Select.Option>
                  <Select.Option value="dairy">Dairy</Select.Option>
                  <Select.Option value="beverages">Beverages</Select.Option>
                  <Select.Option value="cloths">Cloths</Select.Option>
                  <Select.Option value="miscellaneous">
                    Miscellaneous
                  </Select.Option>
                </Select>
              </Form.Item>
              <div
                className=""
                style={{ display: "flex", justifyContent: "end" }}
              >
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </div>
      <Table columns={columns} dataSource={itemsData} />
    </DefaultLayout>
  );
};

export default ItemPage;

// import "../styles/invoice.css";
import { Table } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const CustomerPage = () => {
  const [billsData, setBillsData] = useState();
  const dispatch = useDispatch();
  // const [selectedBill, setSelectedBill] = useState(null);

 const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/bills/get-bills");
      // console.log("Maal yahan h items:", data);
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      console.error("Kuch to gadbad h bill page mein:", error);
    }
  };

    useEffect(() => {
      getAllBills();

    }, []);
  const columns = [
    { title: "ID", dataIndex: "_id" },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
    },
  ];

  return (
    <DefaultLayout>
      <h1>Customer Page</h1>
      <Table columns={columns} dataSource={billsData} />
    </DefaultLayout>
  );
};

export default CustomerPage;

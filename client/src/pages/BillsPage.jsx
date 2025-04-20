// import "../styles/invoice.css";
import { Table, Modal, Button } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print"
import { useReactToPrint } from 'react-to-print'


const BillsPage = () => {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState();
  const dispatch = useDispatch();
  const [popUpBillModal, setPopUpBillModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  


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
  
   const handlePrint = useReactToPrint({
  content: () => componentRef.current,
   });
  
  // Print is not working
  
  

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
    {
      title: "Sub Total",
      dataIndex: "subTotal",
      render: (amount) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 2,
        }).format(amount),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            onClick={() => {
              setSelectedBill(record);
              setPopUpBillModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="item-page-row-1">
        <h1 className="h1-item-page">Invoice List</h1>
        {/* <Button
          type="primary"
          onClick={() => {
            setPopUpModal(true);
          }}
        >
          Add Items
        </Button> */}

        {popUpBillModal && (
          <Modal
            title="Invoice Bills"
            open={popUpBillModal}
            onCancel={() => {
              // setEditItem(null);
              setPopUpBillModal(false);
            }}
            footer={false}
          >

            {/* Invoice Bill Section */}
            <div className="bill-section" ref={componentRef}>
              <div className="bill-row">
                <h2>logo</h2>
                <h3>POS APP</h3>
                <address>
                  <p> +918660876889 | #429, First Floor </p>
                </address>

                <article className="invoice-customer">
                  <address className="customer-info">
                    <p> Customer Details </p>
                    <p> Customer Name: {selectedBill.customerName} </p>
                    <p> Contact No.: {selectedBill.contactNumber} </p>
                    <p>
                      Date:{" "}
                      {selectedBill?.date
                        ? new Date(selectedBill.date).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </address>

                  <table className="firstTable">
                    <tbody>
                      <tr>
                        <th>
                          <span>Invoice </span>
                        </th>
                        <td>
                          <span>101138</span>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <span>Date</span>
                        </th>
                        <td>
                          <span>January 1, 2012</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="secondTable">
                    <thead>
                      <tr>
                        <th>
                          <span>Item</span>
                        </th>

                        <th>
                          <span>Quantity</span>
                        </th>
                        <th>
                          <span>Price</span>
                        </th>
                        <th>
                          <span>Total</span>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedBill.cartItems.map((item) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <span>{item.name}</span>
                              </td>

                              <td>
                                <span>{item.quantity}</span>
                              </td>

                              <td>
                                <span data-prefix>$</span>
                                <span>{item.price}</span>
                              </td>
                              <td>
                                <span data-prefix>$</span>
                                <span>{item.quantity * item.price}</span>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>

                  <table className="firstTable">
                    <tbody>
                      <tr>
                        <th>
                          <span>Total</span>
                        </th>
                        <td>
                          <span data-prefix>$</span>
                          <span>
                            {" "}
                            {selectedBill.cartItems
                              .reduce(
                                (total, item) =>
                                  total + item.price * item.quantity,
                                0
                              )
                              .toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </article>
              </div>
            </div>

             <div className="print">
              <Button type="primary"
              onClick={handlePrint}
              >Print</Button>
            </div>
          </Modal>
        )}
      </div>
      <Table columns={columns} dataSource={billsData} />
    </DefaultLayout>
  );
};

export default BillsPage;

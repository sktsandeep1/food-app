import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Row, Col, Flex } from "antd";
import ItemList from "../components/ItemList";
import { useDispatch } from "react-redux";

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("groceries");

  const dispatch = useDispatch();

  const categories = [
    { name: "groceries" },
    { name: "fruits" },
    { name: "vegetables" },
    { name: "Snacks & Munchies" },
    { name: "dairy" },
    { name: "beverages" },
    { name: "Health & Wellness" },
    { name: "Electronics & Home Appliances" },
  ];

  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type:'SHOW_LOADING'
        })
        const { data } = await axios.get("/api/items/get-item");
        // console.log("Maal yahan h:", data);
        setItemsData(data);
        dispatch({type:'HIDE_LOADING'})
      } catch (error) {
        console.error("Kuch to gadbad h:", error);
      }
    };

    getAllItems();
  }, []);

  return (
    <DefaultLayout>
      <div className="category-list">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selectedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <h4>{category.name}</h4>
          </div>
        ))}
      </div>

      <Row className="home-content-area">
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item, index) => (
            <Col key={index} >
              <ItemList item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;

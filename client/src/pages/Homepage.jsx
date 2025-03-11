import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Row, Col, Flex } from "antd";
import ItemList from "../components/ItemList";

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("veggies");

  const categories = [
    { name: "veggies" },
    { name: "fruits" },
    { name: "veg momo" },
    { name: "non-veg" },
    { name: "dairy" },
    { name: "beverages" },
    { name: "miscellaneous" },
    { name: "cloths" },
  ];

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const { data } = await axios.get("/api/items/get-item");
        console.log("Maal yahan h:", data);
        setItemsData(data);
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
      <Row>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item, index) => (
            <Col key={index} xs={24} lg={6} md={12} sm={6}>
              <ItemList item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;

// import React from 'react'

import { Card } from "antd"
import { useState } from "react";
import { useDispatch } from "react-redux";

const ItemList = ({item}) => {
    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()
    // update cart handler
    const handleAddToCart = () =>{
dispatch({
    type: "Add_TO_Cart",
    payload: {...item, quantity},
    
})
// console.log("Item added to cart:", { ...item, quantity: 1 });

//--------------------------------------------------------------------------------------------------------------------------------//
//---- 02:39:11 ----//

/**
 * 1. Task is make a state for add to cart, check the item is same then increament the quantity of the item otherwise add the item.: done 
 * 2. task is to make a state for price if we are adding same product to cart then the price will increase.
 */


    }

    const {Meta} = Card;
  return (
    <div className="card-items">
        <Card 
        hoverable
        // style={{width:250, margin:10}}
        cover={
        <img 
        alt= {item.name} 
        src={item.image}
        style={{height: 100}}
        />}
        >
        <Meta title={item.name} />
        
        <p className="item-price-home">₹{ item.price }</p>
        
        
        <button onClick={()=> handleAddToCart()} className="add-to-cart">Add to Cart</button>
        </Card>
    </div>
  )
}

export default ItemList
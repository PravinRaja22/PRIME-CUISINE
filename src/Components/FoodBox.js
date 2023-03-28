import React, { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Box,Button,Modal} from '@mui/material'
import ModelAddCart from "./ModelAddCart";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function FoodBox({ imgSrc, title, price }) {

  // const handleClick = async () => {
  //   alert("Item has been added to cart");
  // };

  const [ModelOpen, setModelOpen] = useState(false)


  const notify = () => {

    setModelOpen(true)

  }

  const closeModel=()=>{
    setModelOpen(false)
  }

  return (
    <div className="details">
      <img src={imgSrc} alt="" className="details-img" />
      <div className="food-name">
        <h2>{title}</h2>
      </div>

      <div className="food-details">
        <div>
          <p>
            Price: {price}
          </p>
          <p>Available</p>
        </div>
      </div>

      <div className="cart-btn">
        {/* <button onClick={handleClick} className="btn">
          Add to cart
        </button> */}
        <button onClick={notify} className="btn">Add to cart</button>
      </div>
      {/* <ToastContainer /> */}
      <Modal
        open={ModelOpen}
        onClose={closeModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <ModelAddCart title={ title} price={price} closeModel={closeModel}/>
        </Box>
      </Modal>

    </div>
  );
}

export default FoodBox;

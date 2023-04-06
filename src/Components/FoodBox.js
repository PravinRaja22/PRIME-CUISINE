import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Box,Button,Modal,Grid, CardContent,Card} from '@mui/material'
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


function FoodBox(props) {
  // function FoodBox({ imgSrc, title, price }) {

  // const handleClick = async () => {
  //   alert("Item has been added to cart");
  // };
    const [records,setRecords]=useState([])

    const[selectedRecord,setSelectedRecords]=useState()

  console.log(props.prop,"props")

  const [ModelOpen, setModelOpen] = useState(false)

  useEffect(()=>{
    setRecords(props.prop)
  },[])

  const notify = (i) => {

    setModelOpen(true)
    console.log('i is :',i)
    setSelectedRecords(i)

  }

  const closeModel=()=>{
    setModelOpen(false)
  }


  return (
   <div className="details">
    
    <div class="grid-container">

      {
        records.map((i,index)=>(
          <>
<dic class="grid-item">
  <img src={i.imageUrl} alt="" className="details-img" width="100px" height="100px" />
      <div className="food-name">
        <h2>{i.foodName}</h2>
      </div>

      <div className="food-details">
        <div>
          <p>
            Price: {i.price}
          </p>
          <p>Available</p>
        </div>
      </div>

      <div className="cart-btn">

        <button onClick={(e)=>notify(i)} className="btn">Add to cart</button>
      </div>
      <Modal
        open={ModelOpen}
        onClose={closeModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <ModelAddCart data={selectedRecord} closeModel={closeModel}/>
        </Box>
        </Modal>

        </dic>    
          
            </>
        ))
      }
      
      {/* <img src={imgSrc} alt="" className="details-img" />
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

        <button onClick={notify} className="btn">Add to cart</button>
      </div>
      <Modal
        open={ModelOpen}
        onClose={closeModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <ModelAddCart title={ title} price={price} closeModel={closeModel}/>
        </Box>
      </Modal> */}
 </div>
     </div>
  );
}

export default FoodBox;

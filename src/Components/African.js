import React from "react";
import "./foodcont.css";
import FoodBox from "./FoodBox";
import cards from "../img/afri.jpg";
import PaymentSect from "./PaymentSect";
import { Link,useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from 'axios'
import { Button } from '@mui/material';






function African() {
const location = useLocation();
const [PassedRestaurent,setPassedRestaurent] = useState();
const [showNew,setshowNew] = useState(true)
const [ResponseData,setResponseData] = useState([])

const[dataFromChild,SetDataFromChild]= useState()


useEffect(()=>{
    if(location.state.record.item){
        console.log("passed Restaurent "+location.state.record.item)
        setPassedRestaurent(location.state.record.item);
         setshowNew(!location.state.record.item)
         axioscall();
    }
},[])



function axioscall(){
    axios.post('http://localhost:5000/getrestaurentsData?code='+location.state.record.item)
    .then(res => {
        console.log(res.data, "api res")
        setResponseData(res.data)
    })
    .catch(e =>
        console.log(e.message,"api error")
    ) 

}
 function handleModal(){

    

 }
   
     return (
        <>
            <div className="foodcontainer">
                <div className="left-side">
                    <div className="cards">
                        {/* <div className="all">
                            <div className="varieties">
                                <Link to="/" className="var-btn">
                                    All
                                </Link>
                                <Link to="/african" className="var-btn">
                                    African
                                </Link>
                                <Link to="/chinese" className="var-btn">
                                    Chinese
                                </Link>
                                <Link to="/italian" className="var-btn">
                                    Italian
                                </Link>
                                <Link to="/desert" className="var-btn">
                                    Deserta
                                </Link>
                            </div>
                        </div> */}


                        <main>


                        



                        {
                            ResponseData.length>0 &&
                            
                            <FoodBox prop={ResponseData}  />  
                                // <FoodBox imgSrc={i.imageUrl} title={i.foodName} price={i.price} />
                            
                        }

                    
                           
                            {/* <FoodBox imgSrc={cards} title={"African 2"} price={"$12"} />
                            <FoodBox imgSrc={cards} title={"African 3"} price={"$20"} />
                            <FoodBox imgSrc={cards} title={"African 4"} price={"$12"} />
                            <FoodBox imgSrc={cards} title={"African 5"} price={"$17"} />
                            <FoodBox imgSrc={cards} title={"African 6"} price={"$25"} /> */}

                        </main>
                    </div>
                </div>
                <div className="right-side">
                    {/* <PaymentSect  data={dataFromChild}/> */}
                </div>
            </div>
        </>
    );
}

export default African;

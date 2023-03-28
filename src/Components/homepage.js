import React, { useEffect, useState } from "react";
import "./foodcont.css";
import axios from 'axios'
import { Box, Grid, Select, MenuItem } from "@mui/material";
import { Button } from '@mui/material';
import { Link,useNavigate } from "react-router-dom";

function Homepagedata() {
    const navigate = useNavigate();
    const [selectedHotel, setselectedHotel] = useState('');

    const hanldechange = (e) => {
        console.log("event is : ", e.target.value)
        setselectedHotel(e.target.value)
        console.log("inside hotel picklists are "+selectedHotel)

        const item=  e.target.value
        navigate('/african',{state:{record:{item}}})
    }

    const [restaurentName, setrestaurentName] = useState([]);

    let newArray = [];

    function removeDuplicates() {
        // Declare a new array
        // Declare an empty object
        let uniqueObject = {};
        // Loop for the array elements
        for (let i in restaurentName) {
            // Extract the title
            const objTitle = restaurentName[i]['restaurentName'];
            // Use the title as the index
            uniqueObject[objTitle] = restaurentName[i];
        }
        // Loop to push unique object into array
        for (let i in uniqueObject) {
            newArray.push(uniqueObject[i]);
        }

        // Display the unique objects
        // console.log(newArray);
    }

    removeDuplicates();
    useEffect(() => {
        fetchRestaurents();
    }, [])
    const fetchRestaurents = () => {
        axios.post('http://localhost:5000/getrestaurentNameData')
            .then(res => {
                console.log(res, "res")
                setrestaurentName(res.data)
            })
            .catch(e =>
                console.log(e.message)
            )
    }
    // const options = [];



    const handlebutton=()=>{
        // axios.post('http://localhost:5000/getrestaurentsData?code='+selectedHotel)
        // .then(res => {
        //     console.log(res, "res")
        //     setrestaurentName(res.data)
        // })
        // .catch(e =>
        //     console.log(e.message)
        // )        
        const item=  selectedHotel
            navigate('/african',{state:{record:{item}}})

    }

    //     restaurentName.map((i) => {
    //         console.log("inside map")
    //         console.log(i.restaurentName)
    //          options.push(
    //             { value: i.restaurentName, label: i.restaurentName},

    //          )
    //     })
    //     console.log(options);


    const handleAdd=()=>{
        console.log("handle add")
    }


    return (
        <>
            <Box style={{ display: 'block', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <header style={{ width: '100%', color: 'white', textShadow: '0 2px 1px #79a06d', textAlign: 'center' }}>
                        <h1 style={{ textAlign: 'center', marginLeft: '400px' }}>
                            Welcome to Prime Cusine
                        </h1>
                    </header>
                    <br></br>
                    <br></br>
                    <br></br>
                    <header style={{ width: '100%', color: 'white', textShadow: '0 2px 1px #79a06d', textAlign: 'center' }}>
                        <div style={{ color: 'white', marginLeft: '250px' }}>Choose Your Restaurent </div>
                    </header>
                </div>
                <div className="foodcontainer">
                    {/* <Grid container={2}> */}
                        <Grid>
                        <Select sx={{ width: '500px', bgcolor: 'white', marginLeft: '350px' }}
                            onChange={(e) => hanldechange(e)}
                        >
                            {
                                newArray.map(i=>(
                                    <MenuItem value={i.restaurentName}>{i.restaurentName}</MenuItem>
                                ))
                            }
                           
                        </Select>
                        </Grid>
                


                    {/* </Grid> */}
                </div>
            </Box>
        </>
    );
}
export default Homepagedata;

import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Grid, Button, Forminput, DialogActions,
  MenuItem, Autocomplete, TextField, Box, FormLabel
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const upsertRes = `http://localhost:5000/upsertrestaurentsData`


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
  

const RestaurantDetailPage = ({ item }) => {

  const [parentRecord, setParentRecord] = useState();

const[showNew,setShowNew]= useState(true)
  const [studentRecord, setStudentRecord] = useState([])

  const navigate= useNavigate()
const location =useLocation()

  useEffect(() => {

    console.log(location.state.record.item,"record")


    if(location.state.record.item){
        setShowNew(!location.state.record.item)
        setParentRecord(location.state.record.item)
    }

  }, [])



  const initialValues = {
    restaurentName:"",
    price:"",
    foodName: '',
    availablility: '',
  }

  const savedValues ={
    restaurentName:parentRecord?.restaurentName??"",
    price:parentRecord?.price??"",
    foodName: parentRecord?.foodName??"",
    availablility: parentRecord?.availablility??"",
    _id:parentRecord?._id??"",
  }



  const validationSchema = Yup.object({

  })


  const formSubmission = (values) => {



    console.log('after  submission value', values);

    let formData;

    function getFormData(values) {
    
    console.log("inside getFormData ")
    
    formData = new FormData();
    
    Object.keys(values).forEach(key => formData.append(key, values[key]));
    
    return formData;
    
    }
    
    if(showNew){
    
    getFormData(values)
    
    }
    
    else if(!showNew){
    
    getFormData(values)
    
     }

    const request1 = axios.post(upsertRes, formData)
    // const request2 = axios.post(upsertURL, { ...data, availableQuantity: data.availableQuantity - values.buyQuantity })
    Promise.all([request1])
      .then((responses) => {
        console.log((responses.data), "res 1");
        // console.log((responses[1].data), "res 2");
        alert('restuarent Food added suffesfully')
        setTimeout(() => {
            navigate(-1)
        }, 1000)
      })
      .catch((error) => {
        console.error(error);
        setTimeout(() => {
            navigate(-1)
        }, 1000)
      });


  }

  const handleFormClose=()=>{
    navigate(-1)
  }


  return (
<>



    <Grid item xs={12} style={{ margin: "20px" }}>
      <div style={{ textAlign: "center",backgroundColor:'white', marginBottom: "10px" }}>
        {showNew ? <h3>New Restaurent</h3> : <h3>Restaurent Detail Page</h3>}
      </div>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={showNew? initialValues : savedValues}
          validationSchema={validationSchema}
          onSubmit={(values) => { formSubmission(values) }}
        >
          {(props) => {
            const {
              values,
              isSubmitting,setFieldValue
            } = props;

            return (
              <>
                <div className='form_center_box'>
                  <Box m="auto" sx={{position:'absolute',bgcolor:'white',border:'2px solid #000'}}>
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="restaurentName"> Restaurent Name  </FormLabel>
                          <Field name="restaurentName" type="text" class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="foodName">FoodName </FormLabel>
                          <Field name="foodName" type="text"
                            class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="price">price </FormLabel>
                          <Field name="price" type="text" class="form-input" />
                        </Grid>  
                        <Grid item xs={6} md={6}>
                          <FormLabel  htmlFor="foodImage">Image</FormLabel>
                          <Field id="file" name="foodImage" type="file" onChange={(event) => {
                            setFieldValue("file", event.currentTarget.files[0]);
                            }}/>
                        </Grid>                     
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="availablility">Availablility</FormLabel>
                          <Field name="availablility" as="select" class="form-input" 
                            >
                                <option value=""><em>None</em></option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </Field>
                        </Grid>
                      </Grid>
                      <div className='action-buttons'>
                        <DialogActions sx={{ justifyContent: "space-between" }}>
                          <Button type='success' variant="contained" color="secondary" disabled={isSubmitting}>Save</Button>

                          <Button type="reset" variant="contained" onClick={handleFormClose}  >Cancel</Button>
                        </DialogActions>
                      </div>
                    </Form>
                  </Box>
                </div>
              </>
            )
          }}
        </Formik>
      </div>
    </Grid>
    </>
  )
}

export default RestaurantDetailPage;

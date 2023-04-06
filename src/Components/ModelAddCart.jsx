import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Grid, Button, Forminput, DialogActions,
  MenuItem, Autocomplete, TextField, Box, FormLabel
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addCartSave = `http://localhost:5000/upsertcartData`


const ModalAddtoCart = ({data, closeModel}) => {

  const location = useLocation();
  const [parentRecord, setParentRecord] = useState();


  const [studentRecord, setStudentRecord] = useState([])

  useEffect(() => {
      // setParentRecord(location.state.record.item)
      console.log('Data is :',data)
  }, [])

  toast.success('Item has been added to cart', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const initialValues = {
    orderedFoodName: data?.foodName?? "",
    price: data?.price??"",
    orderedQuantity: '',
    totalPrice: '',
    billDate: '',

  }




  const validationSchema = Yup.object({

  })


  const formSubmission = (values) => {

    values.billDate = new Date().toISOString().replace("T", " ").substring(0, 19)

    values.totalPrice = values.price * values.orderedQuantity

    console.log('after  submission value', values);

    const request1 = axios.post(addCartSave, values)
    // const request2 = axios.post(upsertURL, { ...data, availableQuantity: data.availableQuantity - values.buyQuantity })
    Promise.all([request1])
      .then((responses) => {
        console.log((responses.data), "res 1");
        // console.log((responses[1].data), "res 2");
        alert('Your Food will be deliverd in 30 mins')
        setTimeout(() => {
            closeModel();
        }, 1000)
      })
      .catch((error) => {
        console.error(error);
        setTimeout(() => {
            closeModel();
        }, 1000)
      });


  }

  const handleFormClose = () => {
    closeModel()
  }

  return (
<>




    <Grid item xs={12} style={{ margin: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h3>Add to Cart</h3>
      </div>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => { formSubmission(values) }}
        >
          {(props) => {
            const {
              values,
              isSubmitting,
            } = props;

            return (
              <>
                <div className='form_center_box'>
                  <Box m="auto">
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="orderedFoodName"> Food Name  </FormLabel>
                          <Field name="orderedFoodName" type="text"  class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="price">Product price </FormLabel>
                          <Field name="price" type="text"  class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="orderedQuantity">Order Quantity </FormLabel>
                          <Field name="orderedQuantity" type="number" min={1}
                            max={values.availableQuantity}
                            class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="invoiceAmount">Total Amount</FormLabel>
                          <Field name="invoiceAmount" type="number" class="form-input" value={values.price * values.orderedQuantity} />
                        </Grid>
                      </Grid>
                      <div className='action-buttons'>
                        <DialogActions sx={{ justifyContent: "center" }}>
                          <Button type='success' variant="contained" color="secondary" disabled={isSubmitting}>Confirm</Button>

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

export default ModalAddtoCart;

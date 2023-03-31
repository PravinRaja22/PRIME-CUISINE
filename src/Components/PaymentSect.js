import React ,{useEffect,useState} from "react";
import { FaTrashAlt } from "react-icons/fa";
import {Box, Grid,TableContainer,Paper,Table,TableHead,
        TableRow,TableCell,TableBody,} from '@mui/material'
import axios from "axios";
import PropTypes from 'prop-types';

function PaymentSect() {


  const[records,setRecords]=useState([])

  useEffect(()=>{
    fetchInvoice()
  },[])


  const fetchInvoice=()=>{

    axios.post('http://localhost:5000/getcartData')
    .then((res)=>{
      console.log(res.data,"res api")
      setRecords(res.data)
    })
    .catch((err)=>{
console.log(err,"api error")
    })
  }

  
  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          m: 1,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
  }
  
  Item.propTypes = {
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
      ),
      PropTypes.func,
      PropTypes.object,
    ]),
  };

  function handleOnRowClick(){
    console.log("inside handle On Row Click")
  }
  return (
    <>
      <div className="restaurent_list">
      <div style={{ width: '100%' }}>
      <Box
        sx={{ display: 'flex', p: 1, bgcolor: '#FBF8BE', borderRadius: 1 }}
      >
       <Grid container>
          <Grid item xs={12} md={12} >
            <Item >
            
            <TableContainer component={Paper} sx={{maxHeight:400}}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr.No</TableCell>
            <TableCell align="left">Food Name</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="center">price</TableCell>
            <TableCell align="center">Total Price</TableCell>
            <TableCell align="center">Billing Date</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell alingn="cenetr"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((row,index) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="left">{row.orderedFoodName}</TableCell>
              <TableCell align="left">{row.orderedQuantity}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.totalPrice}</TableCell>
              <TableCell align="center">{row.billDate}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            </Item>
          </Grid>

        </Grid>
      </Box>
    </div>
      </div>
    </>
  );
}

export default PaymentSect;
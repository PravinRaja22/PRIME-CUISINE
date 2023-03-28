import React ,{useEffect,useState} from "react";
import { FaTrashAlt } from "react-icons/fa";
import {Box, Grid,TableContainer,Paper,Table,TableHead,
        TableRow,TableCell,TableBody,
    Button,Modal, IconButton,} from '@mui/material'
import axios from "axios";
import PropTypes from 'prop-types';


import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
function RestaurentIndex() {


  const[records,setRecords]=useState([])
    const[ModelOpen,setModelOpen]=useState(false)

    const navigate= useNavigate()

  useEffect(()=>{
    fetchrestaurents()
  },[])


  const fetchrestaurents=()=>{

    axios.post('http://localhost:5000/getrestaurentsData')
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

  const handleAddNew=()=>{
    console.log("inside add new ")
    navigate("/new-restaurents", {state:{record:{} }})
  }

  const closeModel=()=>{
    setModelOpen(false)
  }

  const handleEdit=(row)=>{
    console.log(row,"row")
    const item=row
    navigate("/restaurentPage", {state:{record:{item} }})
  }

  const handleDelete=(row)=>{
    console.log(row,"row delete")
    axios.post(`http://localhost:5000/deleterestaurentsData?code=${row._id}`)
    .then(res=>{
        console.log(res,"delete res")
        fetchrestaurents()
    })
    .catch(err=>{
        console.log(err,"error")
    })
  }
  return (
    <>
      <div className="payment">
      <div style={{ width: '100%' }}>

<Grid>
    <Button onClick={()=>handleAddNew()} >New</Button>
</Grid>

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
            <TableCell align="left">Restaurent Name</TableCell>
            <TableCell align="left">FoodName</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Availablility</TableCell>
           
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
              <TableCell align="left">{row.restaurentName}</TableCell>
              <TableCell align="left">{row.foodName}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.availablility}</TableCell>
             <TableCell><IconButton onClick={()=>handleEdit(row)}> {<BiEditAlt/>} </IconButton></TableCell>             
             <TableCell><IconButton onClick={()=>handleDelete(row)}> {<AiFillDelete/>} </IconButton></TableCell>
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

export default RestaurentIndex;

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
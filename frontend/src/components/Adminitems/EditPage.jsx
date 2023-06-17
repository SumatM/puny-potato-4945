import { Box, Button, Flex, FormControl, FormLabel,Grid,Input, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import "./edit.css"
import AdminSidebar from '../AdminSidebar'
import AdminNavTop from '../AdminNavTop';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { patchProduct } from '../../Redux/AdminReducer/action';

const EditPage = () => {

  const {id}=useParams()
  const dispatch=useDispatch();
  const store=useSelector(store=>console.log(store))
  const navigate=useNavigate()
 
 
console.log(id)

  let obj={
  title:"",
  description:"",
  category:"",
  price:""
  }

  const [detail,setDetail]=useState(obj)

  const handleChange=(e)=>{
   const {name,value}=e.target;
   setDetail((prev)=>{
    return {...prev,[name]:value}
   })
  }
  const handleSubmit=()=>{
     console.log(detail);
   dispatch(patchProduct(id,detail))
   alert("Data Updated Successfully")
   navigate("/admin/courses")
  }



  return (

    <Grid className='Nav'  h={'99vh'} w='94%' gap={10}>
    <AdminSidebar/> 
       <Box >
     <AdminNavTop/>
   {/*  */}
   <Flex align="center" justify="center"  border={'2px solid white'} borderRadius={10} className="background" color={'white'}>
      <Box width={["100%", "80%", "60%", "40%"]} p={4}>
        <FormControl>
          <FormLabel >Course Title</FormLabel>
          <Input type="text" placeholder="Enter Course Title" name="title" value={detail.title} onChange={handleChange} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Course Description</FormLabel>
          <Textarea placeholder="Enter Course description" name="description" value={detail.description} onChange={handleChange} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Category</FormLabel>
          <Input type="text" placeholder="Enter Course Category" name="category" value={detail.category} onChange={handleChange}/>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Course Price</FormLabel>
          <Input type="number" placeholder="Enter Course price"  name="price" value={detail.price} onChange={handleChange}/>
        </FormControl>
        
        <Button mt={4} colorScheme="blue" size="md" isFullWidth onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Flex>
       </Box>
 
     </Grid>
    
  
  
  )
}

export default EditPage

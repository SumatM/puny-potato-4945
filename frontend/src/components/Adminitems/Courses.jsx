import { Box, Button, ButtonGroup, Flex, Grid, IconButton, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  
} from '@chakra-ui/react'
import { AddIcon, EditIcon } from '@chakra-ui/icons'
import {useDispatch, useSelector} from "react-redux"
import convertDateFormat, { deleteProduct, getProduct } from '../../Redux/AdminReducer/action'
import Pagination from './Pagination'
import AdminSidebar from '../AdminSidebar'
import AdminNavTop from '../AdminNavTop'

const Courses = () => {

  const store=useSelector((store)=>store.AdminReducer.data);
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const [page,setPage]=useState(1)
  const [check,setCheck]=useState("")
  const limit =4

  console.log(store,"storeAll")
  

  useEffect(()=>{
  dispatch(getProduct(page,limit))  

  },[page])
  

  const handleDelete=(id,title)=>{
    console.log(id)
  dispatch(deleteProduct(id))
  alert(`${title} is Deleted`)
  }

  const handlePageChange=(page)=>{
    setPage(page)
  }
console.log(store.length)
  const count=store.length

  const handleSelect=(e)=>{
  const {value}=e.target
  console.log(value)
  }

 const handlePageButton=(val)=>{
  setPage(prev=>prev+val)
 }


  return (

    <Grid className='Nav'  h={'99vh'} w='94%' gap={10}>
    <AdminSidebar/> 
       <Box >
     <AdminNavTop/>
   {/*  */}
   <Box >
      <Flex justify='space-between' align={'center'}>
        <Text>Welcome To Course</Text>
        <Select w={'80%'} onChange={handleSelect}>
          <option value="">Price_Sort</option>
          <option value="asc">Asc Price</option>
          <option value="desc">Desc_Price</option>
        </Select>
        <Link to="/admin/addCourse">Create</Link>
      </Flex>
<Box  maxWidth="100%" overflowX="auto">

      <Table variant="striped" borderRadius="md" w='100%'>
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Date</Th>
          <Th>Category</Th>
          <Th>Description</Th>
          <Th>Price</Th>
          <Th>Teacher</Th>
        </Tr>
      </Thead>
      {store.length>0 && store.map((el,i)=>{
  return  <Tbody key={i}>
  <Tr>
    <Td>{el.title}</Td>
    <Td>{convertDateFormat(el.createdAt)}</Td>
    <Td>{el.category}</Td>
    <Td>{el.description}</Td>
    <Td>{el.price}</Td>
    <Td>{el.teacher}</Td>
    <Box >
    <Button  onClick={()=>handleDelete(el._id,el.title)}>Delete</Button>
      <Link to={`/admin/edit/${el._id}`}>
    <ButtonGroup size='sm' isAttached variant='outline'>
<Button>Edit</Button>
<IconButton aria-label='Add to friends' icon={<EditIcon />} />
</ButtonGroup>
      </Link>
      
    </Box>
  </Tr>
  </Tbody>
      })}



    </Table>
</Box>
<Box textAlign={'right'}>
  <Button disabled={page<=1} onClick={()=>handlePageButton(-1)}>Prev</Button>
  <Pagination totalCount={count} current_page={page} handlePageChange={handlePageChange}/>
  <Button disabled={page>=count} onClick={()=>handlePageButton(1)}>Next</Button>
</Box>
    </Box>


       </Box>
 
     </Grid>

    
  )
}

export default Courses

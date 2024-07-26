import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { propertyData } from '../data/data'
import { useNavigate } from 'react-router-dom'
import { userRequest } from '../requestMethods'

const Container = styled.div`
    width: 100%-10px;
    /* height: 100px; */
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    margin: 10px;
    display: flex;
  `

const LeftDiv = styled.div`
  width: 70%;
`


const RightDiv = styled.div`
  width: 30%;
  display: flex;
  align-items: flex-end;
  justify-content: end;
`

const UpdateButton = styled.button`
  width: 40%;
  background-color: blue;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
`

const DeleteButton = styled.button`
  width: 40%;
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
`

const RealestateItems = ({data, update, deleteData}) => {
  
  const navigate = useNavigate()

  const handleClick = (val) => {
    // console.log(val._id)
    navigate(`/updateProperty/${val._id}`)
  }

  const handleDelete = (val) => {
    const deleteData = async() => {
      const res = await userRequest.delete(`/property/deleteProperty/${val._id}`)
      // console.log(res.data)
      window.location.reload()
    }
    deleteData()
  }

  return (

    data.map((val, ind) => (
        <Container key={ind}>
          <LeftDiv>

      <div>Location: {val.location.charAt(0).toUpperCase()+val.location.slice(1)}</div>
      <div>Property Type: {val.propertyType.charAt(0).toUpperCase()+val.propertyType.slice(1)}</div>
      <div>BHK : {val.bhk} </div>
      <div>Description : {val.description}</div>
      <div>Price: {val.price}</div>
      <div>Agent Name: {val.agentName.charAt(0).toUpperCase()+val.agentName.slice(1)}</div>
      <div>Contact No: {val.contactNumber}</div>
      <div>Sold Details: {val.soldDetails}</div>
          </LeftDiv>
          <RightDiv>
            {update && <UpdateButton onClick={() => handleClick(val)}>Update</UpdateButton>}
            {deleteData && <DeleteButton onClick={() => handleDelete(val)}>Delete Data</DeleteButton>}
          </RightDiv>
    </Container>
        )
    )
  )
}

export default RealestateItems

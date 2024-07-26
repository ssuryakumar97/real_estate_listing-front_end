import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { userRequest } from '../requestMethods'
import { useSelector } from 'react-redux'
import RealestateItems from '../components/RealestateItems'

const Container =styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  background-color: blue;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin: 10px auto;
  cursor: pointer;
`
const PropertiesPage = () => {
  const [data, setData] = useState([])

  const user = useSelector(state =>  state.currentUser.email)
  console.log(user)

  useEffect(() => {
    const getAllPropertyData = async() => {
      const res = await userRequest.post("/property/getPropertiesByUserName", {email: user})
      console.log(res.data)
      setData(res.data)
    }
    getAllPropertyData()
  },[])

  return (
    <Container>
        <Navbar/>
        <Link to="/registerProperty" style={{margin: "auto"}}>
        <Button>Add new Property</Button>
        </Link>
      <RealestateItems data={data} update={true} deleteData={true}/>
    </Container>
  )
}

export default PropertiesPage

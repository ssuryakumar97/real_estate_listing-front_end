import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { userRequest } from '../requestMethods';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
`;
const Label = styled.label`
  display: inline-block;
  width: 100px;
  margin: 10px;
`;
const Input = styled.input`
  margin: 10px;
  width: 200px;
`;

const Select = styled.select`
  margin: 10px;
  width: 200px;
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin: 10px auto;
  cursor: pointer;
`;


const UpdateProperty = () => {

    const user = useSelector((state) => state.currentUser.email);
  // console.log(user);

    const initialState = {
        email: user,
        location: "",
        propertyType: "villa",
        bhk: "",
        description: "",
        price: "",
        agentName: "",
        contactNumber: "",
      };
    const [data, setData] = useState(initialState);
    const {id} = useParams()

    useEffect(() => {
        const getPropertybyId = async() => {
            const res = await userRequest.get(`/property/getPropertyById/${id}`)
            // console.log(res.data)
            setData(res.data)
        }
        getPropertybyId()
    },[])

    

  
  

  const handleChange = (e) => {
    if (e.target.name === "price") {
      setData((val) => ({ ...val, [e.target.name]: +e.target.value }));
    } else {
      setData((val) => ({ ...val, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerProperty = await userRequest.post(
        "/property/updateProperty",
        data
      );
      // console.log(registerProperty.data);
      alert("Data regisetered successfully");
    //   setData(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(data);
  return (
    <div>
      <Navbar />
      <RegisterContainer>
        <div>
          <Label htmlFor="">Location:</Label>
          <Input
            type="text"
            name="location"
            onChange={handleChange}
            value={data.location}
            required
          />
        </div>
        <div>
          <Label htmlFor="">Property Type:</Label>
          <Select
            name="propertyType"
            onChange={handleChange}
            value={data.propertyType}
          >
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
            <option value="apartment">Apartment</option>
            <option value="individualHouse">Individual House</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="">BHK:</Label>
          <Input
            type="text"
            name="bhk"
            onChange={handleChange}
            value={data.bhk}
          />
        </div>
        <div>
          <Label htmlFor="">Description:</Label>
          <Input
            type="text"
            name="description"
            onChange={handleChange}
            value={data.description}
            required
          />
        </div>
        <div>
          <Label htmlFor="">Price:</Label>
          <Input
            type="number"
            name="price"
            onChange={handleChange}
            value={data.price}
            required
          />
        </div>
        <div>
          <Label htmlFor="">Agent Name:</Label>
          <Input
            type="text"
            name="agentName"
            onChange={handleChange}
            value={data.agentName}
            required
          />
        </div>
        <div>
          <Label htmlFor="">Contact Number:</Label>
          <Input
            type="text"
            name="contactNumber"
            onChange={handleChange}
            value={data.contactNumber}
            required
          />
        </div>
        <div>
          <Label htmlFor="">Sold Details:</Label>
          <Select
            name="soldDetails"
            onChange={handleChange}
            value={data.soldDetails}
          >
            <option value="sold">Sold</option>
            <option value="notSold">Not Sold</option>
          </Select>
        </div>
        <Button onClick={handleSubmit}>Update Property</Button>
      </RegisterContainer>
    </div>
  )
}

export default UpdateProperty

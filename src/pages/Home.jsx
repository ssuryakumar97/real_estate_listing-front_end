import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import RealestateItems from '../components/RealestateItems'
import { publicRequest, userRequest } from '../requestMethods'
// import { propertyData } from '../data/data'


const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
`
const Option = styled.option``

const Input = styled.input`
    padding: 10px;
    margin-right: 10px;
`

const Div = styled.div`
    display: flex;
    width: 100%;
`

const Button = styled.button`
    margin: 10px auto;
    left: auto;
    right: auto;
    background-color: blue;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`

const Home = () => {

    
    const [searchFilter, setSearchFilter] = useState("")
    const [priceFilter, setPriceFilter] = useState("")
    const [propertyTypeFilter, setPropertyTypeFilter] = useState("")
    const [propertyData, setPropertyData] = useState([])
    const [data, setData] =useState(propertyData)
    
    useEffect(() => {
        const getAllPropertyData = async() => {
            const res = await publicRequest.get("/property/getAllProperty")
            // console.log(res.data)
            setPropertyData(res.data)
            setData(res.data)
        }
        getAllPropertyData()
    },[])

    // console.log(propertyData)
    
    


    const [filteredSearch, setFilteredSearch] = useState(propertyData)
    const [filteredProperty, setFilteredProperty] = useState(propertyData)
    const [filteredAll, setFilteredAll] = useState(propertyData)

    // useEffect(() => {
    //     console.log(searchFilter.length)
    //     if(searchFilter.length === 0) {
    //         setFilteredSearch(propertyData)
    //     } else {
    //         setFilteredSearch(propertyData.filter((item) => item.location.includes(searchFilter.toLowerCase())))
    //     }
    // }, [searchFilter,propertyTypeFilter,priceFilter])

    // console.log(filteredSearch)

    // useEffect(() => {
    //     if(propertyTypeFilter === "all") {
    //         // setFilteredProperty([...filteredSearch].filter((item) => item.location.includes(searchFilter.toLowerCase())))
    //         setFilteredProperty(filteredSearch)
    //     } else {
    //         setFilteredProperty([...filteredSearch].filter((item) => item.propertyType.includes(propertyTypeFilter)))
    //     }
    // }, [searchFilter,propertyTypeFilter,priceFilter])

    // console.log(filteredProperty)

    // useEffect(() => {
    //     // if(priceFilter === "all" && propertyTypeFilter !== "all"){
    //     //     setFilteredAll([...filterdProperty].filter((item) => item.propertyType.includes(propertyTypeFilter)))
    //     // }
    //     // if(priceFilter === "all" && propertyTypeFilter === "all"){
    //     if(priceFilter === "all"){
    //         console.log("hhelo")
    //     // setFilteredAll([...filterdProperty].filter((item) => item.location.includes(searchFilter.toLowerCase())))
    //         setFilteredAll([...filteredProperty])
    //     } else if(priceFilter === "10-20"){
    //         setFilteredAll([...filteredProperty].filter((item) => item.price>=1000000 && item.price<=2000000))
    //     } else if(priceFilter === "20-50"){
    //         setFilteredAll([...filteredProperty].filter((item) => item.price>2000000 && item.price<=5000000))
    //     }else if(priceFilter === "50-100"){
    //         setFilteredAll([...filteredProperty].filter((item) => item.price>5000000 && item.price<=10000000))
    //     }else if(priceFilter === "100-200"){
    //         setFilteredAll([...filteredProperty].filter((item) => item.price>10000000 && item.price<=20000000))
    //     }else if(priceFilter === "200AndAbove"){
    //         setFilteredAll([...filteredProperty].filter((item) => item.price>20000000 && item.price<=100000000))
    //     }

    // },[searchFilter,propertyTypeFilter,priceFilter])

    

    // console.log(filteredAll)
    
    const handleFilters = (e) => {
        if(e.target.name === "propertyType") setPropertyTypeFilter(e.target.value)   
        if(e.target.name === "price") setPriceFilter(e.target.value)
               
    }

    const handleClick = () => {
        const SearchFilter = propertyData.filter((item) => item.location.includes(searchFilter.toLowerCase()))
        console.log(SearchFilter)
        const filteredPropertyNew = SearchFilter.filter((item) => item.propertyType.includes(propertyTypeFilter))
        console.log(filteredPropertyNew)
        let filteredAllNew = filteredPropertyNew
        
        if(priceFilter === "10-20"){
            filteredAllNew = [...filteredPropertyNew].filter((item) => item.price>=1000000 && item.price<=2000000)
        } else if(priceFilter === "20-50"){
            filteredAllNew = [...filteredPropertyNew].filter((item) => item.price>2000000 && item.price<=5000000)
        }else if(priceFilter === "50-100"){
            filteredAllNew = [...filteredPropertyNew].filter((item) => item.price>5000000 && item.price<=10000000)
        }else if(priceFilter === "100-200"){
            filteredAllNew = [...filteredPropertyNew].filter((item) => item.price>10000000 && item.price<=20000000)
        }else if(priceFilter === "200AndAbove"){
            filteredAllNew = [...filteredPropertyNew].filter((item) => item.price>20000000 && item.price<=100000000)
        }
        console.log(filteredAllNew)
        setData([...filteredAllNew])
    }

    
  return (
    <div>
      <Navbar/>
      <FilterContainer>
        <Filter>
            
            <Input type='text' placeholder='location' onChange={(e) => setSearchFilter(e.target.value)} value={searchFilter}/>
            {/* <Select name='color' onChange={handleFilters}>
                <Option disabled>Color</Option>
                <Option>Red</Option>
                <Option>Green</Option>
                <Option>Blue</Option>
                <Option>Yellow</Option>
            </Select> */}
            <FilterText>Property Type:</FilterText>
            <Select name='propertyType' onChange={handleFilters}>
                <Option value="">All</Option>
                <Option value="villa">Villa</Option>
                <Option value="plot">Plot</Option>
                <Option value="apartment">Apartments</Option>
                <Option value="individualHouse">Individual House</Option>
            </Select>
        </Filter>
        <Filter>
            <FilterText>Price Range:</FilterText>
            <Select name="price" onChange={handleFilters}>
                <Option value="">All</Option>
                <Option value="10-20">10Lakhs to 20Lakhs</Option>
                <Option value="20-50">20Lakhs to 50Lakhs</Option>
                <Option value="50-100">50Lakhs to 1Cr</Option>
                <Option value="100-200">1Cr to 2Cr</Option>
                <Option value="200AndAbove">2Cr and above</Option>
            </Select>    
        </Filter>
      </FilterContainer>
      <Div>
      <Button onClick={handleClick}>Add filters</Button>
      </Div>
      <RealestateItems data={data}/>
    </div>
  )
}

export default Home

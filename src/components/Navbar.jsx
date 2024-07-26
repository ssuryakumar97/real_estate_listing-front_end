import React from 'react'
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


const Container = styled.div`
    min-height: 30px;    
`
const Wrapper = styled.div`
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    align-items: center;
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px; 
    padding: 5px;
`
const Input = styled.input`
    border: none;
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h3`
    font-weight: bold;
`
const Image = styled.img`
    width: 40px;
    height: 40px;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const MenuItem = styled.div`
    font-size: 14px;
    
    cursor: pointer;
    margin-left: 25px;
`

const LinkItem = styled(Link)`
    text-decoration: none;
    color: black;
`


function Navbar() {
    // const quantity = useSelector(state => state.cart.quantity)

    const navigate= useNavigate()

    const handleLoginLogout = () => {
        localStorage.removeItem("persist:root");
    navigate("/login");
    window.location.reload()
    }


    return (
    <Container>
        <Wrapper>
            <Left>
                {/* <Language>EN</Language> */}
                <Image src='https://1000logos.net/wp-content/uploads/2016/10/Batman-Logo-1939.png' />
                <Logo>Realestate Listing</Logo>
            </Left>
            <Center></Center>
            <Right>  
            <LinkItem to="/">
                    <MenuItem>HOME</MenuItem>
                </LinkItem>
                <LinkItem to="/register">
                    <MenuItem>REGISTER</MenuItem>
                </LinkItem>
                <LinkItem to="/yourProperties">
                <MenuItem>YOUR PROPERTIES</MenuItem>
                </LinkItem>
                
                <MenuItem onClick={handleLoginLogout}>SIGN IN</MenuItem>
                <MenuItem onClick={handleLoginLogout}>LOGOUT</MenuItem>
                
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar

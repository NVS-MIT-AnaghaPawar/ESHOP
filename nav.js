import React, { useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './nav.css'
const Nav = ({searchbtn}) => {
    const [search, setSearch] = useState()
    const { loginWithRedirect, logout, user, isAuthenticated} = useAuth0();
  return (
    <>
    <div className='main_header'>
        <div className='container'>
            <div className='logo'>
                <h1> Eshop </h1>
            </div>
            <div className='search_box'>
                <input type='text' value={search} placeholder='Search Your Product...' autoComplete='off' onChange={(e) => setSearch(e.target.value)}></input>
                <button onClick={() => searchbtn (search)}>Search</button>
            </div>
            <div className='icon'>
                {
                    isAuthenticated &&
                    (
                        <div className='account'>
                        <div className='user_icon'>
                        <AiOutlineUser />
                        </div>
                        <p>Hello, {user.name}</p>
                    </div>
                    )
                }
                <div className='second_icon'>
                <Link to="/" className='link'><AiOutlineHeart /></Link>
                <Link to="/cart" className='link'><BsBagCheck /></Link>
                </div>
            </div>
        </div>
    </div>
    <div className='header'>
        <div className='container'>
            <div className='nav'>
            <ul>
                <li>
                    <Link to='/' className='link'>Home</Link>
                </li>
                <li>
                    <Link to='/product'className='link'>Product</Link>
                </li>
                <li>
                    <Link to='/about'className='link'>About</Link>
                </li>
                <li>
                    <Link to='/contact'className='link'>Contact</Link>
                </li>
              
            </ul>
            </div>
            <div className='auth'>
                {
                    isAuthenticated ?
                    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}><CiLogout /></button>
                    :
                    <button onClick={() => loginWithRedirect()}><CiLogin /></button>
                }
            </div>
        </div>
    </div>
    </>
  )
}

export default Nav
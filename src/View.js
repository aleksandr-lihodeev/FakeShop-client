import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import Authorization from './containers/Authorization/Authorization'
import {useSelector} from 'react-redux'
import Layout from './Layout/Layout'
import Profile from './containers/Profile/Profile'
import Product from './containers/Product/Product'
import Cart from './containers/Cart/Cart'
import Favorite from './containers/Favorite/Favorite'

const View = () => {
    const {auth} = useSelector((state) => state.auth)

    return (
        <Routes>
            <Route path="/" element={auth ? <Layout/> : <Navigate to="/auth"/>}>
                <Route index element={<Profile/>}/>
                <Route path="bar" element={<Product/>}/>
                <Route path="cart" element={<Cart/>}/>
                <Route path="favorite" element={<Favorite/>}/>
            </Route>
            <Route
                path="/auth"
                element={auth ? <Navigate to="/"/> : <Authorization/>}
            />
        </Routes>
    )
}

export default View

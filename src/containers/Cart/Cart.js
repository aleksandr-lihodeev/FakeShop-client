import React, { useEffect, useState } from 'react'
import { Flex, Layout } from 'antd'
import AntdHeader from '../../components/AntdHeader/AntdHeader'
import { useDispatch, useSelector } from 'react-redux'
import s from './Cart.module.css'
import {
  ADD_PRODUCT_TO_CART_ASYNC,
  ADD_PRODUCT_TO_FAVORITE_ASYNC,
  GET_PRODUCT_CART_ASYNC,
  GET_PRODUCT_FAVORITE_ASYNC,
  REMOVE_PRODUCT_FROM_CART_ASYNC,
} from '../../redux/actions/actions'
import Loader from '../../components/Loader/Loader'
import CartItem from '../../components/CartItem/CartItem'
import AntdEmpty from '../../components/AntdEmpty/AntdEmpty'

const Cart = () => {
  const { cart, loading } = useSelector((state) => state.cart)
  console.log(cart)
  const dispatch = useDispatch()

  const [loadingButtons, setLoadingButtons] = useState({})
  const [loadingFavoriteButton, setLoadingFavoriteButton] = useState({})

  const { Content } = Layout

  const layoutStyle = {
    height: '100vh',
    padding: '100px 0',
  }

  useEffect(() => {
    dispatch(GET_PRODUCT_FAVORITE_ASYNC())
    dispatch(GET_PRODUCT_CART_ASYNC())
  }, [dispatch, loadingButtons, loadingFavoriteButton])

  const addProductToCart = (productId) => {
    setLoadingButtons((prev) => ({ ...prev, [productId]: true }))

    dispatch(ADD_PRODUCT_TO_CART_ASYNC(productId))
      .then(() => {
        setLoadingButtons((prev) => ({ ...prev, [productId]: false }))
      })
      .catch(() => {
        setLoadingButtons((prev) => ({ ...prev, [productId]: false }))
      })
  }

  const removeProductFromCart = (productId) => {
    setLoadingButtons((prev) => ({ ...prev, [productId]: true }))

    dispatch(REMOVE_PRODUCT_FROM_CART_ASYNC(productId))
      .then(() => {
        setLoadingButtons((prev) => ({ ...prev, [productId]: false }))
      })
      .catch(() => {
        setLoadingButtons((prev) => ({ ...prev, [productId]: false }))
      })
  }

  const addToFavorite = (productId) => {
    setLoadingFavoriteButton((prev) => ({ ...prev, [productId]: true }))

    dispatch(ADD_PRODUCT_TO_FAVORITE_ASYNC(productId))
      .then(() => {
        setLoadingFavoriteButton((prev) => ({ ...prev, [productId]: false }))
      })
      .catch(() => {
        setLoadingFavoriteButton((prev) => ({ ...prev, [productId]: false }))
      })
  }

  const renderItems = cart.items?.map((item) => (
    <CartItem
      item={item}
      addProductToCart={addProductToCart}
      removeProductFromCart={removeProductFromCart}
      loadingButtons={loadingButtons[item.product._id]}
      addToFavorite={addToFavorite}
      favoriteLoading={loadingFavoriteButton[item?.product?._id]}
    />
  ))

  const allButtonsLoaded = Object.values(loadingButtons).every(
    (value) => !value,
  )
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout style={layoutStyle}>
        <AntdHeader title="Cart" />
        <Layout>
          {allButtonsLoaded && loading && <Loader />}

          <div className="container">
            <Content className={s.content}>
              {cart ? <h1>Grand total: {cart.grandTotal}</h1> : ''}
              <div className="row gy-4 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
                {!cart ? (
                  <AntdEmpty text="Cart is empty" textButton="Fill your cart" />
                ) : (
                  renderItems
                )}
              </div>
            </Content>
          </div>
        </Layout>
      </Layout>
    </Flex>
  )
}

export default Cart

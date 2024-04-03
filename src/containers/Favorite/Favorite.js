import React, { useEffect, useState } from 'react'
import s from './Favorite.module.css'
import { Flex, Layout } from 'antd'
import AntdHeader from '../../components/AntdHeader/AntdHeader'
import Loader from '../../components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  ADD_PRODUCT_TO_CART_ASYNC,
  ADD_PRODUCT_TO_FAVORITE_ASYNC,
  GET_COCKTAILS_ASYNC,
  GET_PRODUCT_CART_ASYNC,
  GET_PRODUCT_FAVORITE_ASYNC,
} from '../../redux/actions/actions'
import Item from '../../components/Item/Item'
import AntdEmpty from '../../components/AntdEmpty/AntdEmpty'

const Favorite = () => {
  const [loadingButtons, setLoadingButtons] = useState({})
  const [loadingFavoriteButton, setLoadingFavoriteButton] = useState({})

  const { favorite, loading } = useSelector((state) => state.favorite)

  const dispatch = useDispatch()

  const { Content } = Layout

  console.log(favorite)

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

  const renderItems = favorite?.map((item) => {
    return (
      <Item
        key={item.product._id}
        item={item.product}
        addProductToCart={addProductToCart}
        loading={loadingButtons[item?.product?._id]}
        addToFavorite={addToFavorite}
        favoriteLoading={loadingFavoriteButton[item?.product?._id]}
      />
    )
  })

  useEffect(() => {
    dispatch(GET_PRODUCT_FAVORITE_ASYNC())
    dispatch(GET_PRODUCT_CART_ASYNC())
  }, [dispatch, loadingFavoriteButton])

  const layoutStyle = {
    height: '100vh',
    padding: '100px 0',
  }

  return (
    <Flex gap="middle" wrap="wrap">
      <Layout style={layoutStyle}>
        <AntdHeader title="Favorite" />
        <Layout>
          {loading && <Loader />}
          <div className="container">
            <Content className={s.content}>
              <div className="row gy-4 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
                {favorite?.length === 0 || favorite === undefined ? (
                  <AntdEmpty
                    text="Favorite is empty"
                    textButton="Fill your favorite"
                  />
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

export default Favorite

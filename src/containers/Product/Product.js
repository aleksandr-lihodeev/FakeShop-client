import React, { useEffect, useState } from 'react'
import { Flex, Layout } from 'antd'
import AntdHeader from '../../components/AntdHeader/AntdHeader'
import { useDispatch, useSelector } from 'react-redux'
import s from './Product.module.css'
import {
  ADD_PRODUCT_TO_CART_ASYNC,
  ADD_PRODUCT_TO_FAVORITE_ASYNC,
  GET_CATEGORY_ASYNC,
  GET_COCKTAILS_ASYNC,
  GET_PRODUCT_CART_ASYNC,
  GET_PRODUCT_FAVORITE_ASYNC,
} from '../../redux/actions/actions'
import Item from '../../components/Item/Item'
import MUIPagination from '../../components/MUIPagination/MUIPagination'
import Loader from '../../components/Loader/Loader'
import Search from '../../components/Search/Search'
import Footer from '../../components/Footer/Footer'
import { usePageState } from '../../custom hook/usePageState'

const Product = () => {
  const [pageState, setPageState] = usePageState()

  const currentPage = pageState.page
  const search = pageState.search
  const setCategory = pageState.category

  const { cocktail, totalPage, loading } = useSelector(
    (state) => state.cocktail,
  )
  const dispatch = useDispatch()
  const [loadingButtons, setLoadingButtons] = useState({})
  const [loadingFavoriteButton, setLoadingFavoriteButton] = useState({})

  const { Content } = Layout

  useEffect(() => {
    const valuesObject = {
      currentPage,
      search,
      setCategory,
    }
    Promise.all([
      dispatch(GET_COCKTAILS_ASYNC(valuesObject)),
      dispatch(GET_PRODUCT_FAVORITE_ASYNC()),
      dispatch(GET_PRODUCT_CART_ASYNC()),
      dispatch(GET_CATEGORY_ASYNC()),
    ])
  }, [
    dispatch,
    currentPage,
    search,
    loadingFavoriteButton,
    loadingButtons,
    setCategory,
  ])

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

  const renderItems = cocktail.map((item) => (
    <Item
      key={item._id}
      item={item}
      addProductToCart={addProductToCart}
      loading={loadingButtons[item._id]}
      addToFavorite={addToFavorite}
      favoriteLoading={loadingFavoriteButton[item._id]}
    />
  ))

  return (
    <Flex gap="middle" wrap="wrap">
      <Layout className={s.layout}>
        <AntdHeader title="Bar" />
        <Layout className={s.layout}>
          {loading && <Loader />}
          <div className="container">
            <Content className={s.content}>
              <p className={s.animated__text}>
                <span>{setCategory}</span>
              </p>

              <div className={s.search}>
                <Search
                  setPageState={setPageState}
                  pageState={pageState}
                  placeholder="Search a good"
                />
              </div>
              <div className="row gy-4 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
                {renderItems}
              </div>
              <div className={s.pagination}>
                <MUIPagination
                  pageState={pageState}
                  setPageState={setPageState}
                  totalPage={totalPage}
                />
              </div>
            </Content>
          </div>
        </Layout>
        <Footer />
      </Layout>
    </Flex>
  )
}

export default Product

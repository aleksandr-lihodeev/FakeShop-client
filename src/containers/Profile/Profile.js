import React, { useState, useEffect } from 'react'
import s from './Profile.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { EditOutlined, DeleteOutlined, LogoutOutlined } from '@ant-design/icons'
import { Flex, Layout } from 'antd'
import AntdButton from '../../components/AntdButton/AntdButton'
import {
  GET_CATEGORY_ASYNC,
  GET_COCKTAILS_ASYNC,
  GET_PRODUCT_CART_ASYNC,
  GET_PRODUCT_FAVORITE_ASYNC,
  PROFILE_ASYNC,
  PROFILE_DELETE_ASYNC,
} from '../../redux/actions/actions'
import AntdHeader from '../../components/AntdHeader/AntdHeader'
import AntdAvatar from '../../components/AntdAvatar/AntdAvatar'
import AntdModal from '../../components/AntdModal/AntdModal'
import { REMOVE_TOKEN_ACTION } from '../../redux/slicers/authSlicer'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { profile } = useSelector((state) => state.profile)
  const { name, email } = profile
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { Content } = Layout
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    Promise.all([
      dispatch(GET_PRODUCT_FAVORITE_ASYNC()),
      dispatch(GET_PRODUCT_CART_ASYNC()),
      dispatch(GET_CATEGORY_ASYNC()),
      dispatch(PROFILE_ASYNC()),
    ])
  }, [dispatch])

  const showModal = () => {
    console.log(1)
    setOpenModal(true)
  }

  const layoutStyle = {
    height: '100vh',
    padding: '100px 0',
  }

  const handleDeleteProfile = () => {
    dispatch(PROFILE_DELETE_ASYNC()).then(() => dispatch(REMOVE_TOKEN_ACTION()))
    navigate('/auth')
  }

  const handleLogout = () => {
    dispatch(REMOVE_TOKEN_ACTION())
    navigate('/auth')
  }

  return (
    <Flex gap="middle" wrap="wrap">
      <Layout style={layoutStyle}>
        <AntdHeader title="Profile" />
        <Layout>
          <Content className={s.content}>
            <div className="container">
              <div className={s.insideContent}>
                <div className={s.avatar}>
                  <AntdAvatar size={300} />
                </div>
                <div className={s.info}>
                  <p>
                    USERNAME: <span className={s.spanInfo}>{name}</span>
                  </p>
                  <p>
                    EMAIL: <span className={s.spanInfo}>{email}</span>
                  </p>
                  <div className={s.wrapper__btn}>
                    <AntdButton
                      func={showModal}
                      htmlType="button"
                      text="Edit profile"
                      icon={<EditOutlined />}
                    />
                    <AntdButton
                      func={handleDeleteProfile}
                      htmlType="button"
                      text="Delete profile"
                      icon={<DeleteOutlined />}
                    />
                    <AntdButton
                      func={handleLogout}
                      htmlType="button"
                      text="Logout"
                      icon={<LogoutOutlined />}
                    />
                    <AntdModal
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Flex>
  )
}

export default Profile

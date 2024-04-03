import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import s from './AntdAvatar.module.css'

const AntdAvatar = ({ size }) => {
  const { profile } = useSelector((state) => state.profile)

  return (
    <Avatar
      className={s.ava}
      shape="circle"
      size={size}
      src={profile.imageUrl ? profile.imageUrl : undefined}
      icon={!profile.imageUrl && <UserOutlined />}
    />
  )
}

export default AntdAvatar

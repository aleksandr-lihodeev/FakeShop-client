import React from 'react'
import { Button, Empty } from 'antd'
import { useNavigate } from 'react-router-dom'
import s from './AntdEmpty.module.css'

const AntdEmpty = ({ text, textButton }) => {
  const navigate = useNavigate()

  return (
    <div className={s.centeredContainer}>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          width: '100%',
        }}
        description={<span>{text}</span>}
      >
        <Button type="primary" onClick={() => navigate('/bar')}>
          {textButton}
        </Button>
      </Empty>
    </div>
  )
}

export default AntdEmpty

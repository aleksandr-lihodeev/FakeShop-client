import React from 'react'
import { Button } from 'antd'
import s from './AntdButton.module.css'

const AntdButton = ({ htmlType, func, icon, text }) => {
  return (
    <Button
      className={s.btn}
      type="primary"
      htmlType={htmlType}
      onClick={func}
      icon={icon}
    >
      {text}
    </Button>
  )
}

export default AntdButton

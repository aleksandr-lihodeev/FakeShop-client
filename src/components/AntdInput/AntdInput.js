// AntdInput.js
import React from 'react'
import { Input } from 'antd'
import s from './AntdInput.module.css'

const AntdInput = ({ name, func, placeholder, value }) => {
  return (
    <div className={s.input}>
      <Input
        value={value}
        autoComplete="off"
        name={name}
        onChange={(e) => func(name, e.target.value)} // Изменил здесь
        placeholder={placeholder}
      />
    </div>
  )
}

export default AntdInput

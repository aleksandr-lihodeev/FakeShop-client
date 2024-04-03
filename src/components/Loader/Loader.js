import React from 'react'
import s from './Loader.module.css'

const Loader = () => {
  return (
    <div className={s.loader__overlay}>
      <div className={s.loader__container}>
        <span className={s.loader}></span>
      </div>
    </div>
  )
}

export default Loader

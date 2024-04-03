import React from 'react'
import s from './AntdHeader.module.css'
import { Link } from 'react-router-dom'
import headerIcon from '../../assets/icons/headerIcon.png'
import heartIcon from '../../assets/icons/heartIcon.svg'
import barIcon from '../../assets/icons/barIcon.svg'
import cartIcon from '../../assets/icons/cartIcon.svg'
import AntdAvatar from '../AntdAvatar/AntdAvatar'
import { useSelector } from 'react-redux'
import CatalogMenu from '../CatalogMenu/CatalogMenu'

const AntdHeader = () => {
  const { favorite } = useSelector((state) => state.favorite)
  const { cart } = useSelector((state) => state.cart)
  const headerItems = [
    {
      key: '1',
      link: '/favorite',
      label: 'Favorite',
      img: heartIcon,
      length: favorite?.length || '',
    },
    {
      key: '2',
      link: '/bar',
      label: 'Bar',
      img: barIcon,
      length: '',
    },
    {
      key: '3',
      link: '/cart',
      label: 'Cart',
      img: cartIcon,
      length: cart.items?.length || '',
    },
  ]

  const renderItems = headerItems.map((item) => (
    <li key={item.key} className={s.box}>
      <Link to={item.link}>
        <div className={s.wrap__length}>
          <p className={s.length__items}>{item.length}</p>
        </div>
        <img src={item.img} alt="" />
        {item.label}
      </Link>
    </li>
  ))

  const { profile } = useSelector((state) => state.profile)
  const { name } = profile

  return (
    <>
      <div className={s.header}>
        <div className="container">
          <div className={s.header__wrap}>
            <div className={s.header__icon}>
              <img src={headerIcon} alt="" className={s.logo} />
              <p>COCKTAILS</p>
            </div>
            <div className={s.catalog__btn}>
              <CatalogMenu />
            </div>

            <ul>{renderItems}</ul>
            <div className={s.avatar}>
              <Link to="/">
                <AntdAvatar size={40} />
                <p>{name}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AntdHeader

import React from 'react'
import { CircularProgress, Tooltip, IconButton } from '@mui/material'
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp'
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import s from './CartItem.module.css'
import { ADD_PRODUCT_TO_FAVORITE_ASYNC } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'

const CartItem = ({
  item,
  addProductToCart,
  removeProductFromCart,
  loadingButtons,
  addToFavorite,
  favoriteLoading,
}) => {
  const dispatch = useDispatch()

  const { favorite } = useSelector((state) => state.favorite)

  console.log(favorite)

  const isFavorite = favorite?.reduce(
    (acc, rec) => acc || rec.product?._id === item.product._id,
    false,
  )
  return (
    <div className="col">
      <div className={s.box}>
        <p>{item.product.name}</p>
        <img src={item.product.img} alt="" />
        <p>Quantity: {item.quantity}</p>
        <p>Total price: {item.total}</p>
        <div className={s.add__remove__btn}>
          <Tooltip title="Remove item">
            <IconButton
              color="primary"
              onClick={() => removeProductFromCart(item.product._id)}
            >
              {loadingButtons ? (
                <CircularProgress size={24} color="secondary" />
              ) : (
                <RemoveIcon />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Add item">
            <IconButton
              color="primary"
              onClick={() => addProductToCart(item.product._id)}
            >
              {loadingButtons ? (
                <CircularProgress size={24} color="secondary" />
              ) : (
                <AddIcon />
              )}
            </IconButton>
          </Tooltip>
        </div>
        <Tooltip
          title={isFavorite ? 'Remove from favorite' : 'Add to favorite'}
        >
          <IconButton
            className={s.icon__button}
            onClick={() => addToFavorite(item.product?._id)}
          >
            {favoriteLoading ? (
              <CircularProgress size={24} color="secondary" />
            ) : isFavorite ? (
              <FavoriteSharpIcon style={{ color: 'red' }} />
            ) : (
              <FavoriteBorderSharpIcon style={{ color: 'red' }} />
            )}
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}

export default CartItem

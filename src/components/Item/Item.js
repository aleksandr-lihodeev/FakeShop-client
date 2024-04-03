import React from 'react'
import s from './Item.module.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import LoadingButton from '@mui/lab/LoadingButton'
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp'
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp'
import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import DescriptionIcon from '@mui/icons-material/Description'

const Item = ({
  item,
  addProductToCart,
  loading,
  favoriteLoading,
  addToFavorite,
}) => {
  const { favorite } = useSelector((state) => state.favorite)

  const isFavorite = favorite?.reduce(
    (acc, rec) => acc || rec.product?._id === item?._id,
    false,
  )

  return (
    <div className="col" key={item?._id}>
      <div className={s.box}>
        <Tooltip
          title={isFavorite ? 'Remove from favorite' : 'Add to favorite'}
        >
          <IconButton
            className={s.icon__button}
            onClick={() => addToFavorite(item?._id)}
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

        <LazyLoadImage src={item?.img} />
        <div className={s.box__content}>
          <p className={s.price}>{item?.price} KGS</p>
          <p className={s.name}>{item?.name}</p>

          <LoadingButton
            style={{
              color: '#70C05B',
              border: '1px solid #70C05B',
              width: '100%',
            }}
            loading={loading}
            variant="outlined"
            onClick={() => {
              addProductToCart(item._id)
            }}
          >
            Add to cart
          </LoadingButton>
        </div>
      </div>
    </div>
  )
}

export default Item

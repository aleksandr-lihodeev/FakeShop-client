import * as React from 'react'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useSelector } from 'react-redux'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))

const BadgeCart = ({ handleToggle }) => {
  const { cart } = useSelector((state) => state.cart)

  const total = cart.items?.reduce((acc, rec) => acc + rec.quantity, 0)

  return (
    <IconButton onClick={handleToggle} aria-label="cart">
      <StyledBadge badgeContent={total} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  )
}

export default BadgeCart

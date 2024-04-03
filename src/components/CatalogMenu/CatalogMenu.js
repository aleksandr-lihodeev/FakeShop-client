import * as React from 'react'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { usePageState } from '../../custom hook/usePageState'
import { catalogMenuIcons } from '../../constants'
import catalogIcon from '../../assets/icons/catalogIcon.svg'
import s from './CatalogMenu.module.css'

const TemporaryDrawer = () => {
  const [pageState, setPageState] = usePageState()
  const navigate = useNavigate()
  const location = useLocation()
  const { category } = useSelector((state) => state.cocktail)
  const { favorite } = useSelector((state) => state.favorite)
  const [state, setState] = React.useState({
    top: false,
  })

  const isCatalogButtonDisabled = location.pathname !== '/bar'

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const handleItemClick = (text) => {
    navigate('/bar')
    setPageState({ page: 1, search: '', category: text })
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="container">
        <List>
          {category.map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => handleItemClick(text)}
            >
              <ListItemButton>
                <img src={catalogMenuIcons[text]} alt="" className={s.icon} />
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  )

  return (
    <div>
      <div className={s.wrapper__catalog}>
        <Button
          className={s.catalog__button}
          onClick={toggleDrawer('top', true)}
          disabled={isCatalogButtonDisabled}
        >
          {isCatalogButtonDisabled ? 'Disabled' : 'Catalog'}

          <img src={catalogIcon} alt="" />
        </Button>
      </div>

      <Drawer
        anchor={'top'}
        open={state['top']}
        onClose={toggleDrawer('top', false)}
      >
        {list('top')}
      </Drawer>
    </div>
  )
}

export default TemporaryDrawer

import * as React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import s from './MUIInput.module.css'
import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SEARCH_COCKTAIL_ACTION } from '../../redux/slicers/cocktailSlicer'

export default function MUIInput({ state, setState }) {
  const { loading, search } = useSelector((state) => state.cocktail)

  const inputRef = useRef()

  useEffect(() => {
    if (!loading) {
      inputRef.current.focus()
    }
  }, [loading])

  const handleSearch = (e) => {
    SEARCH_COCKTAIL_ACTION(e.target?.value)
  }

  return (
    <div className={s.search}>
      <SearchIcon
        sx={{ color: 'action.active', mr: 1, my: 0.5 }}
        className={s.icon__search}
      />
      <TextField
        onChange={handleSearch}
        id="input-with-sx"
        label="Search by name"
        variant="standard"
        value={search}
        disabled={loading && true}
        inputRef={inputRef}
      />
    </div>
  )
}

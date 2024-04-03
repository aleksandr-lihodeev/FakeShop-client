import React, { useEffect, useRef } from 'react'
import searchIcon from '../../assets/icons/searchIcon.svg'
import s from './Search.module.css'
import { useSelector } from 'react-redux'

const Search = ({ placeholder, pageState, setPageState }) => {
  const { loading } = useSelector((state) => state.cocktail)
  const inputRef = useRef()
  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus()
    }
  }, [loading])

  const handleSearch = (e) => {
    const value = e.target?.value
    setPageState({ page: 1, search: value })
  }

  return (
    <div className={s.searchContainer}>
      <input
        className={s.search}
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
        value={pageState.search}
        disabled={loading && true}
        ref={inputRef}
      />
      <img className={s.searchIcon} src={searchIcon} alt="Search" />
    </div>
  )
}

export default Search

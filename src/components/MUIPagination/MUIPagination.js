import React from 'react'
import { Pagination } from '@mui/material'
import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'

const MUIPagination = ({ totalPage, setPageState, pageState }) => {
  const { loading } = useSelector((state) => state.cocktail)
  const paginationFunc = (e, value) => {
    setPageState({ page: value })
  }

  return (
    <Stack spacing={2}>
      <Pagination
        page={pageState.page}
        count={totalPage}
        color="primary"
        onChange={paginationFunc}
        disabled={loading && true}
      />
    </Stack>
  )
}

export default MUIPagination

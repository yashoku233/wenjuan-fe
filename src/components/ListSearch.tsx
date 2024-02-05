import React, { FC, useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'
import { Input } from 'antd'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(newVal)
  }, [searchParams])

  return (
    <Search
      style={{ width: '200px' }}
      placeholder="请输入关键字"
      allowClear
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
    />
  )
}
export default ListSearch

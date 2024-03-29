import React, { FC, useState, useEffect } from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { Pagination } from 'antd'
import { LIST_PAGE_SIZE, LIST_PAGE_PARMA_KEY, LIST_PAGE_SIZE_KEY } from '../constant/index'

type PropsType = {
  total: number
}
const listPage: FC<PropsType> = (props: PropsType) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
  const [searchParams] = useSearchParams()
  // 从 url 参数中找到page pageSize，并且同步到 Pagination 组件中
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARMA_KEY) || '') || 1
    setCurrent(page)
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_KEY) || '') || LIST_PAGE_SIZE
    setPageSize(pageSize)
  }, [useSearchParams])
  const nav = useNavigate()
  const { pathname } = useLocation()
  // useLocation里面是一些url的参数和地址等 从里面结构出当前url地址
  function handlePageChange(page: number, pageSize: number) {
    //set 方法用来给url加上参数
    setCurrent(page)
    setPageSize(pageSize)
    searchParams.set(LIST_PAGE_PARMA_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_KEY, pageSize.toString())
    // 然后进行跳转
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }
  const { total } = props
  return (
    <>
      <Pagination current={current} total={total} pageSize={pageSize} onChange={handlePageChange} />
    </>
  )
}

export default listPage

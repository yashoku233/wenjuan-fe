import React, { FC, useEffect, useState, useRef } from 'react'
// import { useSearchParams } from 'react-router-dom'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { getQuestionList } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography
const List: FC = () => {
  useTitle('XY问卷 - 我的问卷')
  const [started, setStated] = useState(false) //是否已经开始加载(防抖 有延迟时间)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([]) //list内部的数据 不在url参数中体现
  const [total, setTotal] = useState(0) // 全部的列表数据 上划加载更多，累计
  const haveMoreData = total > list.length //用来判断有无未加载完的数据
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  useEffect(() => {
    setStated(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionList({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )
  // 获取上拉加载的DOM
  const containerRef = useRef<HTMLDivElement>(null)
  // Ahook中的防抖hook
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const ele = containerRef.current
      if (ele == null) return
      const domRect = ele.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      // console.log(bottom, 'bottom')
      if (bottom <= document.body.clientHeight) {
        setStated(true)
        load()
      }
    },
    {
      wait: 1000,
    }
  )
  // 上拉加载优化
  const LoadMoreContentElem = () => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了</span>
    return <span>开始加载下一页</span>
  }
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )} */}
        {/* {list.length === 0 && <Empty description="暂无问卷" />} */}
        {/* <div style={{ height: '2000px' }}></div> */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem()}</div>
      </div>
    </>
  )
}

export default List

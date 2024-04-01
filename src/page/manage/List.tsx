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
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setToal] = useState(0)
  const haveMoreData = total > list.length

  const [searchParams] = useSearchParams()

  useRequest(async () => {
    const data = await getQuestionList({
      page,
      pageSize: LIST_PAGE_SIZE,
      keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
    })
    return data
  })
  // 获取上拉加载的DOM
  const containerRef = useRef<HTMLDivElement>(null)
  // Ahook中的防抖hook 羽语化
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const ele = containerRef.current
      if (ele == null) return
      const domRect = ele.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      // console.log(bottom, 'bottom')
      if (bottom <= document.body.clientHeight) {
        console.log(bottom, 'bottom3333')
      }
    },
    {
      wait: 1000,
    }
  )

  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  useEffect(() => {
    // if (haveMoreData) {
    window.addEventListener('scroll', tryLoadMore)
    // }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams])

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
        {list.length === 0 && <Empty description="暂无问卷" />}
        <div style={{ height: '2000px' }}></div>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>loadMore... 上划加载更多</div>
      </div>
    </>
  )
}

export default List

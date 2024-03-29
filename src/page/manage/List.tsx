import React, { FC, useEffect } from 'react'
// import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import QuestionCard from '../../components/QuestionCard'
import ListPage from '../../components/pageList'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography
const List: FC = () => {
  useTitle('XY问卷 - 我的问卷')
  // const [questionList, setQuestionList] = useState([])
  // const [total, setTotal] = useState(0)

  const { data = {}, loading } = useLoadQuestionListData({})
  const { list = [], total = 0 } = data
  useEffect(() => {
    // async function fn() {
    //   const { list = [], total = 0 } = await getQuestionList()
    //   setQuestionList(list)
    //   setTotal(total)
    // }
    // fn()
  }, [])
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
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无问卷" />}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default List

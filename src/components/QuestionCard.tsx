import React, { FC, useState } from 'react'
import styles from './Questioncard.module.scss'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import { useRequest } from 'ahooks'
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExceptionOutlined,
} from '@ant-design/icons'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}
const { confirm } = Modal

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()

  // 复制问卷
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    // async () => {
    //   const data = await duplicateQuestionService(_id)
    //   return data
    // },
    // 可以换成这种写法
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功')
        nav(`/question/edit/${result.id}`)
      },
    }
  )

  const { title, createdAt, isPublished, answerCount, _id, isStar } = props
  const [isStarState, setIsStarState] = useState(isStar)

  // 取消标星和标星
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已设置')
      },
    }
  )
  // 设置一个删除的state 没有就返回一个空的jsx
  const [deleteState, setDeleteState] = useState(false)
  const { loading: deleteLoading, run: questionDelete } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setDeleteState(true)
      },
    }
  )
  // 删除问卷
  function del() {
    confirm({
      title: '确认删除该问卷',
      icon: <ExceptionOutlined />,
      // 直接使用请求的函数
      onOk: questionDelete,
    })
  }
  if (deleteState) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            &nbsp;
            <span>答卷: {answerCount}</span>
            &nbsp;
            <span> {createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          {/* <button>编辑问卷</button>
          <button>数据统计</button> */}
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                nav(`/question/edit/${_id}`)
              }}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              icon={<LineChartOutlined />}
              size="small"
              onClick={() => {
                nav(`/question/stat/${_id}`)
              }}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Button
            type="text"
            icon={<StarOutlined />}
            size="small"
            onClick={changeStar}
            disabled={changeStarLoading}
          >
            {isStarState ? '取消标星' : '标星'}
          </Button>
          <Popconfirm
            title="确定复制该问卷吗"
            okText="确定"
            cancelText="取消"
            onConfirm={duplicate}
          >
            <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
              复制
            </Button>
          </Popconfirm>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            onClick={del}
            disabled={deleteLoading}
          >
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard

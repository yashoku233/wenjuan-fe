import React, { FC } from 'react'
import styles from './Questioncard.module.scss'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
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
  function duplicate() {
    alert('确认复制')
  }
  function del() {
    confirm({
      title: '确认删除该问卷',
      icon: <ExceptionOutlined />,
      onOk: () => message.success('执行删除'),
    })
  }
  const { title, createdAt, isPublished, answerCount, _id, isStar } = props
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
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
                ;() => {
                  nav(`/question/edit/${_id}`)
                }
              }}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              icon={<LineChartOutlined />}
              size="small"
              onClick={() => {
                ;() => {
                  nav(`/question/stat/${_id}`)
                }
              }}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Button type="text" icon={<StarOutlined />} size="small">
            {isStar ? '取消标星' : '标星'}
          </Button>
          <Popconfirm
            title="确定复制该问卷吗"
            okText="确定"
            cancelText="取消"
            onConfirm={duplicate}
          >
            <Button type="text" icon={<CopyOutlined />} size="small">
              复制
            </Button>
          </Popconfirm>

          <Button type="text" icon={<DeleteOutlined />} size="small" onClick={del}>
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard

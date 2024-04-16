import React, { FC, useState } from 'react'
import { useRequest, useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Space, Button, Modal, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import styles from './common.module.scss'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/pageList'
import { updateQuestionService, deleteQuestionService } from '../../services/question'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('XY问卷 - 回收站')
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success('恢复成功')
        refresh()
      },
    }
  )
  const { run: deleteQuestion } = useRequest(async () => await deleteQuestionService(selectedIds), {
    manual: true,
    onSuccess() {
      message.success('删除成功')
      refresh()
    },
  })
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublicshed: boolean) =>
        isPublicshed ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>,
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]
  function del() {
    confirm({
      title: '确认彻底删除该问卷?',
      icon: <ExclamationCircleOutlined />,
      content: '删除之后不可找回',
      onOk: deleteQuestion,
    })
  }
  // 可以把 JSX 片段定义为变量
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectRowKeys => {
            console.log('selectRowKeys', selectRowKeys)
            setSelectedIds(selectRowKeys as string[])
          },
        }}
      />
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin></Spin>
        </div>
      )}
      {!loading && list.length === 0 && <Empty description="暂无问卷" />}
      <div className={styles.content}>
        {list.length === 0 && <Empty description="暂无问卷" />}
        {list.length > 1 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}
export default Trash

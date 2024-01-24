import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from 'antd'
import { PlusOutlined, BarsOutlined } from '@ant-design/icons'
import styles from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Button type="primary" size="large" icon={<PlusOutlined />}>
          创建问卷
        </Button>
        <Button type="default" size="large" icon={<BarsOutlined />}>
          我的问卷
        </Button>
        <a>星标问卷</a>
        <a>回收站</a>
      </div>

      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout

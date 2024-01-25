import React, { FC, useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'

const { Title } = Typography

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Space align="end">
        <Title>
          <FormOutlined />
        </Title>
        <Title>XY问卷</Title>
      </Space>
    </div>
  )
}

export default Logo

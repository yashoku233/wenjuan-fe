import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'

const NotFound: FC = () => {
  const nav = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, 我们尚未找到这个页面"
      extra={
        <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
          Back Home
        </Button>
      }
    />
  )
}

export default NotFound

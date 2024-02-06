import React, { FC, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Typography, Space, Form, Input, Button, Checkbox } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { REGISTER_PATHNAME } from '../router'

import styles from './Register.module.scss'
import { get } from 'http'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORA_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORA_KEY, password)
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORA_KEY)
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORA_KEY),
  }
}

const Login: FC = () => {
  const [form] = Form.useForm() // 第三方hook

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const onFinish = (values: any) => {
    const { username, password, remember } = values || {}
    remember ? rememberUser(username, password) : deleteUserFromStorage()
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish} form={form}>
        <Form.Item label="用户名" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="密码" name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Link to={REGISTER_PATHNAME}>注册新用户</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login

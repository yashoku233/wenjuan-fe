import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { loginService } from '../services/user'
import { setToken } from '../utils/user-token'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'

import styles from './Register.module.scss'

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
  const nav = useNavigate()
  const [form] = Form.useForm() // 第三方hook

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        console.log(result, 'result')
        const { token = '' } = result
        setToken(token) // 存储 token
        message.success('登陆成功')
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )
  const onFinish = (values: any) => {
    const { username, password, remember } = values || {}
    run(username, password)
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

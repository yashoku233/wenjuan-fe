import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from 'antd'

const HOME: FC = () => {
  const nav = useNavigate()

  function clickHandler() {
    // nav('/login')
    // 第二种方式
    nav({
      pathname: '/login',
      search: 'b=20',
    })
  }

  return (
    <div>
      <p>Home</p>
      <div>
        <button onClick={clickHandler}>登录</button>
        <Button type="primary">Button</Button>

        <Link to="/register?a=10">注册</Link>
      </div>
    </div>
  )
}

export default HOME

import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login: FC = () => {
  const nav = useNavigate()
  return (
    <div>
      <p>登录</p>
      <button
        onClick={() => {
          nav(-1)
        }}
      >
        返回上一层
      </button>
    </div>
  )
}

export default Login

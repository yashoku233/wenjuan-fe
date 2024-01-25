import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '../components/Logo'
import styles from './MainLayout.module.scss'

const MainLayout: FC = () => {
  const { Header, Footer, Sider, Content } = Layout

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>登录</div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>XY问卷 &copy; 2024.Created by XY</Footer>
    </Layout>
  )
}
export default MainLayout

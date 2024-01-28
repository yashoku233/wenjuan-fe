import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import styles from './MainLayout.module.scss'

const MainLayout: FC = () => {
  const { Header, Footer, Content } = Layout

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
        {/* <Row justify="end">
          <Col span={12}>
            <Logo />
          </Col>
          <Col span={12}>col-12</Col>
        </Row> */}
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>XY问卷 &copy; 2024.Created by XY</Footer>
    </Layout>
  )
}
export default MainLayout

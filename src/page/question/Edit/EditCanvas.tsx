import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Componet'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Componet'

type propType = {
  loading: boolean
}

const EditCanvas: FC<propType> = ({ loading }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div>
    </div>
  )
}

export default EditCanvas

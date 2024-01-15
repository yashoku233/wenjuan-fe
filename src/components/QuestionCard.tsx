import React, { FC } from 'react'
import styles from './Questioncard.module.scss'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id } = props
  return (
    <div className={styles.container}>
      <div>title</div>
      <div>botton</div>
    </div>
  )
}

export default QuestionCard

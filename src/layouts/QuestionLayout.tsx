import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  return (
    <div>
      <p>QuestionLayout</p>
      <Outlet />
    </div>
  )
}
export default QuestionLayout

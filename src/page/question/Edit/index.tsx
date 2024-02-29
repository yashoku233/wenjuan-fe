import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../../../services/question'

const Edit: FC = () => {
  const { id = '' } = useParams()
  useEffect(() => {
    async function fn() {
      const data = await getQuestionService(id)
      console.log(data, 'edit page data')
    }
    fn()
  }, [])
  return <p> Edit :{id}</p>
}

export default Edit

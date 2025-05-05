import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { resetComponents } from '../store/componentReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷id')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )
  useEffect(() => {
    if (!data) return
    const { title = '', componentList = [] } = data

    dispatch(resetComponents({ componentList }))
  })
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData

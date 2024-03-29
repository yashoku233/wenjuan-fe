import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionList } from '../services/question'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARMA_KEY,
  LIST_PAGE_SIZE_KEY,
  LIST_PAGE_SIZE,
} from '../constant'

type optionType = {
  isStar: boolean
  isDeleted: boolean
  pageSize: number
  page: number
}

function useLoadQuestionListData(opt: Partial<optionType>) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARMA_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_KEY) || '') || LIST_PAGE_SIZE
      const data = await getQuestionList({ keyword, isStar, isDeleted, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams],
    }
  )
  return { data, loading, error }
}

export default useLoadQuestionListData

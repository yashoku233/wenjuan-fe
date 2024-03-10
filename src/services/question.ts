import axios, { ResDataType } from './ajax'

type SearchOption = {
  keyword: string
}
// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data: ResDataType = await axios.get(url)
  return data
}

// 创建问卷
export async function createQuestion(): Promise<ResDataType> {
  const url = `/api/question`
  const data: ResDataType = await axios.post(url)
  return data
}

// 获取问卷列表
// Partial是TS中需要一部分
export async function getQuestionList(opt: Partial<SearchOption>): Promise<ResDataType> {
  const url = `/api/question`
  const data: ResDataType = await axios.get(url, { params: opt })
  return data
}

import axios, { ResDataType } from './ajax'

export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data: ResDataType = await axios.get(url)
  return data
}

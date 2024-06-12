import axios, { ResDataType } from './ajax'

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user/info'
  const data: ResDataType = await axios.get(url)
  return data
}

// 注册用户
export async function resgiterService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const url = 'api/user/register'
  const boby = { username, password, nickname: nickname || username }
  try {
    const response = await axios.post(url, boby)
    const data: ResDataType = response.data
    return data
  } catch {
    throw new Error(`failed`)
  }
}

// 登陆
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const url = '/api/user/login'
  const boby = { username, password }
  try {
    const response = await axios.post(url, boby)
    const data: ResDataType = response
    return data
  } catch {
    throw new Error('failed')
  }
}

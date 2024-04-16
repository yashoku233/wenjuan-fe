import axios, { ResponseType } from 'axios'

// 获取用户信息
export async function getUserInfoService(): Promise<ResponseType> {
  const url = '/api/user/info'
  const data: ResponseType = await axios.get(url)
  return data
}

// 注册用户
export async function resgiterService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResponseType> {
  const url = 'api/user/register'
  const boby = { username, password, nickname: nickname || username }
  try {
    const response = await axios.post(url, boby)
    const data: ResponseType = response.data
    return data
  } catch {
    throw new Error(`failed`)
  }
}

// 登陆
export async function loginService(username: string, password: string): Promise<ResponseType> {
  const url = '/api/user/login'
  const boby = { username, password }
  try {
    const response = await axios.post(url, boby)
    const data: ResponseType = response.data
    return data
  } catch {
    throw new Error('failed')
  }
}

import { ApiError } from './errors'
export const isOk = (response) => response.status === 200

export const getData = (response) => {
  if (isOk(response)) {
    return response.data
  } else {
    const err = new ApiError(response.status, response.data)
    throw err
  }
}

export const authHeader = (token) => ({ 'Authorization': `Token ${token}` })
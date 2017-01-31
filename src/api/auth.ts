
/**
 * 
 * Login to the api
 * 
 */

interface LoginRes {
  jwt?: string
  successful?: boolean
  errors?: string[]
}

// TODO: Change this to an actual API call
export const login = (email: string, password: string): Promise<LoginRes> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({
        jwt: 'valid.token.jwt',
        successful: true
      })
    }, 500)
  })
}


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

export const login = (email: string, password: string): Promise<LoginRes> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({
        jwt: 'asdfwfdsaf',
        successful: true
      })
    }, 500)
  })
}

import { AxiosError } from "axios"

export interface Error {
    is_successful: string
    error_code: string
    error_msg: string
    data: object
  }
  
export const responseError = (error: AxiosError) => {
    return {
        is_successful: error?.response.data['is_successful'],
        error_code: error?.response.data['error_code'],
        error_msg:  error?.response.data['error_msg'],
        data: error?.response?.data['response']
    } as Error
};
  
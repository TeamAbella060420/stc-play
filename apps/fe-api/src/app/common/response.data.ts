import { AxiosResponse } from "axios"

export interface Response {
    is_successful: string
    error_code: string
    error_msg: string
    data: object
  }
  
export const responseData = (response: AxiosResponse) => {
    return {
        is_successful: response['is_successful'],
        error_code: response['error_code'],
        error_msg:  response['error_msg'],
        data: response['response']
    } as Response
};
  
export type FormErrorModel = {
    email?: string,
    username?: string,
    password?: string,
    mobile?: string,
    reference_code?: string
}

export const clearErrorForm = () => {
    return {
        email: '',
        username: '',
        password: '',
        mobile: '',
        reference_code: ''
    }
}
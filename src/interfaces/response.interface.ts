import { UserInterface } from './user.interface';

export interface ResponseInterface {
    status: number,
    message: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any
}


export interface loginRespInterface {
    status: number,
    message?: string,
    data?: dataLogin
}

interface dataLogin {
    user: UserInterface,
    token: string
}
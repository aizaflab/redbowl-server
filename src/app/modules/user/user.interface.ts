export type TUser = {
    name: string,
    email: string,
    password: string,
    profileImage?: string,
    role: 'admin' | 'user',
    isBlocked: boolean,
}

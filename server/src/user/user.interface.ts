interface UserInfo {
    email: string;
    nickname: string;
    name: string;
}

export interface User extends UserInfo {
    id: string;
}

export interface UserToken extends UserInfo {
    sub: string;
}

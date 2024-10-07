export interface LoginPayload {
    email: string | undefined;
    password: string | undefined;
}

export interface RegisterPayload {
    completName: string | undefined;
    email: string | undefined;
    password: string | undefined;
}
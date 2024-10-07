import { LoginPayload, RegisterPayload } from "./auth";

export interface UserProps {
    id: string;
    completName: string;
    email: string;
}

export interface UserContextProps {
    user: UserProps | undefined;
    loading: boolean;
    token: string | null;
    login: (reqData: LoginPayload) => Promise<void>;
    register: (reqData: RegisterPayload) => Promise<void>;
    logout: () => Promise<void>;
  }
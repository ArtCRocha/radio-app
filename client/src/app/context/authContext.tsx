import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContextProps } from "../types/user";
import api from "../services/api";
import { LoginPayload, RegisterPayload } from "../types/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../services/user";

const authContext = createContext<UserContextProps | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );

  const client = useQueryClient();

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      client.invalidateQueries(["user"]);
    }
  }, [token, client]);

  const user = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  async function login(reqData: LoginPayload) {
    const { data } = await api.post("auth/login", reqData);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  }

  async function register(reqData: RegisterPayload) {
    const { data } = await api.post("auth/register", reqData);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  }

  async function logout() {
    const { data } = await api.post("auth/logout");
    localStorage.removeItem("token");
    setToken(null);
    client.setQueryData(["user"], null);
    return data.message;
  }

  return (
    <authContext.Provider
      value={{
        user: user?.data,
        loading: user?.isLoading,
        token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

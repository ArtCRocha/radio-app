"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import Button from "../components/button";

export default function Login() {
  const [completName, setCompleteName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [formType, setFormType] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { login, register, token } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const reqData = { email, password };
    if (formType === 0) {
      login(reqData).then(
        () => {
          setLoading(false);
          router.push("/");
        },
        () => {
          setLoading(false);
          console.log("Error");
        }
      );
    } else {
      register({ ...reqData, completName }).then(
        () => {
          router.push("/");
        },
        () => {
          console.log("Error");
        }
      );
    }
  }

  return (
    <div className="flex-1 h-[100vh] bg-white flex items-center justify-center p-5">
      <form
        onSubmit={handleSubmit}
        className="w-96 px-10 py-20 border border-gray-200 rounded-md flex flex-col items-center justify-center gap-5"
      >
        <p className="text-black text-4xl font-medium mb-5">
          {formType === 0 ? "Login" : "Registre-se"}
        </p>
        {formType === 1 && (
          <input
            name="completName"
            value={completName}
            onChange={(e) => setCompleteName(e.target.value)}
            placeholder="Nome completo"
            className={`w-full p-2 border border-gray-300 rounded-md outline-none text-black`}
          />
        )}
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={`w-full p-2 border border-gray-300 rounded-md outline-none text-black`}
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className={`w-full p-2 border border-gray-300 rounded-md outline-none text-black`}
        />

        <Button type="submit" isLoading={loading}>
          {formType === 0 ? "Login" : "Registre-se"}
        </Button>
        {formType === 0 ? (
          <p className="text-black">
            É novo aqui?{" "}
            <span
              onClick={() => setFormType(1)}
              className="text-[#1267fc] cursor-pointer"
            >
              Registre-se
            </span>
          </p>
        ) : (
          <p className="text-black">
            Já tem cadastro?{" "}
            <span
              onClick={() => setFormType(0)}
              className="text-[#1267fc] cursor-pointer"
            >
              Faça login
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

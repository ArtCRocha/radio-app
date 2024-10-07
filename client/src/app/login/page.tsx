"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import Button from "../components/button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface MyFormValues {
  email: string;
  password: string;
  completName?: string;
}

export default function Login() {
  const [formType, setFormType] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { login, register, token } = useAuth();

  const initialValues: MyFormValues = {
    email: "",
    password: "",
    completName: "",
  };

  const validationSchema = Yup.object().shape({
    completName: Yup.string().test(
      "global-ok",
      "Obrigatório informar o nome completo",
      () => {
        if (formType === 1) return false;
        return true;
      }
    ),
    email: Yup.string().required("Obrigatório informar o email"),
    password: Yup.string().required("Obrigatório informar a senha"),
  });

  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  async function handleSubmit(values: MyFormValues) {
    setLoading(true);
    const reqData = { email: values.email, password: values.password };
    if (formType === 0) {
      try {
        await login(reqData);
        router.push("/");
      } catch (error) {
        console.log("Error during login");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await register({ ...reqData, completName: values.completName });
        router.push("/");
      } catch (error) {
        console.log("Error during registration");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="flex-1 h-[100vh] bg-white flex items-center justify-center p-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="w-96 px-10 py-20 border border-gray-200 rounded-md flex flex-col items-center justify-center gap-5">
            <p className="text-black text-4xl font-medium mb-5">
              {formType === 0 ? "Login" : "Registre-se"}
            </p>
            {formType === 1 && (
              <div className="w-full">
                <Field
                  id="completName"
                  name="completName"
                  placeholder="Nome completo"
                  type="text"
                  className={`w-full p-2 border border-gray-300 rounded-md outline-none text-black`}
                />
                <ErrorMessage
                  name="completName"
                  component="p"
                  className={`text-red-500 text-sm`}
                />
              </div>
            )}
            <div className="w-full">
              <Field
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                className={`w-full p-2 border border-gray-300 rounded-md outline-none text-black`}
              />
              <ErrorMessage
                name="email"
                component="p"
                className={`text-red-500 text-sm`}
              />
            </div>
            <div className="w-full">
              <Field
                id="password"
                name="password"
                placeholder="Senha"
                type="password"
                className={`w-full p-2 border border-gray-300 rounded-md outline-none text-black`}
              />
              <ErrorMessage
                name="password"
                component="p"
                className={`text-red-500 text-sm`}
              />
            </div>

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
          </Form>
        )}
      </Formik>
    </div>
  );
}

"use client";

import { useState } from "react";
import Button from "../components/button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { StationEditProps } from "../types/station";
import { updateStation } from "../services/station";
import { useQueryClient } from "@tanstack/react-query";

export default function FormEditStation({
  stationData,
  stationId,
  onClose,
}: {
  stationData: StationEditProps;
  stationId: string;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const client = useQueryClient();

  async function handleSubmit(values: StationEditProps) {
    const { name, country, state, countryCode, language } = values;
    setLoading(true);
    const reqData = { name, country, state, countryCode, language };
    updateStation(stationId, reqData).then(
      () => {
        client.invalidateQueries(["stationsByUserId"]);
        onClose();
      },
      () => {}
    );
  }

  return (
    <Formik initialValues={stationData} onSubmit={handleSubmit}>
      {() => (
        <Form className="w-full flex flex-col gap-5 p-10">
          <p className="text-black text-4xl font-medium mb-5">Editar rádio</p>
          <div className="w-full">
            <Field
              id="name"
              name="name"
              placeholder="Nome"
              type="text"
              className={`w-full p-2 border border-gray-300 rounded-md outline-none text-black`}
            />
            <ErrorMessage
              name="name"
              component="p"
              className={`text-red-500 text-sm`}
            />
          </div>
          <div className="w-full">
            <Field
              id="country"
              name="country"
              placeholder="País"
              type="text"
              className={`w-full p-2 border border-gray-300 rounded-md outline-none text-black`}
            />
            <ErrorMessage
              name="country"
              component="p"
              className={`text-red-500 text-sm`}
            />
          </div>
          <div className="w-full">
            <Field
              id="countryCode"
              name="countryCode"
              placeholder="Código do País"
              type="text"
              className={`w-full p-2 border border-gray-300 rounded-md outline-none text-black`}
            />
            <ErrorMessage
              name="countryCode"
              component="p"
              className={`text-red-500 text-sm`}
            />
          </div>
          <div className="w-full">
            <Field
              id="state"
              name="state"
              placeholder="Estado"
              type="text"
              className={`w-full p-2 border border-gray-300 rounded-md outline-none text-black`}
            />
            <ErrorMessage
              name="state"
              component="p"
              className={`text-red-500 text-sm`}
            />
          </div>
          <div>
            <Field
              id="language"
              name="language"
              placeholder="Linguagem"
              type="text"
              className={`w-full p-2 border border-gray-300 rounded-md outline-none text-black`}
            />
            <ErrorMessage
              name="language"
              component="p"
              className={`text-red-500 text-sm`}
            />
          </div>
          <Button type="submit" isLoading={loading}>
            Editar
          </Button>
        </Form>
      )}
    </Formik>
  );
}

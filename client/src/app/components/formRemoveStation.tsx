"use client";

import { useState } from "react";
import Button from "../components/button";
import { Formik, Form } from "formik";
import { deleteStation } from "../services/station";
import { useQueryClient } from "@tanstack/react-query";

export default function FormDeleteStation({
  stationName,
  stationId,
  onClose,
}: {
  stationName: string;
  stationId: string;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const client = useQueryClient();

  async function handleSubmit() {
    setLoading(true);
    deleteStation(stationId).then(
      () => {
        client.invalidateQueries(["stationsByUserId"]);
        onClose();
      },
      () => {}
    );
  }

  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      {() => (
        <Form className="w-full flex flex-col gap-5 p-10">
          <p className="text-black text-4xl font-medium mb-5">Deletar rádio</p>
          <p>
            Tem certeza que deseja deletar a rádio {stationName} da sua lista?
          </p>
          <Button type="submit" isLoading={loading}>
            Deletar
          </Button>
        </Form>
      )}
    </Formik>
  );
}

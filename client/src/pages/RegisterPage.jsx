import React from "react";
import { Card } from "@material-tailwind/react";
import ManageAuthForm from "../forms/ManageAuthForm";
import { useToast } from "../contexts/ToastProvider";
import { useMutation } from "react-query";
import * as ApiClient from "../../api-client.js";

export default function RegisterPage() {
  const { addToast } = useToast();

  const { mutate, isLoading } = useMutation(ApiClient.register, {
    onSuccess: () => {
      addToast("User successfully created", "success");
    },
    onError: (e) => {
      addToast(e.response?.data?.message || "Something went wrong", "error");
    },
  });

  const handleSave = (formData) => {
    console.log("FormData submitted:", formData);

    mutate(formData);
  };

  return (
    <Card className="p-6 max-w-lg mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register User</h2>
      <ManageAuthForm onSave={handleSave} isLoading={isLoading} />
    </Card>
  );
}

import React from "react";
import ManageAuthForm from "../forms/ManageAuthForm";
import { Card } from "@material-tailwind/react";
import { useMutation } from "react-query";
import * as ApiClient from "../../api-client.js";
import { useToast } from "../contexts/ToastProvider.jsx";
export default function LoginPage() {
  const { addToast } = useToast();
  const { mutate, isLoading } = useMutation(ApiClient.login, {
    onSuccess: () => {
      addToast("Successfully sign in ", "sucess");
    },
    onError: () => {
      addToast("Something went wrong", "error");
    },
  });
  const onSubmit = (formData) => {
    console.log(formData);
    mutate(formData);
  };
  return (
    <Card>
      <ManageAuthForm login={true} onSave={onSubmit} isLoading={isLoading} />
    </Card>
  );
}

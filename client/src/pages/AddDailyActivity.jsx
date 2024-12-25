import React from "react";
import ManageDailyActivityForm from "../forms/ManageDailyActivityForm";
import { Card, Typography } from "@material-tailwind/react";
import { useMutation } from "react-query";
import * as ApiClient from "../../api-client.js";
import { useToast } from "../contexts/ToastProvider.jsx";
export default function AddDailyActivity({ day, week }) {
  const { addToast } = useToast();
  useMutation(ApiClient.addDailyEvent, {
    onSuccess: () => {},
    onError: () => {},
  });
  return (
    <Card>
      <Typography varient="h5">Add Activity</Typography>
      <ManageDailyActivityForm day={day} week={week} />
    </Card>
  );
}

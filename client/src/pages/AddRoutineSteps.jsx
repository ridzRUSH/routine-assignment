import { Card, Typography } from "@material-tailwind/react";
import React from "react";
import ManageRoutineStepForm from "../forms/ManageRoutineStepsFoem";
import SevenDays from "../components/SevenDays";
import * as ApiClient from "../../api-client.js";
import { useMutation } from "react-query";

export default function AddRoutineSteps({ week, routineId, setRoutineId }) {
  useMutation(ApiClient);
  return (
    <Card className="p-2">
      <Typography variant="h5">Add Routine Steps for week {week}</Typography>
      <ManageRoutineStepForm onSave={onSubmit} onLoading={onLoading} />
      <SevenDays
        week={week}
        routineId={routineId}
        setRoutineId={setRoutineId}
      />
    </Card>
  );
}

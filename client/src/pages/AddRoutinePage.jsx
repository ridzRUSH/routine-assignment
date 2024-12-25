import React from "react";
import RoutineWizard from "./RoutineWizard";
import { Card, Typography } from "@material-tailwind/react";

export default function AddRoutinePage() {
  return (
    <Card>
      <div className="flex justify-center">
        <Typography variant="h2">Add Routine</Typography>
      </div>
      <RoutineWizard />
    </Card>
  );
}

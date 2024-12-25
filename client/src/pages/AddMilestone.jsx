import { Card, Typography } from "@material-tailwind/react";
import React from "react";
import ManageRoutineMilestoneForm from "../forms/ManageRoutineMilestoneForm";

export default function AddMilestone() {
  return (
    <Card className="bg-light-green-200 h-full p-2">
      <Typography variant="h4" color="green" aria-atomic>
        Add MileStone
      </Typography>

      <ManageRoutineMilestoneForm />
    </Card>
  );
}

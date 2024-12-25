import {
  Button,
  Card,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import React, { useState } from "react";
import AddDailyActivity from "../pages/AddDailyActivity";
import { useToast } from "../contexts/ToastProvider";

export default function SevenDays({ week, routineId, setRoutineId }) {
  const { addToast } = useToast();
  // State to manage the visibility of the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayDetails, setDayDetails] = useState(""); // Stores the specific details for the day

  // Function to open the dialog and set the day
  const handleOpenDialog = (day) => {
    if (!routineId) {
      addToast("please submit routine step first", "info");
    }
    setSelectedDay(day);
    setIsDialogOpen(true);
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Function to handle saving the day details
  const handleSaveDetails = () => {
    if (selectedDay !== null) {
      // You can handle saving the details here (e.g., API call or state update)
      console.log(`Details for day ${selectedDay + 1}: ${dayDetails}`);
      handleCloseDialog();
    }
  };

  return (
    <Card className="mt-6">
      <div className="flex justify-center">
        <Typography variant="h5">Add specific details to days</Typography>
      </div>
      <Card className="grid grid-cols-4 md:grid-cols-7 ">
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            className="w-12 h-12 flex items-center justify-center text-white rounded-md"
          >
            <Button
              className="secondary"
              onClick={() => handleOpenDialog(i)} // Pass the day index on button click
            >
              {i + 1}
            </Button>
          </div>
        ))}
      </Card>

      {/* Dialog for adding details for each day */}
      <Dialog open={isDialogOpen} size="md" handler={handleCloseDialog}>
        <DialogHeader>
          Week {week} , day {selectedDay + 1} details{" "}
        </DialogHeader>
        <DialogBody>
          <AddDailyActivity day={selectedDay + 1} week={week} />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCloseDialog}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSaveDetails}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}

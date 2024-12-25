import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react"; // Make sure to import these components
import { useAppContext } from "../contexts/AppContext";

export default function Dialogue({ children, title }) {
  const { isDialogOpen, toggleDialog } = useAppContext();
  const handleOpen = () => {
    toggleDialog;
  };

  return (
    <div>
      <Button onClick={handleOpen} color="blue">
        Open Dialog
      </Button>

      <Dialog open={isDialogOpen} size="md" handler={handleOpen}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter>
          {/* Cancel button */}
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen()}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {/* Confirm button */}
          <Button variant="gradient" color="green" onClick={() => handleOpen()}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

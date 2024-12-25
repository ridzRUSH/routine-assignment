import React, { useState, useCallback } from "react";
import { Card, Button, ButtonGroup } from "@material-tailwind/react";
import Stepper from "../components/Stepper";
import AddRoutineForm from "../forms/ManageRoutineForm";
import AddRoutineSteps from "./AddRoutineSteps";
import SearchProduct from "./SearchProduct";
import DrawerLeft from "../components/DrawerLeft";
import AddMilestone from "./AddMilestone";
import { useMutation } from "react-query";

export default function FormWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState(6);
  const [openProductDrawer, setOpenProductDrawer] = useState(false);
  const [openMilestoneDrawer, setOpenMilestoneDrawer] = useState(false);

  const { isLoading, mutate } = useMutation();

  // Initialize routineId as an array of nulls with the length equal to steps
  const [routineId, setRoutineId] = useState(new Array(steps).fill(null));

  const onSubmit = () => {};

  // Function to update a specific routineId at an index
  const updateRoutineId = (index, id) => {
    setRoutineId((prev) => {
      const updated = [...prev];
      updated[index] = id; // Update the specific index
      return updated;
    });
  };

  // Generate form components
  const formComponents = useCallback(() => {
    const components = [
      <AddRoutineForm
        key="routine-form"
        onSave={onSubmit}
        isLoading={isLoading}
      />,
    ];
    for (let i = 0; i < steps; i++) {
      components.push(
        <AddRoutineSteps
          key={`week-${i}`}
          week={i + 1}
          routineId={routineId[i]}
          setRoutineId={(id) => updateRoutineId(i, id)}
        />
      );
    }
    return components;
  }, [steps, routineId]);

  return (
    <Card className="flex flex-col gap-2 lg:flex-row lg:justify-between">
      {/* Drawer for Add Product on Small/Medium Screens */}
      <DrawerLeft
        openLeft={openProductDrawer}
        setOpenLeft={setOpenProductDrawer}
      >
        <SearchProduct />
      </DrawerLeft>

      {/* Drawer for Add Milestone on Small/Medium Screens */}
      <DrawerLeft
        openLeft={openMilestoneDrawer}
        setOpenLeft={setOpenMilestoneDrawer}
      >
        <AddMilestone />
      </DrawerLeft>

      {/* Left Sidebar for Large Screens */}
      <Card className="hidden w-[25%] lg:block">
        <SearchProduct />
      </Card>

      {/* Main Content */}
      <Card className="flex-grow w-full lg:w-[50%]">
        <Stepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps + 1}
        >
          {/* Buttons */}
          <ButtonGroup className="mb-4 flex justify-between">
            {/* Open Product Drawer Button for Small/Medium Screens */}
            <Button
              className="lg:hidden bg-blue-500 text-white"
              onClick={() => setOpenProductDrawer(true)}
            >
              Add Product
            </Button>

            {/* Open Milestone Drawer Button for Small/Medium Screens */}
            <Button
              className="lg:hidden bg-green-500 text-white"
              onClick={() => setOpenMilestoneDrawer(true)}
            >
              Add Milestone
            </Button>
          </ButtonGroup>

          {/* Render the Active Step */}
          <div>{formComponents()[activeStep]}</div>
        </Stepper>
      </Card>

      {/* Right Sidebar for Large Screens */}
      <Card className="hidden w-[25%]  lg:block">
        <AddMilestone />
      </Card>
    </Card>
  );
}

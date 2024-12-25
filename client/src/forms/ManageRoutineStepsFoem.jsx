import { Input, Textarea, Typography, Button } from "@material-tailwind/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function ManageRoutineStepForm({ step, onSave, isLoading }) {
  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = formMethods;

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mt-8"
      >
        <Input
          variant="outlined"
          label="Step Number"
          type="number"
          {...register("step_number", { required: "Step number is required" })}
        />
        {errors.step_number && (
          <Typography variant="small" color="red">
            {errors.step_number.message}
          </Typography>
        )}

        <Textarea
          variant="outlined"
          label="Action"
          {...register("action", { required: "Action is required" })}
        />
        {errors.action && (
          <Typography variant="small" color="red">
            {errors.action.message}
          </Typography>
        )}

        <Textarea
          variant="outlined"
          label="Optional Tips"
          {...register("optional_tips")}
        />

        <Button type="submit" disabled={isLoading}>
          Save
        </Button>
      </form>
    </FormProvider>
  );
}

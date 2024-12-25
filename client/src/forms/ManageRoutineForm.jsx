import { Input, Textarea, Typography, Button } from "@material-tailwind/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function ManageRoutineForm({ routine, onSave, isLoading }) {
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
        className="flex flex-col gap-2 mt-8 p-4"
      >
        <Input
          variant="outlined"
          label="Routine Name"
          placeholder="name of routine"
          {...register("name", { required: "Routine name is required" })}
        />
        {errors.name && (
          <Typography variant="small" color="red">
            {errors.name.message}
          </Typography>
        )}

        <Textarea
          variant="outlined"
          label="Description"
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && (
          <Typography variant="small" color="red">
            {errors.description.message}
          </Typography>
        )}

        <Input
          variant="outlined"
          label="Duration (weeks)"
          type="number"
          {...register("duration_weeks", { required: "Duration is required" })}
        />
        {errors.duration_weeks && (
          <Typography variant="small" color="red">
            {errors.duration_weeks.message}
          </Typography>
        )}

        <Button type="submit" disabled={isLoading}>
          Save
        </Button>
      </form>
    </FormProvider>
  );
}

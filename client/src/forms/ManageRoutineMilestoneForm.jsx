import { Input, Textarea, Typography, Button } from "@material-tailwind/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function ManageRoutineMilestoneForm({
  milestone,
  onSave,
  isLoading,
}) {
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
          label="Week Number"
          type="number"
          {...register("week_number", { required: "Week number is required" })}
        />
        {errors.week_number && (
          <Typography variant="small" color="red">
            {errors.week_number.message}
          </Typography>
        )}

        <Input
          variant="outlined"
          label="Benefit"
          placeholder="Benefit of milestone"
          {...register("benefit", { required: "Benefit is required" })}
        />
        {errors.benefit && (
          <Typography variant="small" color="red">
            {errors.benefit.message}
          </Typography>
        )}

        <Button type="submit" disabled={isLoading}>
          Save
        </Button>
      </form>
    </FormProvider>
  );
}

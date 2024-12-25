import {
  Input,
  Typography,
  Switch,
  Button,
  Textarea,
} from "@material-tailwind/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function ManageDailyActivityForm({
  week,
  day,
  activity,
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
          defaultValue={week}
          type="outlined"
          label="week"
          placeholder="week no"
          {...register("week_number", { required: "week no is required !" })}
        />
        <Input
          defaultValue={day}
          type="outlined"
          label="day"
          placeholder="day no"
          {...register("day_number", { required: "day no is required !" })}
        />
        <Textarea
          type="outlined"
          label="Event"
          placeholder="Event"
          {...register("day_number", { required: "day no is required !" })}
        />

        <Button type="submit" disabled={isLoading}>
          Save
        </Button>
      </form>
    </FormProvider>
  );
}

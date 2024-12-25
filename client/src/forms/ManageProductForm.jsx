import {
  Input,
  Textarea,
  Typography,
  Select,
  Option,
  Button,
  IconButton,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { XIcon } from "@heroicons/react/outline";

export default function ManageProductForm({ product, onSave, isLoading }) {
  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { errors },
    reset,
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
          label="Product Name"
          placeholder="name of product"
          {...register("name", { required: "Product name is required" })}
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

        <Select
          variant="outlined"
          label="Select Product Type"
          {...register("type", { required: "Type of product is required" })}
        >
          <Option>Skin Care Product</Option>
          <Option>Hair Care Product</Option>
          <Option>Lifestyle Product</Option>
          <Option>Luxury Product</Option>
        </Select>
        {errors.type && (
          <Typography variant="small" color="red">
            {errors.type.message}
          </Typography>
        )}

        <Button type="submit" disabled={isLoading}>
          Save
        </Button>
      </form>
    </FormProvider>
  );
}

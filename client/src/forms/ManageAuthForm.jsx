import {
  Typography,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

export default function ManageAuthForm({
  onSave,
  login = false,
  authData,
  isLoading,
}) {
  const formMethods = useForm({
    defaultValues: authData || {
      name: "",
      email: "",
      password: "",
      role: "user", // Set default role to 'user'
    },
  });

  console.log(onSave, authData, login);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = formMethods;

  const onSubmit = handleSubmit(function (formDataJson) {
    if (onSave) {
      onSave(formDataJson);
    } else {
      console.error("onSave is not defined");
    }
  });

  return (
    <FormProvider {...formMethods}>
      <div className="flex justify-center h-full">
        <Typography variant="h2">{login ? "Login" : "Sign Up"}</Typography>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
        {!login && (
          <div>
            <Input
              variant="outlined"
              label="Username"
              placeholder="Enter username"
              {...register("name", {
                required: "Username field is required!",
              })}
            />
            {errors.name && (
              <Typography variant="small" color="red">
                {errors.name.message}
              </Typography>
            )}
          </div>
        )}

        <div>
          <Input
            type="email"
            variant="outlined"
            label="Email"
            placeholder="Enter email"
            {...register("email", {
              required: "Email field is required!",
            })}
          />
          {errors.email && (
            <Typography variant="small" color="red">
              {errors.email.message}
            </Typography>
          )}
        </div>

        <div>
          <Input
            type="password"
            variant="outlined"
            label="Password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password field is required!",
            })}
          />
          {errors.password && (
            <Typography variant="small" color="red">
              {errors.password.message}
            </Typography>
          )}
        </div>

        {!login && (
          <div>
            <Select
              variant="outlined"
              label="Select User Type"
              onChange={(e) => setValue("role", e.target.value)} // Corrected value update
              defaultValue="user"
              {...register("role")} // Register the 'role' field properly
            >
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
            {errors.role && (
              <Typography variant="small" color="red">
                {errors.role.message}
              </Typography>
            )}
          </div>
        )}

        <Button type="submit" color="green" disabled={isLoading}>
          {login ? "Login" : "Register"}
        </Button>
      </form>
    </FormProvider>
  );
}

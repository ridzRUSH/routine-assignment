import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import ManageProductForm from "../forms/ManageProductForm";
import * as ApiClient from "../../api-client.js";
import { useMutation } from "react-query";
export default function AddProduct() {
  useMutation(ApiClient);
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-8 w-full max-w-lg shadow-sm">
        <div className="flex justify-center">
          <Typography variant="h2" color="blue">
            Add Product
          </Typography>
        </div>
        <ManageProductForm />
      </Card>
    </div>
  );
}

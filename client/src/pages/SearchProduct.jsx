import { Card, Typography, Input } from "@material-tailwind/react";
import React from "react";

export default function SearchProduct() {
  return (
    <Card className="bg-blue-gray-100 h-full p-2 ">
      <Typography variant="h4" color="blue" aria-atomic>
        Search Product
      </Typography>

      <Input label="Input With Icon" icon={<i className="fas fa-heart" />} />
    </Card>
  );
}

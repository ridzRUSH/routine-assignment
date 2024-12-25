import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useQuery } from "react-query";

import * as ApiClient from "../../api-client.js";

export default function HomePage() {
  const {
    data: routines,
    isLoading,
    isError,
  } = useQuery("routines", ApiClient.fetchRoutines, {
    onSuccess: () => {},
    onError: () => {},
  });

  if (isLoading) {
    return (
      <Typography className="text-center mt-10">Loading routines...</Typography>
    );
  }

  if (isError) {
    return (
      <Typography className="text-center mt-10 text-red-500">
        Failed to load routines
      </Typography>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Featured Routine Section */}
      {routines.length > 0 && (
        <div className="relative bg-gradient-to-r from-teal-500 to-green-600 text-white p-8">
          <div className="max-w-6xl mx-auto text-center">
            <Typography
              variant="h2"
              className="font-bold text-3xl sm:text-5xl mb-4"
            >
              {routines[0].name}
            </Typography>
            <Typography className="text-lg sm:text-xl mb-6">
              {routines[0].description}
            </Typography>
            <Button
              className="bg-white text-teal-600 hover:bg-teal-100"
              size="lg"
            >
              View Routine
            </Button>
          </div>
        </div>
      )}

      {/* Routine Cards Section */}
      <div className="max-w-6xl mx-auto py-8">
        <Typography
          variant="h3"
          className="text-center font-bold text-2xl sm:text-3xl mb-6"
        >
          Explore Routines
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {routines.slice(1).map((routine) => (
            <Card key={routine.routine_id} className="shadow-lg">
              <CardHeader className="h-40 overflow-hidden">
                <img
                  src={routine.image || "https://via.placeholder.com/150"}
                  alt={routine.name}
                  className="object-cover w-full h-full"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" className="font-semibold">
                  {routine.name}
                </Typography>
                <Typography className="text-sm text-gray-700">
                  {routine.description.slice(0, 100)}...
                </Typography>
              </CardBody>
              <CardFooter className="text-center">
                <Button className="bg-teal-500 text-white hover:bg-teal-600">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

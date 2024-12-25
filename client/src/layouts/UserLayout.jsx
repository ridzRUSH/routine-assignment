import { Card } from "@material-tailwind/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NabBar";

export default function UserLayout() {
  return (
    <main className="p-2">
      <nav>
        <NavBar />
      </nav>
      <div className="mx-auto max-w-screen-md py-2 md:py-4 lg:py-8">
        <Card className="mb-12 overflow-hidden">
          <article>
            <Outlet />
          </article>
        </Card>
      </div>
    </main>
  );
}

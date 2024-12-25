import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NabBar";
import { Card } from "@material-tailwind/react";
import { AdminFormContextProvider } from "../contexts/AdminFormContext";

export default function AdminLayout() {
  return (
    <main className="p-2">
      <nav>
        <NavBar />
      </nav>
      <div className="mx-auto  mt-12 ">
        <Card className="mb-12 overflow-hidden">
          <article>
            <AdminFormContextProvider>
              <Outlet />
            </AdminFormContextProvider>
          </article>
        </Card>
      </div>
    </main>
  );
}

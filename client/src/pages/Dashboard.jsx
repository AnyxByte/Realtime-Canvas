import React from "react";
import { Sidebar } from "../components/Sidebar";

export const Dashboard = () => {
  return (
    <div className="flex gap-4">
      <Sidebar />

      <div>Dashboard</div>
    </div>
  );
};

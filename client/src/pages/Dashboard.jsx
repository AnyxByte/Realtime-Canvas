import React from "react";
import { Sidebar } from "../components/Sidebar";
import { MainDashboard } from "../components/MainDashboard";

export const Dashboard = () => {

  return (
    <div className="flex gap-4">
      <Sidebar />

      <div>
        <MainDashboard />
      </div>
    </div>
  );
};

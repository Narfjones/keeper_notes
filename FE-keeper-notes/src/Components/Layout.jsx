import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

/**Everything that I want to display on all pages is rendered in the Layout component and I used Outlet to show where the rest of the components should render */

export default function Layout() {
  return (
    <div className="site-wrapper">
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

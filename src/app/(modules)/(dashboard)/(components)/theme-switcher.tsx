"use client";

import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { useContext } from "react";

export default function ThemeSwitcher() {
  const { changeTheme } = useContext(PrimeReactContext);

  return (
    <div className="fixed bottom-0 right-0 p-4">
      <Button
        onClick={() => {
          if (!changeTheme) return;
          changeTheme("primereact/resources/themes/lara-light-blue/theme.css", "primereact/resources/themes/lara-light-blue/theme.css", "theme-link");
        }}
      >
        Toggle
      </Button>
    </div>
  );
}
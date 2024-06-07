"use client";

import { Sun } from "lucide-react";
import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";

export default function ChangeThemeButton() {
  const { changeTheme } = useContext(PrimeReactContext);
  const [theme, setTheme] = useState("lara-light-blue");

  useEffect(() => {
    const linkId = document.getElementById("theme-css");
    const themeImport = linkId?.getAttribute("href");

    if (themeImport) {
      setTheme(themeImport);
    }
  }, []);

  if (!changeTheme) return null;

  return (
    <Button
      onClick={() => {
        const linkId = document.getElementById("theme-css");
        const themeImport = linkId?.getAttribute("href");
        if (themeImport?.includes("lara-light-blue")) {
          changeTheme("/themes/lara-light-blue/theme.css", "/themes/lara-dark-blue/theme.css", "theme-css");
          setTheme("/themes/lara-dark-blue/theme.css");
          return;
        } else {
          changeTheme("/themes/lara-dark-blue/theme.css", "/themes/lara-light-blue/theme.css", "theme-css");
          setTheme("/themes/lara-light-blue/theme.css");
          return;
        }
      }}
    >
      {theme?.includes("lara-light-blue") ? <Sun /> : <i className="pi pi-moon"></i>}
    </Button>
  );
}

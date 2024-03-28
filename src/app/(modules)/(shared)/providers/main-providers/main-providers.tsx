"use client";
import { ReactNode } from "react";

import { PrimeReactProvider } from "primereact/api";
import { SessionProvider } from "next-auth/react";

import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from "primereact/api";

import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function MainProviders({ children }: { children: ReactNode }) {
  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    today: "Hoy",
    clear: "Limpiar",
    passwordPrompt: "Introduzca una contraseña",
    medium: "Medio",
    weak: "Débil",
    strong: "Fuerte",
  });

  return (
    <SessionProvider session={null}>
      <PrimeReactProvider
        value={{
          ripple: true,
          locale: "es",
        }}
      >
        {children}
      </PrimeReactProvider>
    </SessionProvider>
  );
}

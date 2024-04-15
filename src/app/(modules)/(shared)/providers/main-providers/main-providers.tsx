"use client";
import { ReactNode, Suspense } from "react";

import { PrimeReactProvider } from "primereact/api";
import { SessionProvider } from "next-auth/react";

import { addLocale } from "primereact/api";

// import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/themes/lara-dark-blue/theme.css";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React from "react";
import { ToastContextProvider } from "../toast-provider/toast-provider";
import { NavigationEvents } from "../../components/navigation-events";

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
          pt: {
            overlaypanel: {
              content: {
                className: "!p-0",
              },
            },
            paginator: {
              RPPDropdown: {
                wrapper: {
                  className: "scrollbar-thin",
                },
              },
            },
            datatable: {
              wrapper: {
                className: "scrollbar-thin h-[calc(100vh-33vh)]",
              },
              bodyRow: {
                className: "!p-0",
              },
            },
          },
        }}
      >
        <ToastContextProvider>
          {children}
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </ToastContextProvider>
      </PrimeReactProvider>
    </SessionProvider>
  );
}

"use client";
import { ReactNode, Suspense, useEffect, useState } from "react";

import { PrimeReactProvider } from "primereact/api";
import { SessionProvider } from "next-auth/react";

import { addLocale } from "primereact/api";

import React from "react";
import { ToastContextProvider } from "../toast-provider/toast-provider";
import { NavigationEvents } from "../../(components)/navigation-events";
import RememberMe from "../../(components)/handle-remember-me";

export default function MainProviders({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <SessionProvider session={null}>
      <PrimeReactProvider
        value={{
          ptOptions: {},
          ripple: true,
          locale: "es",
          pt: {
            inputtext: {},
            dialog: {
              root: {
                style: {
                  width: "90%",
                },
              },
            },
            overlaypanel: {
              content: {
                className: "!p-0",
              },
            },
            paginator: {
              current: {
                className: "mt-auto",
              },
              RPPDropdown: {
                wrapper: {
                  className: "scrollbar-thin",
                },
              },
            },
            datatable: {
              root: {
                className: "!min-h-full lg:max-h-full rounded-lg flex flex-col gap-y-4 p-datatable-striped",
              },
              paginator: {
                root: {
                  className: "mt-auto",
                },
              },
              column: {
                headerCell: {
                  className: "font-extrabold",
                },
              },
              wrapper: {
                className: "scrollbar-thin rounded-lg",
              },
              bodyRow: {
                className: "!p-0 cursor-pointer hover:bg-highlight",
              },
              header: {
                className: "!mb-0 rounded-lg !p-4",
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
          <Suspense fallback={null}>
            <RememberMe />
          </Suspense>
        </ToastContextProvider>
      </PrimeReactProvider>
    </SessionProvider>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import PassWordToolTip from "../../(components)/password-tooltip";

export default function SignInPage() {
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <main className="flex items-center justify-center w-full h-screen max-h-screen px-3 sm:px-5">
      <div className="overflow-auto w-full h-[80%] flex justify-center">
        <div className="p-4 shadow-2xl bg-surface-card rounded-lg min-w-[250px] max-w-[550px] h-full w-full flex flex-col gap-y-8 overflow-auto">
          <div className="text-center gap-y-3 w-full flex flex-col justify-center items-center">
            <Image
              alt="login-logo"
              className="w-12 h-12"
              width={500}
              height={500}
              src={"https://blocks.primereact.org/demo/images/blocks/logos/hyper.svg"}
            ></Image>

            <div className="text-4xl font-bold">Bienvenido de vuelta</div>
            <div>
              <span className="font-medium line-height-3">Aun no tienes una cuenta?</span>
              <Link href={"/auth/register"} className="font-medium ml-2 text-blue-500 cursor-pointer">
                Registrate ahora
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-y-8 mx-auto w-full">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <span className="p-float-label">
                <InputText id="loginCredential" placeholder="Usuario o correo electrónico" />
                <label htmlFor="loginCredential">Usuario o correo electrónico</label>
              </span>
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <span className="p-float-label">
                <Password
                  footer={PassWordToolTip}
                  toggleMask
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  inputId="password"
                  placeholder="Contraseña"
                />
                <label htmlFor="password">Contraseña</label>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <Checkbox id="rememberme" onChange={(e) => setChecked(e.checked as boolean)} checked={checked} />
                <label htmlFor="rememberme">
                  <span>Recuerdame</span>
                </label>
              </div>
              <Link href={"/auth/forgot-password"} className="font-medium text-blue-500 text-right cursor-pointer">
                Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <Button label="Iniciar sesión" icon="pi pi-user" className="w-full" />
        </div>
      </div>
    </main>
  );
}

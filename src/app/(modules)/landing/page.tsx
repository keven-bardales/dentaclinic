"use client";
import NavBar from "./components/navbar";
import Image from "next/image";
import main_section_image from "@/root/public/landing/items/main_section_image_2.png";
import { cn } from "@/lib/utils/cn";
import { Home, Lightbulb, LocateIcon, Mail, Sun, Zap } from "lucide-react";
import LandingButton from "./components/landing-button";
import blueLogo from "@/root/public/landing/logos/logo-oficial-azul.png";
import yellowLogo from "@/root/public/landing/logos/logo-oficial-amarillo.png";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";

const mainSectionPadding = "py-20";

export default function LandingPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  return (
    <main className="bg-white w-full h-screen overflow-auto">
      <header className="w-full">
        <nav className="bg-landing-first-bg w-full h-full">
          <section className="flex gap-x-4 justify-between items-center container mx-auto py-2">
            {/* <Image className="w-24" src={blueLogo} height={100} width={100} alt="Ceisa-Logo" /> */}
            <Image className="w-24" src={yellowLogo} height={100} width={100} alt="Ceisa-Logo" />
            {/* <div className="flex flex-col justify-center">
              <Lightbulb className="text-landing-secondary-main rounded-lg mx-auto h-12 w-12" />
              <div className="flex items-center text-lg font-bold text-landing-secondary-main">
                <span>CE</span>
                <Zap className="text-landing-primary-main w-8 h-8 bg-transparent rounded-lg" />
                <span>SA</span>
              </div>
            </div> */}
            <NavBar className="flex gap-x-2 items-center justify-evenly"></NavBar>
          </section>
        </nav>
      </header>
      <section className={cn("!pt-24 !pb-32 bg-landing-first-bg relative", mainSectionPadding)}>
        <div className="container mx-auto flex flex-col gap-y-3">
          <h1 className="text-landing-secondary-main font-[900] text-5xl text-center max-w-[70%] mx-auto">
            Productos electricos de alta calidad para tus proyectos de construcción
          </h1>
          <p className="text-center text-2xl font-semibold text-landing-secondary-main">
            Contactanos y cotiza los productos electricos a los mejores precios del mercado
          </p>
          <div className="flex mx-auto justify-center gap-x-4 items-stretch">
            <Home className=" text-white h-[3.5rem] w-[3.5rem] bg-landing-secondary-main p-2 rounded-lg" />
            <LandingButton>COTIZA YA</LandingButton>
          </div>
        </div>
        <Image
          style={{
            filter: "drop-shadow(0 12px 12px rgba(0, 0, 0, 0.5)) drop-shadow(0 20px 20px rgba(0, 0, 0, 0.3))",
          }}
          className="mx-auto w-[43rem] absolute z-[50] left-0 right-0 top-[75%]"
          src={main_section_image}
          height={250}
          width={400}
          alt="Bombilla electrica"
        />
      </section>
      <section className={cn("!pt-[22rem] !pb-32 bg-landing-second-bg relative", mainSectionPadding)}>
        <div className="container mx-auto flex flex-col gap-y-6">
          <Sun className="text-landing-primary-main h-[3.5rem] w-[3.5rem] mx-auto font-bold" />
          <h2 className="text-landing-secondary-main font-[900] text-5xl text-center mx-auto max-w-[60%]">
            Servicio de calidad de una empresa con mas de 40 años de experiencia en el mercado de productos electricos
          </h2>
          <p className="text-center text-2xl font-semibold text-landing-secondary-main max-w-[60%] mx-auto">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat doloribus temporibus praesentium omnis. Quaerat obcaecati odio
            repellendus minima, distinctio deleniti sit expedita perferendis eveniet labore laudantium numquam minus amet odit! Dignissimos eveniet
            minus ipsum facere illum iste. Amet at enim sed fugiat dolor
          </p>
          <div className="flex justify-evenly items-center mx-auto font-semibold text-lg">
            <span className="text-landing-primary-main">Item 1</span>
            <span className="w-[0.2rem] h-[1.125rem] mx-2 bg-landing-primary-main"></span>
            <span className="text-landing-primary-main">Item 2</span>
            <span className="w-[0.2rem] h-[1.125rem] mx-2 bg-landing-primary-main"></span>
            <span className="text-landing-primary-main">Item 3</span>
            <span className="w-[0.2rem] h-[1.125rem] mx-2 bg-landing-primary-main"></span>
            <span className="text-landing-primary-main">Item 4</span>
            <span className="w-[0.2rem] h-[1.125rem] mx-2 bg-landing-primary-main"></span>
            <span className="text-landing-primary-main">Item 5</span>
            <span className="w-[0.2rem] h-[1.125rem] mx-2 bg-landing-primary-main"></span>
            <span className="text-landing-primary-main">Item 6</span>
          </div>
        </div>
      </section>
      <section className={cn("!pt-[6rem] !pb-32 bg-landing-first-bg relative", mainSectionPadding)}>
        <div className="container mx-auto flex flex-col gap-y-6">
          <LocateIcon className="text-landing-primary-main h-[3.5rem] w-[3.5rem] mx-auto font-bold" />
          <div className="flex items-center justify-center gap-x-[0.7rem] text-5xl">
            <h2 className="text-landing-secondary-main font-[900] text-center w-fit">SUCURSAL PRINCIPAL</h2>
            <div className="flex items-center justify-center text-landing-secondary-main font-[900] text-center w-fit">
              CE
              <span>
                <Zap className="text-landing-primary-main w-10 h-10 bg-transparent rounded-lg" />
              </span>
              SA
            </div>
          </div>
          <p className="text-center text-2xl font-semibold text-landing-secondary-main max-w-[60%] mx-auto">
            Intersección Belén-Country, avenida Cabañas, Comayagüela
          </p>

          <div>
            <iframe
              className="w-full h-[30rem]"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3869.7294991432286!2d-87.21851892490346!3d14.093138986335248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTTCsDA1JzM1LjMiTiA4N8KwMTInNTcuNCJX!5e0!3m2!1sen!2shn!4v1717810598233!5m2!1sen!2shn"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer"
            ></iframe>
          </div>
        </div>
      </section>
      <section className={cn("!pt-[6rem] !pb-32 bg-landing-second-bg relative", mainSectionPadding)}>
        <div className="container mx-auto flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2 mr-auto px-36 text-left">
            <Mail className="text-landing-primary-main h-[3.5rem] w-[3.5rem] font-bold" />
            <h2 className="text-landing-secondary-main font-[900] text-5xl">Contactanos</h2>
            <p className="text-2xl font-semibold text-landing-secondary-main">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. In eveniet ex autem.
            </p>
          </div>

          <div className="flex flex-col gap-y-8 px-36 py-4">
            <FloatLabel>
              <InputText
                value={formState.name}
                onChange={(e) => {
                  setFormState({ ...formState, name: e.target.value });
                }}
                className="bg-landing-second-bg border-gray-300 text-landing-secondary-main min-w-[400px] h-[55px]"
                autoComplete="off"
                id="name"
              />
              <label className="text-landing-secondary-main font-medium text-base" htmlFor="name">
                Nombre
              </label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                value={formState.email}
                onChange={(e) => {
                  setFormState({ ...formState, email: e.target.value });
                }}
                className="bg-landing-second-bg border-gray-300 text-landing-secondary-main min-w-[400px] h-[55px]"
                autoComplete="off"
                id="email"
              />
              <label className="text-landing-secondary-main font-medium text-base" htmlFor="email">
                Correo
              </label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                value={formState.subject}
                onChange={(e) => {
                  setFormState({ ...formState, subject: e.target.value });
                }}
                className="bg-landing-second-bg border-gray-300 text-landing-secondary-main min-w-[400px] h-[55px]"
                autoComplete="off"
                id="subject"
              />
              <label className="text-landing-secondary-main font-medium text-base" htmlFor="subject">
                Titulo
              </label>
            </FloatLabel>
            <FloatLabel>
              <InputTextarea
                value={formState.message}
                onChange={(e) => {
                  setFormState({ ...formState, message: e.target.value });
                }}
                className="bg-landing-second-bg border-gray-300 text-landing-secondary-main min-w-[400px] h-[85px]"
                autoComplete="off"
                id="message"
              />
              <label className="text-landing-secondary-main font-medium text-base" htmlFor="message">
                Mensaje
              </label>
            </FloatLabel>

            <div className="max-w-[400px] w-full flex justify-end">
              <LandingButton className="px-5 py-3 min-w-[150px]">Enviar</LandingButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

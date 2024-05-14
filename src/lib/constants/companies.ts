import { StaticImageData } from "next/image";
import logo_duracreto from "@/root/public/logos/LDW.png";
import logo_esmv from "@/root/public/logos/LESMW.png";
import logo_siglo_XXI from "@/root/public/logos/LS21W.png";
import logo_wm from "@/root/public/logos/LWYMW.png";
import platino_ferreteria from "@/root/public/logos/PFW.png";
import platino_inmobiliaria from "@/root/public/logos/PIW.png";
import platino_motors from "@/root/public/logos/PMW.png";
import platino_respuestos from "@/root/public/logos/PRW.png";
import logo_transporte from "@/root/public/logos/PTW.png";

interface ICOMPANIES {
  id: number;
  name: string;
  logo: StaticImageData;
  url: string;
  className?: string;
}

export const COMPANIES: ICOMPANIES[] = [
  {
    id: 1,
    name: "William y Molina",
    logo: logo_wm,
    url: "https://www.wym.hn/#/",
  },
  {
    id: 2,
    name: "Duracreto",
    logo: logo_duracreto,
    url: "https://duracretohn.com/",
  },
  {
    id: 3,
    name: "Siglo 21",
    logo: logo_siglo_XXI,
    url: "https://sps-siglo21.com/#/",
  },
  {
    id: 4,
    name: "Escuela Santa Maria del Valle",
    logo: logo_esmv,
    url: "https://esmv.edu.hn/",
  },
  {
    id: 5,
    name: "Transportes Platino",
    logo: logo_transporte,
    url: "https://www.grupoplatino.hn/#/",
    className: "w-[13rem]",
  },
  {
    id: 6,
    name: "Platino Motors",
    logo: platino_motors,
    url: "https://www.grupoplatino.hn/#/",
    className: "w-[10.5rem]",
  },
  {
    id: 7,
    name: "Platino Repuestos",
    logo: platino_respuestos,
    url: "https://www.grupoplatino.hn/#/",
    className: "w-[12rem]",
  },
  {
    id: 8,
    name: "Platino Ferreteria",
    logo: platino_ferreteria,
    url: "https://www.grupoplatino.hn/#/",
    className: "w-[12rem]",
  },
  {
    id: 9,
    name: "Inmobiliaria Platino",
    logo: platino_inmobiliaria,
    url: "https://www.grupoplatino.hn/#/",
    className: "w-[13rem]",
  },
];

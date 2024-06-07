import NavBar from "./components/navbar";
import Image from "next/image";
import landing_logo from "@/root/public/landing/logos/nav-bar-logo.png";

export default function LandingPage() {
  return (
    <main className="bg-white w-full h-screen overflow-auto text-black">
      <header className="w-full">
        <nav className="bg-landing-first-bg w-full h-full">
          <section className="flex gap-x-4 justify-between items-center container mx-auto">
            <Image className="h-32 w-32" src={landing_logo} height={100} width={100} alt="Ceisa-Logo" />
            <NavBar className="flex gap-x-2 items-center justify-evenly"></NavBar>
          </section>
        </nav>
      </header>
    </main>
  );
}

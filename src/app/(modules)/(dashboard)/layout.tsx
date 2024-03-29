import SignOutButton from "../auth/(components)/sign-out-button";
import MainContentWrapper from "./(components)/main-content-wrapper";
import SidebarButton from "./(components)/sidebar";
import ThemeSwitcher from "./(components)/theme-switcher";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-screen flex max-h-screen">
      <MainContentWrapper>
        <header className="w-full p-3 max-h-[100px] flex justify-between items-center">
          <SidebarButton />
          <SignOutButton />
        </header>
        <div className="overflow-auto flex flex-col grow h-full w-full">{children}</div>
        <footer className="p-3 max-h-[100px]">Footer</footer>
      </MainContentWrapper>
    </main>
  );
}

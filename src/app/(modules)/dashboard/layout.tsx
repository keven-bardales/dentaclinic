import LoadingRemembermeLoader from "../(shared)/(components)/loading-sign-in-loader";
import Avatar from "./(components)/avatar";
import ChangeThemeButton from "./(components)/change-theme";
import ClosingSessionLoader from "./(components)/closing-session";
import MainContentWrapper from "./(components)/main-content-wrapper";
import SidebarButton from "./(components)/sidebar";

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-screen overflow-hidden flex max-h-screen">
      <ClosingSessionLoader />
      <MainContentWrapper>
        <div className="overflow-auto scrollbar-thin flex flex-col items-center mx-auto max-w-[1920px] h-full w-full">
          <header className="w-full p-4 pt-7 max-h-[50px] flex justify-end gap-x-3 max-w-[1920px] mx-auto items-center">
            <SidebarButton />
            <ChangeThemeButton />
            <Avatar />
          </header>
          {children}

          {/* <footer className="p-3 px-5 max-h-[80px] md:hidden">Footer</footer> */}
        </div>

        {/* <footer className="p-3 px-5 max-h-[80px] hidden md:block border-t">Footer</footer> */}
      </MainContentWrapper>
    </main>
  );
}

import Avatar from "./(components)/avatar";
import ClosingSessionLoader from "./(components)/closing-session";
import MainContentWrapper from "./(components)/main-content-wrapper";
import SidebarButton from "./(components)/sidebar";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-screen flex max-h-screen">
      <ClosingSessionLoader />
      <MainContentWrapper>
        <header className="w-full p-3 px-5 max-h-[80px] border-b flex justify-between items-center">
          <SidebarButton />
          <Avatar />
        </header>
        <div className="overflow-auto scrollbar-thin flex flex-col grow h-full w-full">
          {children}

          <footer className="p-3 px-5 max-h-[80px] md:hidden">Footer</footer>
        </div>

        <footer className="p-3 px-5 max-h-[80px] hidden md:block">Footer</footer>
      </MainContentWrapper>
    </main>
  );
}

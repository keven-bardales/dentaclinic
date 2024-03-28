export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-screen flex max-h-screen">
      <div className="max-w-[250px] shrink-0 bg-green-500 w-full transition-all duration-200">Sidenav</div>
      <section className="w-full flex flex-col">
        <header className="w-full p-4 bg-stone-200 text-black">
          <h1 className="">Dashboard</h1>
        </header>
        {children}

        <footer className="bg-gray-200 text-black p-4">Footer</footer>
      </section>
    </main>
  );
}

export default function BasicPageWrapper({ children }: { children: React.ReactNode }) {
  return <section className="grow w-full p-4 px-5 flex-col">{children}</section>;
}

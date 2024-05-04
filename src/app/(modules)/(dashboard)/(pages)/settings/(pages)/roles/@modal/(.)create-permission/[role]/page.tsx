export default function Default({
  params: { role },
}: {
  params: {
    role: string;
  };
}) {
  return (
    <div>
      <h1>Default</h1>
      <p>{role}</p>
    </div>
  );
}

export default function RenderIf({ condition, children }: { condition: boolean; children: React.ReactNode }) {
  return condition ? children : null;
}

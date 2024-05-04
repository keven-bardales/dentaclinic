import { Divider } from "primereact/divider";

export default function PassWordToolTip() {
  return (
    <>
      <Divider />
      <p className="mt-2">Sugerencias</p>
      <ul className="">
        <li>Al menos una minuscula</li>
        <li>Al menos una mayuscula</li>
        <li>Al menos un numero</li>
        <li>Minimo 8 caracteres</li>
      </ul>
    </>
  );
}

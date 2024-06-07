import { InputText, InputTextProps } from "primereact/inputtext";

export interface TextInputProps extends InputTextProps {
  label: string;
  required?: boolean;
  error?: string;
}

export default function TextInput(props: TextInputProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <label>
        {props.label}
        {props.required && <span className="text-red-500">*</span>}
      </label>
      <InputText autoComplete="off" {...props} />
      <small id={`${props.name}-help`} className="p-error p-d-block">
        {props.error}
      </small>
    </div>
  );
}

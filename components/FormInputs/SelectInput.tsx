import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type SelectInputProps<TFormValues extends FieldValues> = {
  label: string;
  name: Path<TFormValues>; // Usare Path direttamente per il tipo di name
  isRequired: boolean;
  register: UseFormRegister<TFormValues>;
  options: Option[];
  errors: FieldErrors<TFormValues>;
  className?: string;
};

export default function SelectInput<TFormValues extends FieldValues>({
  label,
  name,
  isRequired,
  register,
  options,
  errors,
  className = "",
}: SelectInputProps<TFormValues>) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        {...register(name, { required: isRequired })}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
          errors[name] ? "border-red-500" : ""
        }`}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">
          {errors[name]?.message?.toString() || `${label} is required`}
        </p>
      )}
    </div>
  );
}

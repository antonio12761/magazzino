import React from 'react';
import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';

type TextareaInputProps<TFormValues extends FieldValues> = {
  label: string;
  name: Path<TFormValues>; // Usa `Path` per garantire che il nome sia una chiave valida nel form
  isRequired: boolean;
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
  className?: string;
  disabled?: boolean;
};

export default function TextareaInput<TFormValues extends FieldValues>({
  label,
  name,
  isRequired,
  register,
  errors,
  className = '',
  disabled = false,
}: TextareaInputProps<TFormValues>) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        {...register(name, { required: isRequired })}
        disabled={disabled}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
          errors[name] ? 'border-red-500' : ''
        }`}
      />
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">
          {(errors[name]?.message as string) || `${label} is required`}
        </p>
      )}
    </div>
  );
}

import { useRegistrationContext } from "@/context/RegistrationContext";
import Input from "../inputs/Input";
import InputCheckbox from "../inputs/InputCheckbox";
import Button from "../Button";
import InputDropdown from "../inputs/InputDropdown";
import Link from "next/link";
import { FormObject } from "@/app/types";
import { useEffect, useState } from "react";

interface RegistrationFormProps {
  fields: FieldProps[],
  onSubmit: (data: FormObject) => void,
  stepId: string
}

export interface FieldProps {
  type: string,
  name: string,
  label: string,
  required: boolean,
  defaultValue: string | boolean,
  hidden?: boolean,
  colSpan?: number,
  options?: { value: string, label: string }[],
}

export default function RegistrationForm({
  fields,
  onSubmit,
  stepId
}: RegistrationFormProps) {

  const [validForm, setValidForm] = useState(false);
  const { formData, setFormData, saveFormData } = useRegistrationContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("[handleSubmit] formData", formData);
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const formObject = Object.fromEntries(data.entries());
    console.log("[handleSubmit] formObject", formObject);
    saveFormData({
      ...formData,
      ...formObject,
    });
    onSubmit(formObject);
  }

  useEffect(() => {
    const isValid = fields.every(field => {
      if (field.type === "checkbox") {
        return formData?.[field.name] !== undefined;
      }
      return formData?.[field.name] !== undefined && String(formData?.[field.name]).trim() !== "";
    });
    setValidForm(isValid);
  }, [formData, fields]);

  return (
    <form className="flex flex-col gap-8 max-w-md" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8">
        <div className="form-inputs grid grid-cols-12 gap-4">
          {fields.map((field) => {

            const fieldClasses = `${field.colSpan ? `col-span-${field.colSpan}` : "col-span-12"} ${field.hidden ? "hidden" : ""}`;
            if (field.type === "checkbox") {
              return <InputCheckbox
                key={field.name}
                name={field.name}
                label={field.label}
                defaultChecked={field.defaultValue as boolean}
                className={fieldClasses}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [field.name]: e.target.checked ? "on" : "off",
                  });
                }}
              />
            } else if (field.type === "dropdown") {
              return <InputDropdown
                key={field.name}
                name={field.name}
                label={field.label}
                className={fieldClasses}
                defaultValue={formData?.[field.name] as string}
                defaultOption={{ value: "", label: "Select an option" }}
                options={field.options || []}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [field.name]: e.target.value,
                  });
                }}
              />
            }
            console.log("[field] field", field);
            return <Input
              key={field.name}
              type={field.type}
              name={field.name}
              label={field.label}
              className={fieldClasses}
              required={field.required}
              defaultValue={formData?.[field.name] as string}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  [field.name]: e.target.value,
                });
              }}
            />
          })}
        </div>
        <div className="form-actions flex flex-col gap-4">
          <Button type="submit" buttonStyle="primary" buttonSize="lg" disabled={!validForm}>
            Continue
          </Button>
          <Link href={`/account/register/steps/${Number(stepId) - 1}`} className="text-sm text-gray-500">
            Back
          </Link>
        </div>
      </div>
    </form>
  )
}
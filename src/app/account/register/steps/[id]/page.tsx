"use client";

import { FormObject } from "@/app/types";
import Column from "@/components/layout/Column";
import RegistrationForm from "@/components/registration/RegistrationForm";
import { useRegistrationContext } from "@/context/RegistrationContext";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { saveFormData, formData, steps } = useRegistrationContext();
  const step = steps?.find(step => step.id === `step-${id}`);

  console.log("[step] id", id);

  const handleSubmit = (data: FormObject) => {
    console.log("[handleSubmit] data", data);
    saveFormData(data);
    router.push(`/account/register/steps/${Number(id) + 1}`);
  }

  return formData && step && (
    <div className="flex flex-col md:flex-row h-full flex-1">
      <Column padding="p-8" flex="flex-1 flex flex-col gap-8">
        <div className="form-header flex flex-col gap-8">
          <div className="logo w-[150px]">
            <Image src="/images/logo.png" alt="Scriber" width={200} height={200} />
          </div>
          <p className="text-lg">{step.description}</p>
        </div>
        <RegistrationForm fields={step.fields} onSubmit={handleSubmit} stepId={id as string} />
      </Column>
      <Column padding="p-8 bg-primary" flex="flex-1">
        <div className="flex flex-col gap-4"></div>
      </Column>
    </div>
  );
}

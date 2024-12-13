"use client";

import { FieldProps } from "@/components/registration/RegistrationForm";
import { createContext, useContext, useEffect, useState } from "react";
import type { FormObject } from "@/app/types";

export const RegistrationContext = createContext({});

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistrationContext must be used within a RegistrationContextProvider");
  }
  return context as {
    formData: FormObject;
    setFormData: (formData: FormObject | undefined) => void;
    getFormData: () => FormObject | undefined;
    saveFormData: (formData: FormObject) => void;
    steps: {
      id: string;
      title: string;
      description: React.ReactNode;
      fields: FieldProps[];
    }[];
  };
}

const getSteps = (formData: FormObject) => {
  const referralSources = [
    { label: "Google", value: "google", description: "search" },
    { label: "LinkedIn", value: "linkedin", description: "LinkedIn post or member" },
    { label: "Twitter/X", value: "twitter_x", description: "Twitter/X user" },
    { label: "Facebook", value: "facebook", description: "Facebook post or group" },
    { label: "A Colleague", value: "colleague", description: "colleague" },
    { label: "A Friend", value: "friend", description: "friend" },
    { label: "A Conference", value: "conference", description: "conference" },
    { label: "A Podcast", value: "podcast", description: "podcast" },
    { label: "A Blog", value: "blog", description: "blog" },
    { label: "A Newsletter", value: "newsletter", description: "newsletter" },
    { label: "A Webinar", value: "webinar", description: "webinar" },
    { label: "Other", value: "other", description: "other" },
  ]

  return [
    {
      id: "step-1",
      title: "Step 1",
      description: "Welcome to Scriber. You’re on your way to creating the ultimate subscription shopping experience for your customers.",
      fields: [
        {
          type: "text",
          name: "contact.first_name",
          label: "First Name",
          colSpan: 6,
          required: true,
          defaultValue: "",
        },
        {
          type: "text",
          name: "contact.last_name",
          label: "Last Name",
          colSpan: 6,
          required: true,
          defaultValue: "",
        },
        {
          type: "text",
          name: "contact.email",
          label: "What is your email?",
          colSpan: 12,
          required: true,
          defaultValue: "",
        },
        {
          type: "text",
          name: "contact.company_name",
          label: "What is your company name?",
          colSpan: 12,
          required: true,
          defaultValue: "",
        },
        {
          type: "checkbox",
          name: "contact.accepts_marketing",
          label: "I want to receive promotional emails from Scriber (don't worry, we won't spam you or share your information with third parties)",
          colSpan: 12,
          required: false,
          defaultValue: true,
        },
      ] as FieldProps[],
    },
    {
      id: "step-2",
      title: "Step 2",
      description: (
        <>Great to meet you{`${formData?.first_name ? ", " + formData?.first_name : ""}`.trim()}.
          Let’s learn a little bit more about your business. This will help our AI tailor your experience and help you get the most out of the platform.
        </>
      ),
      fields: [
        {
          type: "dropdown",
          name: "company.employee_count",
          label: "How many employees does your company have?",
          colSpan: 12,
          required: true,
          defaultValue: "",
          options: [
            { label: "1-10", value: "1-10" },
            { label: "11-50", value: "11-50" },
            { label: "51-250", value: "51-250" },
            { label: "251+", value: "251+" },
          ],
        },
        {
          type: "dropdown",
          name: "company.annual_revenue",
          label: "What is your annual revenue?",
          colSpan: 12,
          required: true,
          defaultValue: "",
          options: [
            { label: "$0-100,000", value: "$0-100,000" },
            { label: "$100,001-500,000", value: "$100,001-500,000" },
            { label: "$500,001-1,000,000", value: "$500,001-1,000,000" },
            { label: "$1,000,001+", value: "$1,000,001+" },
          ],
        },
        {
          type: "dropdown",
          name: "company.selling_subscriptions",
          label: "Do you currently sell subscriptions?",
          colSpan: 12,
          required: true,
          defaultValue: "",
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ],
        },
        {
          type: "dropdown",
          name: "company.industry",
          label: "What industry does your company operate in?",
          colSpan: 12,
          required: true,
          defaultValue: "",
          options: [
            { label: "Retail", value: "retail" },
            { label: "Manufacturing", value: "manufacturing" },
            { label: "Service", value: "service" },
            { label: "Other", value: "other" },
          ],
        }
      ] as FieldProps[],
    },
    {
      id: "step-3",
      title: "Step 3",
      description: "Great! Last question before we get started. How did you find out about Scriber?",
      fields: [
        {
          type: "dropdown",
          name: "contact.referral_source",
          label: "How did you find out about Scriber?",
          colSpan: 12,
          required: true,
          defaultValue: "",
          options: referralSources,
        },
        {
          type: "text",
          name: "contact.referrer_name",
          label: `Which ${referralSources.find(source => source.value === formData?.["contact.referral_source"])?.description} referred you to Scriber?`,
          colSpan: 12,
          required: false,
          defaultValue: "",
          hidden: !formData?.["contact.referral_source"],
        },
      ] as FieldProps[]
    },
  ]
}

export default function RegistrationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formData, setFormData] = useState<FormObject>();
  const [steps, setSteps] = useState<{
    id: string;
    title: string;
    description: React.ReactNode;
    fields: FieldProps[];
  }[]>();

  const saveFormData = (data: FormObject) => {
    const storedFormData = localStorage.getItem("registrationFormData");
    const storedFormDataJSON = storedFormData ? JSON.parse(storedFormData) : {};

    setFormData({
      ...storedFormDataJSON,
      ...data,
    });
    console.log("[saveFormData] formDataJSON", data);
    localStorage.setItem("registrationFormData", JSON.stringify({
      ...storedFormDataJSON,
      ...data,
    }));
  }

  // On load, get the form data from localStorage
  useEffect(() => {
    const storedFormData = localStorage.getItem("registrationFormData");
    if (storedFormData) {
      console.log("[useEffect] storedFormData", storedFormData);
      const formDataJSON = JSON.parse(storedFormData);
      setFormData(formDataJSON);
      console.log("[useEffect] formDataJSON", formDataJSON);
    }
  }, []);

  console.log("[RegistrationContextProvider] formData", formData?.first_name);
  console.log("formData?.['contact.referral_source']", formData?.["contact.referral_source"]);

  // Update the steps based on the form data
  useEffect(() => {
    console.log("[useEffect] formData updated", formData);
    if (formData) {
      const steps = getSteps(formData);
      console.log("[useEffect] steps", steps);
      setSteps(steps);
    }
  }, [formData]);

  return (
    <RegistrationContext.Provider value={{
      formData,
      setFormData,
      saveFormData,
      steps,
    }}>
      {children}
    </RegistrationContext.Provider>
  );
}
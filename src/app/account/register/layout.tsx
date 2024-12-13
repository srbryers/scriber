import RegistrationContextProvider from "@/context/RegistrationContext";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RegistrationContextProvider>
      {children}
    </RegistrationContextProvider>
  );
}
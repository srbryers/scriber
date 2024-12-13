import { redirect } from "next/navigation";

export default function Default() {
  redirect("/account/register/step-1");
}

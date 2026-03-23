import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CentralPanelLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const role = cookieStore.get("role")?.value;

  if (!token) redirect("/login");
  if (role !== "main_owner") redirect("/unauthorized");

  return <>{children}</>;
}
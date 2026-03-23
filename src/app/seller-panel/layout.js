import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SellerPanelLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const role = cookieStore.get("role")?.value;

  if (!token) redirect("/login");
  if (role !== "seller") redirect("/unauthorized");

  return <>{children}</>;
}
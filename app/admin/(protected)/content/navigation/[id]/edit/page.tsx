import { notFound } from "next/navigation";
import { getNavItemById } from "@/db/queries";
import NavItemForm from "../../NavItemForm";

export const dynamic = "force-dynamic";

export default async function EditNavItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const navItem = await getNavItemById(Number(id));
  if (!navItem) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Edit Navigation Link</h1>
      <NavItemForm navItem={navItem} />
    </div>
  );
}

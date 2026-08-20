import { notFound } from "next/navigation";
import { getAchievementById } from "@/db/queries";
import AchievementForm from "../../AchievementForm";

export const dynamic = "force-dynamic";

export default async function EditAchievementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const achievement = await getAchievementById(Number(id));
  if (!achievement) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Edit Achievement</h1>
      <AchievementForm achievement={achievement} />
    </div>
  );
}

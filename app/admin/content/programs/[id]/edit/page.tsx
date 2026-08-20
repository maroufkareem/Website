import { notFound } from "next/navigation";
import { getProgramById } from "@/db/queries";
import ProgramForm from "../../ProgramForm";

export const dynamic = "force-dynamic";

export default async function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const program = await getProgramById(Number(id));
  if (!program) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Edit Program</h1>
      <ProgramForm program={program} />
    </div>
  );
}

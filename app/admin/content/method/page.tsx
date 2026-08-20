import { getSiteSettings } from "@/db/queries";
import { updateMethodAction } from "../actions";
import SaveButton from "@/app/admin/components/SaveButton";
import { Field, TextArea } from "@/app/admin/components/FormFields";

export const dynamic = "force-dynamic";

export default async function MethodContentPage() {
  const settings = await getSiteSettings().catch(() => null);
  const steps = settings?.methodSteps ?? [];

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Teaching Methodology</h1>
        <p className="text-sm text-neutral-400">Edit the four &quot;Marouf Method&quot; steps.</p>
      </div>

      <form action={updateMethodAction} className="space-y-5 rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-6">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-2 rounded border border-neutral-800 p-3">
            <Field label="Number" name={`step_${i}_number`} defaultValue={steps[i]?.number} small />
            <Field label="Title" name={`step_${i}_title`} defaultValue={steps[i]?.title} small />
            <TextArea label="Body" name={`step_${i}_body`} defaultValue={steps[i]?.body} rows={2} />
          </div>
        ))}
        <SaveButton />
      </form>
    </div>
  );
}

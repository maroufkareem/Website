import { saveProgramAction } from "./actions";
import SaveButton from "@/app/admin/components/SaveButton";
import { Field, TextArea, NumberField, CheckboxField } from "@/app/admin/components/FormFields";
import type { Program } from "@/db/queries";

export default function ProgramForm({ program }: { program?: Program }) {
  return (
    <form action={saveProgramAction} className="max-w-2xl space-y-5 rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-6">
      {program && <input type="hidden" name="id" value={program.id} />}
      <Field label="Label" name="label" defaultValue={program?.label} />
      <Field label="Title" name="title" defaultValue={program?.title} />
      <Field label="Price" name="price" defaultValue={program?.price} />
      <Field label="Meta" name="meta" defaultValue={program?.meta} />
      <Field label="Date" name="date" defaultValue={program?.date} />
      <TextArea label="Body" name="body" defaultValue={program?.body} />
      <NumberField label="Sort order" name="sortOrder" defaultValue={program?.sortOrder} />
      <CheckboxField label="Published" name="published" defaultChecked={program?.published ?? true} />
      <SaveButton />
    </form>
  );
}

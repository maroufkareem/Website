import { saveAchievementAction } from "./actions";
import SaveButton from "@/app/admin/components/SaveButton";
import { Field, TextArea, NumberField, CheckboxField } from "@/app/admin/components/FormFields";
import type { Achievement } from "@/db/queries";

export default function AchievementForm({ achievement }: { achievement?: Achievement }) {
  return (
    <form
      action={saveAchievementAction}
      className="max-w-2xl space-y-5 rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-6"
    >
      {achievement && <input type="hidden" name="id" value={achievement.id} />}
      <Field label="Title" name="title" defaultValue={achievement?.title} />
      <TextArea label="Body" name="body" defaultValue={achievement?.body} />
      <NumberField label="Sort order" name="sortOrder" defaultValue={achievement?.sortOrder} />
      <CheckboxField label="Published" name="published" defaultChecked={achievement?.published ?? true} />
      <SaveButton />
    </form>
  );
}

import { getSiteSettings } from "@/db/queries";
import { updateFeaturedAction } from "../actions";
import ImageUpload from "@/app/admin/components/ImageUpload";
import SaveButton from "@/app/admin/components/SaveButton";
import { Field, TextArea } from "@/app/admin/components/FormFields";

export const dynamic = "force-dynamic";

export default async function FeaturedContentPage() {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Featured Guide</h1>
        <p className="text-sm text-neutral-400">Edit the &quot;Featured Biology Guide&quot; section.</p>
      </div>

      <form
        action={updateFeaturedAction}
        className="space-y-5 rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-6"
      >
        <Field label="Eyebrow" name="featuredEyebrow" defaultValue={settings?.featuredEyebrow} />
        <Field label="Heading" name="featuredHeading" defaultValue={settings?.featuredHeading} />
        <TextArea label="Body" name="featuredBody" defaultValue={settings?.featuredBody} />
        <TextArea
          label="Checklist (one per line)"
          name="featuredChecklist"
          defaultValue={(settings?.featuredChecklist ?? []).join("\n")}
        />
        <ImageUpload label="Featured Image" name="featuredImage1Url" defaultValue={settings?.featuredImage1Url} />
        <SaveButton />
      </form>
    </div>
  );
}

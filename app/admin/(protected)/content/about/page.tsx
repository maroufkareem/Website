import { getSiteSettings } from "@/db/queries";
import { updateAboutAction } from "../actions";
import ImageUpload from "@/app/admin/components/ImageUpload";
import SaveButton from "@/app/admin/components/SaveButton";
import { Field, TextArea } from "@/app/admin/components/FormFields";

export const dynamic = "force-dynamic";

export default async function AboutContentPage() {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">About Section</h1>
        <p className="text-sm text-neutral-400">Edit the &quot;About Dr. Kareem&quot; content.</p>
      </div>

      <form action={updateAboutAction} className="space-y-5 rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-6">
        <Field label="Eyebrow" name="aboutEyebrow" defaultValue={settings?.aboutEyebrow} />
        <Field label="Heading" name="aboutHeading" defaultValue={settings?.aboutHeading} />
        <TextArea label="Paragraph 1" name="aboutParagraph1" defaultValue={settings?.aboutParagraph1} />
        <TextArea label="Paragraph 2" name="aboutParagraph2" defaultValue={settings?.aboutParagraph2} />
        <TextArea
          label="Credentials (one per line)"
          name="aboutCredentials"
          defaultValue={(settings?.aboutCredentials ?? []).join("\n")}
        />
        <ImageUpload label="Portrait image" name="aboutPortraitUrl" defaultValue={settings?.aboutPortraitUrl} />
        <SaveButton />
      </form>
    </div>
  );
}

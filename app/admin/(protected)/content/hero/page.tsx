import { getSiteSettings } from "@/db/queries";
import { updateHeroAction } from "../actions";
import ImageUpload from "@/app/admin/components/ImageUpload";
import SaveButton from "@/app/admin/components/SaveButton";
import { Field, TextArea } from "@/app/admin/components/FormFields";

export const dynamic = "force-dynamic";

export default async function HeroContentPage() {
  const settings = await getSiteSettings().catch(() => null);
  const stats = settings?.stats ?? [];

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Hero Section</h1>
        <p className="text-sm text-neutral-400">Edit the top-of-page hero content and stat cards.</p>
      </div>

      <form action={updateHeroAction} className="space-y-5 rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-6">
        <Field label="Eyebrow" name="heroEyebrow" defaultValue={settings?.heroEyebrow} />
        <Field label="Doctor name" name="heroDoctorName" defaultValue={settings?.heroDoctorName} />
        <Field label="Doctor role" name="heroDoctorRole" defaultValue={settings?.heroDoctorRole} />
        <Field label="Headline" name="heroHeadline" defaultValue={settings?.heroHeadline} />
        <TextArea label="Hero copy" name="heroCopy" defaultValue={settings?.heroCopy} />
        <Field label="Quote" name="heroQuote" defaultValue={settings?.heroQuote} />
        <TextArea
          label="Badges (one per line)"
          name="heroBadges"
          defaultValue={(settings?.heroBadges ?? []).join("\n")}
        />
        <ImageUpload label="Hero background image" name="heroImageUrl" defaultValue={settings?.heroImageUrl} />

        <div>
          <p className="mb-2 text-sm font-semibold text-[#C9A65A]">Stats</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-2 rounded border border-neutral-800 p-3">
                <Field label="Number" name={`stat_${i}_number`} defaultValue={stats[i]?.number} small />
                <Field label="Label" name={`stat_${i}_label`} defaultValue={stats[i]?.label} small />
                <Field label="Sub" name={`stat_${i}_sub`} defaultValue={stats[i]?.sub} small />
              </div>
            ))}
          </div>
        </div>

        <SaveButton />
      </form>
    </div>
  );
}

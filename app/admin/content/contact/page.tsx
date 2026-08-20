import { getSiteSettings } from "@/db/queries";
import { updateContactAction } from "../actions";
import SaveButton from "@/app/admin/components/SaveButton";
import { Field, TextArea } from "@/app/admin/components/FormFields";

export const dynamic = "force-dynamic";

export default async function ContactContentPage() {
  const settings = await getSiteSettings().catch(() => null);
  const social = settings?.socialLinks ?? {};

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Contact & Social</h1>
        <p className="text-sm text-neutral-400">Edit contact details, social links, and the footer blurb.</p>
      </div>

      <form
        action={updateContactAction}
        className="space-y-5 rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-6"
      >
        <Field label="Contact email" name="contactEmail" defaultValue={settings?.contactEmail} />
        <Field label="Contact phone" name="contactPhone" defaultValue={settings?.contactPhone} />
        <Field label="WhatsApp link" name="contactWhatsapp" defaultValue={settings?.contactWhatsapp} />
        <Field label="Instagram URL" name="instagram" defaultValue={social.instagram} />
        <Field label="LinkedIn URL" name="linkedin" defaultValue={social.linkedin} />
        <Field label="TikTok URL" name="tiktok" defaultValue={social.tiktok} />
        <Field label="WhatsApp URL (footer)" name="socialWhatsapp" defaultValue={social.whatsapp} />
        <TextArea label="Footer blurb" name="footerBlurb" defaultValue={settings?.footerBlurb} />
        <SaveButton />
      </form>
    </div>
  );
}

import { saveTestimonialAction } from "./actions";
import SaveButton from "@/app/admin/components/SaveButton";
import { Field, TextArea, NumberField, CheckboxField } from "@/app/admin/components/FormFields";
import type { Testimonial } from "@/db/queries";

export default function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  return (
    <form
      action={saveTestimonialAction}
      className="max-w-2xl space-y-5 rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-6"
    >
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}
      <TextArea label="Testimonial body" name="body" defaultValue={testimonial?.body} />
      <Field label="Author" name="author" defaultValue={testimonial?.author} />
      <NumberField label="Sort order" name="sortOrder" defaultValue={testimonial?.sortOrder} />
      <CheckboxField label="Published" name="published" defaultChecked={testimonial?.published ?? true} />
      <SaveButton />
    </form>
  );
}

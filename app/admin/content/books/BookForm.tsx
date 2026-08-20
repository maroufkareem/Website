import { saveBookAction } from "./actions";
import SaveButton from "@/app/admin/components/SaveButton";
import ImageUpload from "@/app/admin/components/ImageUpload";
import { Field, TextArea, NumberField, CheckboxField } from "@/app/admin/components/FormFields";
import type { Book } from "@/db/queries";

export default function BookForm({ book }: { book?: Book }) {
  return (
    <form action={saveBookAction} className="max-w-2xl space-y-5 rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-6">
      {book && <input type="hidden" name="id" value={book.id} />}
      <ImageUpload label="Cover image" name="imageUrl" defaultValue={book?.imageUrl} />
      <Field label="Label" name="label" defaultValue={book?.label} />
      <Field label="Title" name="title" defaultValue={book?.title} />
      <TextArea label="Body" name="body" defaultValue={book?.body} />
      <NumberField label="Sort order" name="sortOrder" defaultValue={book?.sortOrder} />
      <CheckboxField label="Published" name="published" defaultChecked={book?.published ?? true} />
      <SaveButton />
    </form>
  );
}

import { saveNavItemAction } from "./actions";
import SaveButton from "@/app/admin/components/SaveButton";
import { Field, NumberField } from "@/app/admin/components/FormFields";
import type { NavItem } from "@/db/queries";

export default function NavItemForm({ navItem }: { navItem?: NavItem }) {
  return (
    <form
      action={saveNavItemAction}
      className="max-w-xl space-y-5 rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-6"
    >
      {navItem && <input type="hidden" name="id" value={navItem.id} />}
      <Field label="Label" name="label" defaultValue={navItem?.label} />
      <Field label="Href" name="href" defaultValue={navItem?.href} />
      <NumberField label="Sort order" name="sortOrder" defaultValue={navItem?.sortOrder} />
      <SaveButton />
    </form>
  );
}

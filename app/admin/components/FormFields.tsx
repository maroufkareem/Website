export function Field({
  label,
  name,
  defaultValue,
  small,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  small?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className={`mb-1 block font-semibold text-neutral-300 ${small ? "text-xs" : "text-sm"}`}>{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-[#C9A65A]"
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-neutral-300">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        rows={rows}
        className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-[#C9A65A]"
      />
    </label>
  );
}

export function NumberField({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-neutral-300">{label}</span>
      <input
        type="number"
        name={name}
        defaultValue={defaultValue ?? 0}
        className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-[#C9A65A]"
      />
    </label>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-neutral-300">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4" />
      {label}
    </label>
  );
}

import { notFound } from "next/navigation";
import { getBookById } from "@/db/queries";
import BookForm from "../../BookForm";

export const dynamic = "force-dynamic";

export default async function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBookById(Number(id));
  if (!book) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Edit Book</h1>
      <BookForm book={book} />
    </div>
  );
}

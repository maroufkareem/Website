import BookForm from "../BookForm";

export default function NewBookPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Add Book</h1>
      <BookForm />
    </div>
  );
}

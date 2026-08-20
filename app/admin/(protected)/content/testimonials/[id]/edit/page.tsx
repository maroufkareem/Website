import { notFound } from "next/navigation";
import { getTestimonialById } from "@/db/queries";
import TestimonialForm from "../../TestimonialForm";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await getTestimonialById(Number(id));
  if (!testimonial) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Edit Testimonial</h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}

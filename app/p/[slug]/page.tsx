import { supabase } from "../../../lib/supabase";
import QRCode from "react-qr-code";

export default async function PetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: page, error } = await supabase
    .from("pet_pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !page) {
    return <div>Page not found</div>;
  }

  const { data: pets } = await supabase
    .from("pets")
    .select("*")
    .eq("page_id", page.id);

  return (
    <main className="max-w-2xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-4">
        {page.title}
      </h1>

      <p className="text-lg mb-8">
        {page.message}
      </p>

      <div className="mb-10">
        <QRCode
          value={`http://localhost:3000/p/${slug}`}
          size={180}
        />
      </div>

      <div className="space-y-6">
        {pets?.map((pet) => (
          <div
            key={pet.id}
            className="border rounded-xl p-4"
          >
            <h2 className="text-2xl font-semibold">
              {pet.name}
            </h2>

            <p>{pet.species}</p>

            <p className="text-gray-600">
              {pet.notes}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
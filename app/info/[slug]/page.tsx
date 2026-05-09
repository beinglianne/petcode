import { supabase } from "../../../lib/supabase";

export default async function InfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: page } = await supabase
    .from("pet_pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!page) {
    return <div>Page not found</div>;
  }

  const { data: pets } = await supabase
    .from("pets")
    .select("*")
    .eq("page_id", page.id);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {page.house_notes && (
  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
    <h2 className="text-2xl font-bold mb-3">
      House Notes
    </h2>

    <p className="text-lg whitespace-pre-line">
      {page.house_notes}
    </p>
  </div>
)}

        {pets?.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-2xl shadow p-6"
          >
            {pet.photo_url && (
              <img
                src={pet.photo_url}
                alt={pet.name}
                className="w-full rounded-xl mb-4"
              />
            )}

            <h2 className="text-3xl font-bold mb-2">
              {pet.name}
            </h2>

            <p className="text-gray-500 mb-3">
              {pet.species}
            </p>

            <p className="text-lg">
              {pet.notes}
            </p>
          </div>
        ))}

      </div>
    </main>
  );
}
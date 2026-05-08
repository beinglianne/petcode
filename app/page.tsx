import { supabase } from "../lib/supabase";

export default async function Home() {
  const { data, error } = await supabase
    .from("pet_pages")
    .select("*");

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-6">PetCode</h1>

      {error && (
        <pre className="text-red-500">
          {JSON.stringify(error, null, 2)}
        </pre>
      )}

      <div className="space-y-4">
        {data?.map((page) => (
          <div
            key={page.id}
            className="border p-4 rounded-lg"
          >
            <h2 className="text-2xl font-semibold">
              {page.title}
            </h2>

            <p>{page.message}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
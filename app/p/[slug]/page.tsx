import { supabase } from "../../../lib/supabase";
import QRCode from "react-qr-code";

export default async function QRPage({
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

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">
          {page.title}
        </h1>

        <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 mb-6">
          <p className="text-lg">
  https://www.petcode.app/info/{slug}
</p>
        </div>

        <div className="flex justify-center">
          <QRCode
            value={`https://petcode.app/info/${slug}`}
            size={220}
          />
        </div>
      </div>
    </main>
  );
}
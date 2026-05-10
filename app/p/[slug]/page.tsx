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
          <a
  href={`https://www.petcode.app/info/${slug}`}
  className="text-lg text-blue-600 underline break-all"
>
  https://www.petcode.app/info/{slug}
</a>
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
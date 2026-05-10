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
    <main className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="border-2 border-black rounded-2xl p-8 w-full max-w-lg text-center">

        <h1 className="text-5xl font-bold mb-6">
          {page.title}
        </h1>

        <div className="border border-black rounded-xl p-4 mb-8">
          <p className="text-2xl leading-relaxed">
            {page.message}
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <QRCode
            value={`https://www.petcode.app/info/${slug}`}
            size={280}
          />
        </div>

        <p className="text-lg break-all">
          https://www.petcode.app/info/{slug}
        </p>

      </div>
    </main>
  );
}
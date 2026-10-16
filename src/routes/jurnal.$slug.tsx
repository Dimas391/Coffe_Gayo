import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { articles, pageMeta } from "@/lib/content";
import { PageHeading, useSite } from "@/components/site-shell";
export const Route = createFileRoute("/jurnal/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) =>
    pageMeta(
      loaderData?.title[0] || "Cerita tidak ditemukan",
      loaderData?.paragraphs[0]?.[0] || "Artikel tidak ditemukan di Jurnal Kopi Gayo.",
    ),
  component: Article,
  notFoundComponent: () => (
    <div className="section">
      <h1 className="text-4xl">Cerita tidak ditemukan</h1>
      <Link to="/jurnal">Kembali ke jurnal</Link>
    </div>
  ),
});
function Article() {
  const a = Route.useLoaderData();
  const { t, lang } = useSite();
  const l = lang === "id" ? 0 : 1;
  return (
    <>
      <PageHeading eyebrow={a.category[l] || "Jurnal"} title={a.title[l] || "Kopi Gayo"} />
      <section className="section">
        <div className="article">
          <Link className="text-xs flex gap-2 items-center mb-7" to="/jurnal">
            <ArrowLeft size={14} />
            {t("Kembali ke jurnal", "Back to journal")}
          </Link>
          <img src={a.image} alt={a.title[l]} width={900} height={500} />
          {(a.paragraphs[l] || []).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>
    </>
  );
}

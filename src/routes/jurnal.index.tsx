import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeading, useSite } from "@/components/site-shell";
import { articles, pageMeta } from "@/lib/content";
export const Route = createFileRoute("/jurnal/")({
  head: () =>
    pageMeta(
      "Jurnal Gayo",
      "Cerita asal kopi Gayo, panduan menyeduh di rumah dan inspirasi oleh-oleh dari Aceh.",
    ),
  component: Journal,
});
function Journal() {
  const { t, lang } = useSite();
  const l = lang === "id" ? 0 : 1;
  return (
    <>
      <PageHeading
        eyebrow={t("Cerita & inspirasi", "Stories & inspiration")}
        title={t("Catatan dari tanah Gayo.", "Notes from Gayo.")}
        description={t(
          "Kenali asalnya. Nikmati seduhannya. Bawa pulang ceritanya.",
          "Know its origin. Enjoy the brew. Take home its story.",
        )}
      />
      <section className="section journal-grid">
        {articles.map((a) => (
          <Link key={a.slug} to="/jurnal/$slug" params={{ slug: a.slug }}>
            <img src={a.image} alt={a.title[l]} width={640} height={480} loading="lazy" />
            <p className="eyebrow mt-5 mb-3">{a.category[l]}</p>
            <h2>{a.title[l]}</h2>
            <p className="text-xs mt-5 flex gap-2 items-center">
              {t("Baca cerita", "Read story")}
              <ArrowUpRight size={15} />
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}

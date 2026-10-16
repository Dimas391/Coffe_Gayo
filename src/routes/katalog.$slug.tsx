import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MessageCircle, Minus, Plus } from "lucide-react";
import { useSite } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { orderMessage, pageMeta, products, priceFor, rupiah, sizes } from "@/lib/content";
export const Route = createFileRoute("/katalog/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) =>
    pageMeta(
      loaderData?.name || "Kopi tidak ditemukan",
      loaderData
        ? `${loaderData.name}: ${loaderData.notes}. Jelajahi profil rasa dan pilihan pesanan Kopi Gayo.`
        : "Produk tidak ditemukan di katalog Kopi Gayo.",
    ),
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="section">
      <h1 className="text-4xl">Kopi tidak ditemukan</h1>
      <Link to="/katalog">Kembali ke katalog</Link>
    </div>
  ),
});
function ProductDetail() {
  const p = Route.useLoaderData();
  const { t, lang, order } = useSite();
  const [size, setSize] = useState("250g");
  const [form, setForm] = useState(p.slug === "kopi-bubuk-tradisional" ? "Bubuk" : "Biji Utuh");
  const [roast, setRoast] = useState(p.roast);
  const [qty, setQty] = useState(1);
  return (
    <section className="section">
      <Link to="/katalog" className="flex items-center gap-2 text-xs mb-8">
        <ArrowLeft size={14} />
        {t("Kembali ke katalog", "Back to catalog")}
      </Link>
      <div className="detail-grid">
        <img className="detail-photo" src={p.image} alt={p.name} width={384} height={780} />
        <div>
          <div className="eyebrow">{p.category} · Gayo, Aceh</div>
          <h1 className="detail-title">{p.name}</h1>
          <p className="section-copy">{p.desc[lang === "id" ? 0 : 1]}</p>
          <p className="text-lg mt-5">
            {rupiah(priceFor(p, size))}
            <span className="text-xs text-muted-foreground ml-2">
              / {size} · {t("harga contoh", "sample price")}
            </span>
          </p>
          <dl className="spec-list">
            {[
              [t("Profil rasa", "Tasting notes"), p.notes],
              [t("Proses", "Process"), p.process],
              [t("Ketinggian kebun", "Altitude"), p.altitude],
              ["Acidity", p.acidity],
              ["Body", p.body],
              [t("Aroma", "Aroma"), p.aroma],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="form-grid">
            <label className="form-label">
              {t("Kemasan", "Package")}
              <select className="field" value={size} onChange={(e) => setSize(e.target.value)}>
                {sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="form-label">
              {t("Bentuk / gilingan", "Form / grind")}
              <select className="field" value={form} onChange={(e) => setForm(e.target.value)}>
                {p.slug !== "kopi-bubuk-tradisional" && (
                  <option value="Biji Utuh">{t("Biji Utuh", "Whole Beans")}</option>
                )}
                <option value="Bubuk">{t("Bubuk (Tubruk)", "Ground (Tubruk)")}</option>
                <option value="Bubuk Halus">
                  {t("Bubuk Halus (Espresso)", "Fine (Espresso)")}
                </option>
                <option value="Bubuk Medium">
                  {t("Bubuk Medium (Pour-over)", "Medium (Pour-over)")}
                </option>
              </select>
            </label>
            <label className="form-label">
              {t("Tingkat sangrai", "Roast level")}
              <select className="field" value={roast} onChange={(e) => setRoast(e.target.value)}>
                {["Light", "Medium", "Dark"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
            <div className="form-label">
              {t("Jumlah kemasan", "Quantity")}
              <div className="flex items-center border border-input h-[45px] w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("Kurangi jumlah", "Decrease quantity")}
                  disabled={qty === 1}
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  <Minus />
                </Button>
                <output className="w-14 text-center">{qty}</output>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("Tambah jumlah", "Increase quantity")}
                  onClick={() => setQty(qty + 1)}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
          <Button
            className="w-full mt-7 h-12 rounded-none"
            onClick={() => order(orderMessage(p.name, form, size, qty, roast))}
          >
            <MessageCircle />
            {t("Beli via WhatsApp", "Buy via WhatsApp")}
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            {t(
              "Profil produk dan harga contoh. Konfirmasi harga akhir, stok, dan ongkir saat pemesanan.",
              "Sample product profiles and prices. Confirm final prices, stock, and delivery when ordering.",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

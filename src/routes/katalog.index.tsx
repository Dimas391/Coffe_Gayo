import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PageHeading, useSite } from "@/components/site-shell";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { pageMeta, products, sizes } from "@/lib/content";
export const Route = createFileRoute("/katalog/")({
  head: () =>
    pageMeta(
      "Katalog Kopi",
      "Pilihan Arabica Gayo Wine, Specialty, Peaberry, Robusta dan kopi bubuk. Pilih kemasan dan pesan langsung.",
    ),
  component: Catalog,
});
function Catalog() {
  const { t } = useSite();
  const [category, setCategory] = useState("all");
  const [form, setForm] = useState("all");
  const [size, setSize] = useState("all");
  const [search, setSearch] = useState("");
  const filtered = products.filter(
    (p) =>
      (category === "all" || category === p.category) &&
      (form !== "Biji Utuh" || p.slug !== "kopi-bubuk-tradisional") &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow={t("Koleksi kopi", "Coffee collection")}
        title={t("Temukan rasa Anda.", "Find your flavour.")}
        description={t(
          "Dari karakter buah yang lembut hingga rasa yang tegas. Pilih kopi, bentuk, dan kemasan favorit Anda.",
          "From gentle fruity notes to bold flavours. Find your favourite coffee, grind, and package.",
        )}
      />
      <section className="section pt-10">
        <div className="filters">
          <label>
            {t("Jenis Kopi", "Coffee Type")}
            <select
              className="field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">{t("Semua jenis", "All types")}</option>
              <option>Arabika</option>
              <option>Robusta</option>
            </select>
          </label>
          <label>
            {t("Bentuk", "Form")}
            <select className="field" value={form} onChange={(e) => setForm(e.target.value)}>
              <option value="all">{t("Semua bentuk", "All forms")}</option>
              <option value="Biji Utuh">{t("Biji Utuh", "Whole Beans")}</option>
              <option value="Bubuk">{t("Bubuk", "Ground")}</option>
            </select>
          </label>
          <label>
            {t("Kemasan", "Package")}
            <select className="field" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="all">{t("Semua ukuran", "All sizes")}</option>
              {sizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="flex items-center gap-2">
              <Search size={12} />
              {t("Cari kopi", "Search coffee")}
            </span>
            <input
              className="field"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("Nama kopi…", "Coffee name…")}
            />
          </label>
          <Button
            variant="ghost"
            size="icon"
            title={t("Reset filter", "Reset filters")}
            onClick={() => {
              setCategory("all");
              setForm("all");
              setSize("all");
              setSearch("");
            }}
          >
            <SlidersHorizontal />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mb-7">
          {filtered.length} {t("kopi pilihan", "selected coffees")}
          {size !== "all" && ` · ${size}`}
          {form !== "all" &&
            ` · ${form === "Bubuk" ? t("Bubuk", "Ground") : t("Biji Utuh", "Whole Beans")}`}
        </p>
        {filtered.length ? (
          <div className="product-grid">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.slug}
                product={p}
                index={i}
                size={size === "all" ? "250g" : size}
                form={form}
              />
            ))}
          </div>
        ) : (
          <p className="py-12">
            {t(
              "Tidak ada kopi yang cocok dengan pilihan Anda.",
              "No coffee matches your selection.",
            )}
          </p>
        )}
        <p className="notice mt-10">
          {t(
            "Harga, profil rasa, dan foto kemasan adalah contoh untuk pratinjau. Seluruh kopi tersedia dalam pilihan 100g, 250g, dan 1kg; harga serta ketersediaan perlu dikonfirmasi toko.",
            "Prices, tasting profiles, and packaging photos are preview samples. All coffees are shown in 100g, 250g, and 1kg options; final prices and availability require store confirmation.",
          )}
        </p>
      </section>
    </>
  );
}

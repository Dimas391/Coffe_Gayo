import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Download, ArrowUpRight, Check } from "lucide-react";
import { PageHeading, useSite } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { pageMeta, products, rupiah } from "@/lib/content";
export const Route = createFileRoute("/kemitraan")({
  head: () =>
    pageMeta(
      "Kemitraan & Grosir",
      "Jalin kemitraan Kopi Gayo untuk kafe, toko oleh-oleh, dan reseller. Ajukan kebutuhan dan unduh katalog produk.",
    ),
  component: Partnership,
});
function Partnership() {
  const { t, order, lang } = useSite();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [wa, setWa] = useState("");
  const [need, setNeed] = useState("");
  const [type, setType] = useState("Reseller");
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  async function download() {
    setDownloading(true);
    setError("");
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF();
      pdf.setFontSize(22);
      pdf.text("Kopi Gayo Lhokseumawe", 20, 25);
      pdf.setFontSize(12);
      pdf.text(
        lang === "id"
          ? "Katalog Produk & Informasi Kemitraan"
          : "Product Catalog & Partnership Information",
        20,
        37,
      );
      pdf.setFontSize(10);
      pdf.text(
        lang === "id"
          ? "DRAF CONTOH - bukan penawaran harga resmi."
          : "SAMPLE DRAFT - not an official price offer.",
        20,
        48,
      );
      products.forEach((p, i) => {
        const y = 65 + i * 28;
        pdf.setFontSize(12);
        pdf.text(p.name, 20, y);
        pdf.setFontSize(10);
        pdf.text(`${p.notes} | ${p.roast} roast`, 20, y + 7);
        pdf.text(`250g: ${rupiah(p.price)} (sample retail price)`, 20, y + 14);
      });
      pdf.text("Wholesale prices, minimum order and delivery: contact store.", 20, 224);
      pdf.text("Store contact has not yet been provided.", 20, 234);
      pdf.save("Kopi-Gayo-Katalog-Contoh.pdf");
    } catch {
      setError(t("Unduhan gagal. Silakan coba lagi.", "Download failed. Please try again."));
    } finally {
      setDownloading(false);
    }
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    order(
      `Halo Kopi Gayo, saya ingin mengajukan kemitraan / partnership.\nNama / Name: ${name}\nKota / City: ${city}\nWhatsApp: ${wa}\nJenis usaha / Business: ${type}\nEstimasi kebutuhan / Estimated demand: ${need}\nMohon informasi harga grosir dan syarat kemitraan.`,
    );
  }
  return (
    <>
      <PageHeading
        eyebrow={t("Kemitraan & grosir", "Partnership & wholesale")}
        title={t("Tumbuh bersama, lewat rasa.", "Grow together, through flavour.")}
        description={t(
          "Untuk kafe, toko oleh-oleh, dan calon reseller yang ingin menghadirkan cerita Gayo kepada lebih banyak orang.",
          "For cafés, souvenir stores, and aspiring resellers who want to share Gayo’s story with more people.",
        )}
      />
      <section className="section intro-grid">
        <div>
          <h2>{t("Ruang untuk kolaborasi.", "Room to collaborate.")}</h2>
          <p className="section-copy mt-6">
            {t(
              "Ceritakan usaha dan kebutuhan Anda. Pilihan biji, bentuk gilingan, dan kemasan dapat dibicarakan bersama tim toko.",
              "Tell us about your business and needs. Bean choices, grind, and packaging can be discussed with the store team.",
            )}
          </p>
          <ul className="space-y-4 mt-7 text-sm">
            {[
              t("Pilihan Arabika dan Robusta", "Arabica and Robusta options"),
              t("Biji utuh dan kopi bubuk", "Whole beans and ground coffee"),
              t("Konsultasi kebutuhan kafe & reseller", "Café and reseller consultation"),
            ].map((s) => (
              <li key={s} className="flex gap-3">
                <Check size={17} className="text-primary" />
                {s}
              </li>
            ))}
          </ul>
          <p className="notice">
            {t(
              "Harga grosir, minimum pembelian, waktu pengiriman, dan ketentuan kemitraan belum diberikan pemilik toko. Semua pengajuan perlu dikonfirmasi sebelum disepakati.",
              "Wholesale prices, minimum orders, delivery times, and partnership terms have not been provided by the store owner. All applications require confirmation.",
            )}
          </p>
          <Button variant="outline" disabled={downloading} onClick={download}>
            <Download />
            {downloading
              ? t("Menyiapkan…", "Preparing…")
              : t("Unduh Katalog PDF (Contoh)", "Download Catalog PDF (Sample)")}
          </Button>
          {error && <p role="alert">{error}</p>}
        </div>
        <form onSubmit={submit}>
          <h2 className="mb-7">{t("Mari berkenalan.", "Let’s get acquainted.")}</h2>
          <div className="form-grid">
            <label className="form-label">
              {t("Nama lengkap", "Full name")}
              <input
                className="field"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="form-label">
              {t("Kota", "City")}
              <input
                className="field"
                required
                autoComplete="address-level2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <label className="form-label">
              {t("Nomor WhatsApp", "WhatsApp number")}
              <input
                className="field"
                required
                type="tel"
                pattern="[+0-9 ()-]{8,20}"
                placeholder="+62…"
                value={wa}
                onChange={(e) => setWa(e.target.value)}
              />
            </label>
            <label className="form-label">
              {t("Jenis usaha", "Business type")}
              <select className="field" value={type} onChange={(e) => setType(e.target.value)}>
                <option>Reseller</option>
                <option value="Kafe">{t("Kafe", "Café")}</option>
                <option value="Toko Oleh-Oleh">{t("Toko Oleh-Oleh", "Souvenir Store")}</option>
                <option value="Lainnya">{t("Lainnya", "Other")}</option>
              </select>
            </label>
          </div>
          <label className="form-label mt-5">
            {t("Estimasi kebutuhan", "Estimated demand")}
            <textarea
              className="field min-h-28"
              required
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              placeholder={t("Contoh: 10 kg Arabika per bulan", "Example: 10 kg Arabica per month")}
            />
          </label>
          <Button type="submit" className="w-full mt-6 h-12 rounded-none">
            {t("Siapkan Pengajuan via WhatsApp", "Prepare WhatsApp Application")}
            <ArrowUpRight />
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            {t(
              "Pengajuan disiapkan sebagai pesan, bukan dikirim atau disimpan otomatis.",
              "Your application is prepared as a message, not sent or saved automatically.",
            )}
          </p>
        </form>
      </section>
    </>
  );
}

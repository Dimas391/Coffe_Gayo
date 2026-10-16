import { createFileRoute } from "@tanstack/react-router";
import { MapPin, ArrowUpRight, MessageCircle, Clock, Mail } from "lucide-react";
import { PageHeading, useSite } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { business, pageMeta } from "@/lib/content";
export const Route = createFileRoute("/kontak")({
  head: () =>
    pageMeta(
      "Kunjungi Kami",
      "Informasi toko Oleh-Oleh Kopi Gayo Lhokseumawe, peta wilayah, kontak dan pemesanan kopi khas Aceh.",
    ),
  component: Contact,
});
function Contact() {
  const { t, order } = useSite();
  return (
    <>
      <PageHeading
        eyebrow={t("Kunjungi & terhubung", "Visit & connect")}
        title={t("Sampai jumpa di Lhokseumawe.", "See you in Lhokseumawe.")}
        description={t(
          "Temukan oleh-oleh yang membawa pulang aroma dan cerita Gayo.",
          "Find a souvenir that brings home the aroma and story of Gayo.",
        )}
      />
      <section className="section contact-grid">
        <div>
          <h2>{t("Toko kami.", "Our store.")}</h2>
          <div className="space-y-6 mt-8 text-sm">
            <p className="flex gap-4">
              <MapPin size={20} />
              <span>
                Lhokseumawe, Aceh, Indonesia
                <br />
                <span className="text-muted-foreground text-xs">
                  {business.address ||
                    t(
                      "Alamat lengkap menunggu konfirmasi pemilik.",
                      "Exact address pending owner confirmation.",
                    )}
                </span>
              </span>
            </p>
            <p className="flex gap-4">
              <Clock size={20} />
              <span>
                {t("Jam operasional", "Opening hours")}
                <br />
                <span className="text-muted-foreground text-xs">
                  {business.hours || t("Belum dikonfirmasi.", "Not yet confirmed.")}
                </span>
              </span>
            </p>
            <p className="flex gap-4">
              <Mail size={20} />
              <span>
                {business.email ||
                  t("Email resmi belum diberikan.", "Official email not yet provided.")}
              </span>
            </p>
          </div>
          <Button className="mt-8" onClick={() => order()}>
            <MessageCircle />
            {t("Hubungi via WhatsApp", "Contact via WhatsApp")}
          </Button>
          <h3 className="text-2xl mt-10 mb-4">{t("Temukan kami juga di", "Find us also on")}</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(business.links).map(([name, url]) =>
              url ? (
                <Button key={name} variant="outline" asChild>
                  <a href={url} target="_blank" rel="noreferrer">
                    {name}
                    <ArrowUpRight />
                  </a>
                </Button>
              ) : (
                <Button
                  key={name}
                  variant="outline"
                  disabled
                  title={t("Tautan resmi belum diberikan", "Official link not yet provided")}
                >
                  {name}
                  <ArrowUpRight />
                </Button>
              ),
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            {t(
              "Tautan toko resmi menunggu konfirmasi.",
              "Official store links await confirmation.",
            )}
          </p>
        </div>
        <div>
          <iframe
            title={t("Peta wilayah Lhokseumawe", "Map of Lhokseumawe area")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(business.address || "Lhokseumawe Aceh Indonesia")}&z=13&output=embed`}
          />
          <p className="notice">
            {t(
              "Peta menampilkan wilayah Lhokseumawe, bukan titik toko. Alamat toko belum diberikan.",
              "The map shows the Lhokseumawe area, not the store location. The store address has not been provided.",
            )}
          </p>
          <Button variant="outline" asChild>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address || "Lhokseumawe Aceh")}`}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin />
              {t("Buka Google Maps", "Open Google Maps")}
              <ArrowUpRight />
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}

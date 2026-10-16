import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Leaf, Coffee, HeartHandshake } from "lucide-react";
import { PageHeading, useSite } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/lib/content";
import harvest from "@/assets/coffee-harvest.jpg";
import landscape from "@/assets/gayo-highlands.jpg";
export const Route = createFileRoute("/tentang")({
  head: () =>
    pageMeta(
      "Cerita Kami",
      "Kenali warisan kopi Gayo, proses dari kebun hingga sangrai, dan oleh-oleh khas Lhokseumawe.",
    ),
  component: Story,
});
function Story() {
  const { t } = useSite();
  return (
    <>
      <PageHeading
        eyebrow={t("Asal, rasa, dan manusia", "Origin, flavour, and people")}
        title={t("Tanah Gayo. Rasa yang bercerita.", "Gayo soil. Flavour with a story.")}
        description={t(
          "Oleh-Oleh Kopi Gayo Lhokseumawe — sepenggal cerita Aceh untuk dibawa pulang.",
          "Oleh-Oleh Kopi Gayo Lhokseumawe — a little of Aceh to take home.",
        )}
      />
      <section className="section intro-grid">
        <img
          src={landscape}
          alt="Ilustrasi dataran tinggi Gayo"
          width={1920}
          height={1024}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div>
          <h2>{t("Berakar di Aceh.", "Rooted in Aceh.")}</h2>
          <p className="section-copy mt-6">
            {t(
              "Kopi Gayo tumbuh di dataran tinggi Aceh, tempat udara sejuk dan tanah subur bertemu. Dari kebun-kebun inilah lahir cita rasa yang dikenal oleh pencinta kopi di berbagai penjuru dunia.",
              "Gayo coffee grows in the Aceh highlands, where cool air meets fertile soil. These farms produce flavours appreciated by coffee lovers around the world.",
            )}
          </p>
          <p className="section-copy mt-4">
            {t(
              "Kami mengangkat kopi sebagai oleh-oleh yang bukan hanya dinikmati, tetapi juga dikenang. Dari biji pilihan hingga proses sangrai, perhatian pada rasa menjadi bagian dari cerita yang ingin kami bagikan.",
              "We celebrate coffee as a souvenir to be enjoyed and remembered. From selected beans to roasting, care for flavour is part of the story we share.",
            )}
          </p>
          <Button asChild variant="link" className="px-0 mt-5">
            <Link to="/katalog">
              {t("Kenali kopi kami", "Meet our coffees")}
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
      <section className="story-band">
        <img
          src={harvest}
          alt="Ilustrasi buah kopi saat panen"
          loading="lazy"
          width={1024}
          height={1024}
        />
        <div className="story-band-content">
          <div className="eyebrow">{t("Perjalanan biji", "The bean’s journey")}</div>
          <h2>
            {t("Dari tangan petani,", "From the farmer’s hands,")}
            <br />
            <em>{t("ke cangkir Anda.", "to your cup.")}</em>
          </h2>
          <p>
            {t(
              "Petik matang. Proses dengan teliti. Sangrai sesuai karakter. Setiap tahap memiliki peran dalam membangun aroma dan rasa kopi yang Anda nikmati.",
              "Pick ripe. Process carefully. Roast for character. Each stage helps shape the aroma and flavour in your cup.",
            )}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="intro-grid">
          <div>
            <h2>{t("Nilai yang kami bawa.", "Values we carry.")}</h2>
          </div>
          <div className="space-y-7">
            {[
              [
                Leaf,
                t("Keaslian asal", "Authentic origin"),
                t(
                  "Mengangkat identitas kopi dari tanah Gayo, Aceh.",
                  "Celebrating coffee from Gayo, Aceh.",
                ),
              ],
              [
                Coffee,
                t("Perhatian pada rasa", "Care for flavour"),
                t(
                  "Mengenali karakter biji dalam setiap proses dan sangrai.",
                  "Understanding each bean through processing and roasting.",
                ),
              ],
              [
                HeartHandshake,
                t("Hubungan yang tumbuh", "Growing relationships"),
                t(
                  "Menghubungkan pencinta kopi dan mitra melalui rasa.",
                  "Connecting coffee lovers and partners through flavour.",
                ),
              ],
            ].map(([Icon, title, copy], i) => {
              const C = Icon as typeof Leaf;
              return (
                <div key={i} className="flex gap-5">
                  <C size={25} strokeWidth={1.3} />
                  <div>
                    <h3 className="text-2xl">{String(title)}</h3>
                    <p className="section-copy">{String(copy)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

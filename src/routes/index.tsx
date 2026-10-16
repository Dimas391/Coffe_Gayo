import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Leaf, Coffee, Package, MapPin, Star } from "lucide-react";
import hero from "@/assets/gayo-highlands.jpg";
import harvest from "@/assets/coffee-harvest.jpg";
import { Button } from "@/components/ui/button";
import { useSite } from "@/components/site-shell";
import { ProductCard } from "@/components/product-card";
import { pageMeta, products } from "@/lib/content";
export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "Oleh-Oleh Kopi Gayo",
      "Jelajahi cita rasa kopi Gayo khas Aceh. Katalog kopi Arabika dan Robusta, cerita dataran tinggi, dan kemitraan di Lhokseumawe.",
    ),
  component: Index,
});
function Index() {
  const { t, order } = useSite();
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src={hero}
          alt="Dataran tinggi Gayo dan kebun kopi Aceh — ilustrasi"
          width={1920}
          height={1024}
          fetchPriority="high"
        />
        <div className="hero-content">
          <div className="eyebrow">
            {t(
              "Warisan rasa dari dataran tinggi Aceh",
              "A flavour heritage from the Aceh highlands",
            )}
          </div>
          <h1>
            {t("Oleh-Oleh", "A Taste of")}
            <br />
            {t("Kopi Gayo", "Gayo Coffee")}
            <em>.</em>
          </h1>
          <p className="hero-description">
            {t(
              "Dari tanah yang subur, tangan yang merawat, dan tradisi yang hidup. Bawa pulang cerita Gayo dalam setiap seduhan.",
              "From fertile soil, caring hands, and living traditions. Take home the story of Gayo in every cup.",
            )}
          </p>
          <div className="hero-actions">
            <Button variant="hero" size="lg" asChild>
              <Link to="/katalog">
                {t("Jelajahi Katalog", "Explore the Catalog")}
                <ArrowUpRight />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" onClick={() => order()}>
              {t("Pesan Sekarang", "Order Now")}
              <ArrowUpRight />
            </Button>
          </div>
        </div>
        <div className="hero-location">
          <MapPin size={14} />
          <span>
            Lhokseumawe, Aceh
            <br />
            <span className="opacity-70 text-[9px]">INDONESIA</span>
          </span>
        </div>
        <div className="hero-bottom">
          <span>GAYO HIGHLANDS · ACEH · INDONESIA</span>
          <span className="flex gap-3 items-center">
            {t("Temukan cerita kami", "Discover our story")}
            <ArrowDown size={14} />
          </span>
        </div>
      </section>
      <section className="section intro-grid">
        <div>
          <div className="eyebrow">{t("Lebih dari sekadar kopi", "More than just coffee")}</div>
          <h2>
            {t("Tanah Gayo.", "Gayo soil.")}
            <br />
            <em>{t("Rasa yang bercerita.", "Flavour with a story.")}</em>
          </h2>
        </div>
        <div>
          <p className="section-copy">
            {t(
              "Di balik setiap biji, ada kabut pegunungan, ketekunan petani, dan warisan rasa Aceh. Oleh-Oleh Kopi Gayo Lhokseumawe hadir untuk mendekatkan kekayaan itu kepada Anda — dari pilihan biji hingga seduhan terakhir.",
              "Behind every bean are mountain mists, dedicated farmers, and the flavour heritage of Aceh. Oleh-Oleh Kopi Gayo Lhokseumawe brings that richness closer to you — from selecting the beans to the last sip.",
            )}
          </p>
          <div className="values-row">
            <div className="value">
              <Leaf strokeWidth={1.3} />
              {t("Asal Gayo, Aceh", "Gayo, Aceh origin")}
            </div>
            <div className="value">
              <Coffee strokeWidth={1.3} />
              {t("Sangrai penuh perhatian", "Thoughtfully roasted")}
            </div>
            <div className="value">
              <Package strokeWidth={1.3} />
              {t("Oleh-oleh penuh makna", "A meaningful souvenir")}
            </div>
          </div>
          <Button variant="link" className="px-0 mt-5 text-xs" asChild>
            <Link to="/tentang">
              {t("Kenali cerita kami", "Read our story")}
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
      <section className="section bg-muted/40 pt-16">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{t("Pilihan dari tanah Gayo", "Selected from Gayo")}</div>
            <h2>{t("Temukan rasa Anda.", "Find your flavour.")}</h2>
          </div>
          <Button variant="link" className="px-0 text-xs" asChild>
            <Link to="/katalog">
              {t("Semua Kopi", "All Coffee")}
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>
      <section className="story-band">
        <img
          src={harvest}
          alt="Ilustrasi panen buah kopi Gayo"
          loading="lazy"
          width={1024}
          height={1024}
        />
        <div className="story-band-content">
          <div className="eyebrow">{t("Dari kebun, dengan hati", "From the farm, with heart")}</div>
          <h2>
            {t("Setiap biji,", "Every bean,")}
            <br />
            <em>{t("sebuah perjalanan.", "a journey.")}</em>
          </h2>
          <p>
            {t(
              "Dipetik, diproses, lalu disangrai dengan penuh perhatian. Sebuah perjalanan panjang untuk menghadirkan rasa yang layak dibawa pulang.",
              "Picked, processed, and thoughtfully roasted. A long journey to create a flavour worth taking home.",
            )}
          </p>
          <Button variant="heroOutline" className="mt-6" asChild>
            <Link to="/galeri">
              {t("Lihat Lebih Dekat", "Take a Closer Look")}
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{t("Cerita pelanggan", "Customer stories")}</div>
            <h2>{t("Rasa yang tinggal di ingatan.", "A flavour to remember.")}</h2>
          </div>
          <span className="text-xs text-muted-foreground">
            {t("Testimoni contoh · belum terverifikasi", "Sample reviews · not verified")}
          </span>
        </div>
        <div className="journal-grid">
          {[
            [
              t(
                "Aromanya langsung mengingatkan saya pada perjalanan ke Aceh. Oleh-oleh yang terasa istimewa.",
                "The aroma brings back my journey to Aceh. A truly special souvenir.",
              ),
              t("Wisatawan · contoh", "Traveller · sample"),
            ],
            [
              t(
                "Karakter kopi yang kaya, nikmat diseduh perlahan di rumah.",
                "Rich coffee character, perfect for a slow brew at home.",
              ),
              t("Pencinta kopi · contoh", "Coffee lover · sample"),
            ],
            [
              t(
                "Pilihan menarik untuk menghadirkan cita rasa Gayo di kafe kami.",
                "An interesting way to bring Gayo flavours to our café.",
              ),
              t("Mitra kafe · contoh", "Café partner · sample"),
            ],
          ].map(([quote, by], i) => (
            <div key={i} className="border-t border-border pt-6">
              <div className="flex gap-1 text-primary mb-4">
                {Array.from({ length: 5 }, (_, j) => (
                  <Star key={j} size={12} />
                ))}
              </div>
              <blockquote className="font-display text-2xl leading-relaxed">“{quote}”</blockquote>
              <p className="text-xs text-muted-foreground mt-5">{by}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-8">
          {t(
            "Statistik kepuasan akan ditampilkan setelah data ulasan asli tersedia.",
            "Satisfaction statistics will appear once genuine review data is available.",
          )}
        </p>
      </section>
      <section className="section text-center">
        <div className="eyebrow justify-center">{t("Tumbuh bersama", "Grow together")}</div>
        <h2>{t("Cerita baik, dibagikan bersama.", "Good stories are meant to be shared.")}</h2>
        <p className="section-copy max-w-xl mx-auto mt-6">
          {t(
            "Untuk kafe, toko oleh-oleh, dan calon reseller. Mari menghadirkan cita rasa Gayo kepada lebih banyak orang.",
            "For cafés, souvenir stores, and aspiring resellers. Let’s bring Gayo flavours to more people.",
          )}
        </p>
        <Button className="mt-7 rounded-none" size="lg" asChild>
          <Link to="/kemitraan">
            {t("Jelajahi Kemitraan", "Explore Partnerships")}
            <ArrowUpRight />
          </Link>
        </Button>
      </section>
    </>
  );
}

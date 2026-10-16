import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ZoomIn } from "lucide-react";
import { PageHeading, useSite } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/lib/content";
import landscape from "@/assets/gayo-highlands.jpg";
import harvest from "@/assets/coffee-harvest.jpg";
import collection from "@/assets/coffee-collection.jpg";
export const Route = createFileRoute("/galeri")({
  head: () =>
    pageMeta(
      "Galeri Gayo",
      "Lihat suasana dataran tinggi, panen dan ilustrasi koleksi kemasan Kopi Gayo Lhokseumawe.",
    ),
  component: Gallery,
});
function Gallery() {
  const { t } = useSite();
  const photos = [
    { image: landscape, title: t("Dataran tinggi Gayo", "Gayo highlands") },
    { image: harvest, title: t("Buah kopi saat panen", "Coffee cherry harvest") },
    { image: collection, title: t("Koleksi kemasan kopi", "Coffee packaging collection") },
  ];
  const [selected, setSelected] = useState<number | null>(null);
  const photo = selected === null ? null : photos[selected];
  return (
    <>
      <PageHeading
        eyebrow={t("Galeri", "Gallery")}
        title={t("Lihat Gayo lebih dekat.", "A closer look at Gayo.")}
        description={t(
          "Visual ilustratif untuk rancangan website. Foto kebun, toko, proses sangrai dan video asli dapat menggantikannya setelah diberikan.",
          "Illustrative visuals for the website design. Original farm, store, roasting photos and videos can replace them once provided.",
        )}
      />
      <section className="section gallery-grid">
        {photos.map((p, i) => (
          <figure key={p.title}>
            <div className="relative">
              <img src={p.image} alt={p.title} width={800} height={600} loading="lazy" />
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-3 right-3"
                aria-label={`${t("Perbesar", "Enlarge")} ${p.title}`}
                onClick={() => setSelected(i)}
              >
                <ZoomIn />
              </Button>
            </div>
            <figcaption>{p.title}</figcaption>
          </figure>
        ))}
      </section>
      <Dialog.Root
        open={photo !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content max-w-4xl w-[90%]">
            <Dialog.Title>{photo?.title}</Dialog.Title>
            <Dialog.Description className="sr-only">
              {t("Foto ilustrasi Kopi Gayo", "Kopi Gayo illustrative photograph")}
            </Dialog.Description>
            {photo && <img src={photo.image} alt={photo.title} className="w-full" />}
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3"
                aria-label={t("Tutup", "Close")}
              >
                <X />
              </Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

import { createContext, useContext, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Coffee, Menu, X, MessageCircle, Copy } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { business, whatsappLink } from "@/lib/content";

type SiteContext = {
  lang: "id" | "en";
  setLang: (lang: "id" | "en") => void;
  t: (id: string, en: string) => string;
  order: (message?: string) => void;
};
const Context = createContext<SiteContext | null>(null);
export function useSite() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Site provider missing");
  return ctx;
}
export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const t = (id: string, en: string) => (lang === "id" ? id : en);
  const order = (text?: string) => {
    setCopied(false);
    setMessage(
      text ||
        t(
          "Halo, saya ingin bertanya tentang Kopi Gayo.",
          "Hello, I would like to ask about Gayo coffee.",
        ),
    );
  };
  return (
    <Context.Provider value={{ lang, setLang, t, order }}>
      {children}
      <Dialog.Root
        open={message !== null}
        onOpenChange={(open) => {
          if (!open) setMessage(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <Dialog.Title>{t("Pesan untuk Kopi Gayo", "Message for Kopi Gayo")}</Dialog.Title>
            <Dialog.Description>
              {business.whatsapp
                ? t(
                    "Lanjutkan percakapan dengan tim kami.",
                    "Continue your conversation with our team.",
                  )
                : t(
                    "Nomor WhatsApp toko belum diberikan. Salin pesan ini; pengiriman ke toko tersedia setelah nomor resmi ditambahkan.",
                    "The store WhatsApp number has not been provided. Copy this message; direct orders will be available once the official number is added.",
                  )}
            </Dialog.Description>
            <textarea
              aria-label={t("Pesan pesanan", "Order message")}
              className="field mt-5 min-h-44"
              value={message || ""}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex flex-wrap gap-3 mt-5">
              <Button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(message || "");
                    setCopied(true);
                  } catch {
                    setCopied(false);
                  }
                }}
              >
                <Copy />
                {copied ? t("Tersalin", "Copied") : t("Salin pesan", "Copy message")}
              </Button>
              {business.whatsapp && (
                <Button asChild>
                  <a href={whatsappLink(message || "")} target="_blank" rel="noreferrer">
                    WhatsApp
                    <ArrowUpRight />
                  </a>
                </Button>
              )}
            </div>
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3"
                aria-label={t("Tutup", "Close")}
              >
                <X />
              </Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Context.Provider>
  );
}
const nav = [
  { to: "/", id: "Beranda", en: "Home" },
  { to: "/tentang", id: "Tentang Kami", en: "Our Story" },
  { to: "/katalog", id: "Katalog", en: "Catalog" },
  { to: "/kemitraan", id: "Kemitraan", en: "Partnership" },
  { to: "/jurnal", id: "Jurnal", en: "Journal" },
  { to: "/kontak", id: "Kunjungi Kami", en: "Visit Us" },
] as const;
export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Kopi Gayo Beranda">
      <span className="brand-mark">
        <Coffee size={24} strokeWidth={1.2} />
      </span>
      <span>
        <span className="brand-name">
          kopi gayo<span className="text-lg">.</span>
        </span>
        <span className="brand-sub">Oleh-Oleh · Lhokseumawe</span>
      </span>
    </Link>
  );
}
export function SiteShell({ children }: { children: ReactNode }) {
  const { t, lang, setLang, order } = useSite();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const home = path === "/";
  const [menu, setMenu] = useState(false);
  return (
    <>
      <header className={`site-header ${home ? "over-hero" : ""}`}>
        <Brand />
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {nav.map((n) => (
            <Link className="nav-link" key={n.to} to={n.to} activeOptions={{ exact: true }}>
              {t(n.id, n.en)}
            </Link>
          ))}
        </nav>
        <div className="header-controls">
          <div className="lang-controls" aria-label="Language">
            <Button
              variant="ghost"
              aria-pressed={lang === "id"}
              className={lang === "id" ? "font-bold" : "opacity-60"}
              onClick={() => setLang("id")}
            >
              ID
            </Button>
            <span className="opacity-40">/</span>
            <Button
              variant="ghost"
              aria-pressed={lang === "en"}
              className={lang === "en" ? "font-bold" : "opacity-60"}
              onClick={() => setLang("en")}
            >
              EN
            </Button>
          </div>
          <Button
            variant={home ? "heroOutline" : "outline"}
            className="header-order rounded-none text-xs"
            onClick={() => order()}
          >
            {t("Pesan Sekarang", "Order Now")}
            <ArrowUpRight />
          </Button>
          <Button
            className="mobile-toggle"
            variant="ghost"
            size="icon"
            aria-label={t("Buka menu", "Open menu")}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </div>
        {menu && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMenu(false)}>
                {t(n.id, n.en)}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <Brand />
            <p className="text-xs opacity-70 mt-5">
              {t("Sepenggal cerita Aceh, dalam setiap seduhan.", "A little of Aceh, in every cup.")}
            </p>
          </div>
          <div className="footer-links">
            <Link to="/katalog">{t("Katalog Kopi", "Coffee Catalog")}</Link>
            <Link to="/kemitraan">{t("Jadi Mitra", "Become a Partner")}</Link>
            <Link to="/galeri">{t("Galeri", "Gallery")}</Link>
            <Link to="/kontak">{t("Kontak", "Contact")}</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Oleh-Oleh Kopi Gayo Lhokseumawe.</span>
          <span>
            Aceh, Indonesia · {t("Dari tanah Gayo, dengan hati.", "From Gayo, with heart.")}
          </span>
        </div>
      </footer>
      <Button
        className="floating-chat"
        aria-label={t("Konsultasi WhatsApp", "WhatsApp consultation")}
        title="WhatsApp"
        onClick={() => order()}
      >
        <MessageCircle className="size-6" />
      </Button>
    </>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="page-heading">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}

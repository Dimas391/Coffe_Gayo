import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useSite } from "./site-shell";
import { rupiah, priceFor, type Product } from "@/lib/content";
export function ProductCard({
  product,
  index = 0,
  size = "250g",
  form = "all",
}: {
  product: Product;
  index?: number;
  size?: string;
  form?: string;
}) {
  const { t } = useSite();
  return (
    <Link to="/katalog/$slug" params={{ slug: product.slug }} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} width={384} height={480} loading="lazy" />
        <span className="product-tag">
          {index === 0 ? t("Pilihan Favorit", "Our Favourite") : product.category}
        </span>
      </div>
      <h3>{product.name.replace("Arabica ", "")}</h3>
      <p className="product-meta">
        {product.notes}
        <br />
        {product.roast} Roast · {size}
        {form !== "all" && ` · ${form}`}
      </p>
      <div className="product-foot">
        <span>
          {rupiah(priceFor(product, size))}{" "}
          <span className="text-muted-foreground text-[9px]">{t("contoh", "sample")}</span>
        </span>
        <ArrowUpRight size={19} strokeWidth={1.2} />
      </div>
    </Link>
  );
}

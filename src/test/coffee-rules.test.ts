import { describe, expect, it } from "vitest";
import { orderMessage, sizes } from "@/lib/content";
describe("Coffee ordering rules from PRD", () => {
  it("offers the specified 100g, 250g and 1kg package sizes", () => {
    expect([...sizes]).toEqual(["100g", "250g", "1kg"]);
  });
  it("prepares WhatsApp messages with the selected product, grind and quantity", () => {
    const msg = orderMessage("Arabica Gayo Wine", "Bubuk Halus", "250g", 3, "Medium");
    expect(msg).toContain("Produk: Arabica Gayo Wine");
    expect(msg).toContain("Bentuk: Bubuk Halus");
    expect(msg).toContain("Jumlah: 3");
  });
});

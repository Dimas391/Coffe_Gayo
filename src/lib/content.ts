import coffee1 from "@/assets/coffee-1.jpg";
import coffee2 from "@/assets/coffee-2.jpg";
import coffee3 from "@/assets/coffee-3.jpg";
import coffee4 from "@/assets/coffee-4.jpg";
import harvest from "@/assets/coffee-harvest.jpg";
import landscape from "@/assets/gayo-highlands.jpg";
import collection from "@/assets/coffee-collection.jpg";

export const business = {
  whatsapp: "",
  address: "",
  hours: "",
  email: "",
  links: { Shopee: "", Tokopedia: "", Instagram: "", "TikTok Shop": "" },
};
export const products = [
  {
    slug: "arabica-gayo-wine",
    name: "Arabica Gayo Wine",
    category: "Arabika",
    image: coffee1,
    price: 85000,
    notes: "Berry · Wine · Dark chocolate",
    process: "Wine / Natural",
    roast: "Medium",
    altitude: "1.200–1.600 mdpl",
    acidity: "Bright",
    body: "Medium",
    aroma: "Fruity",
    desc: [
      "Karakter buah yang ekspresif, aroma fermentasi khas wine, dan akhir rasa cokelat yang lembut.",
      "Expressive fruit character, distinctive wine-like aroma, and a smooth chocolate finish.",
    ],
  },
  {
    slug: "arabica-gayo-specialty",
    name: "Arabica Gayo Specialty",
    category: "Arabika",
    image: coffee2,
    price: 75000,
    notes: "Citrus · Caramel · Floral",
    process: "Full Washed",
    roast: "Medium",
    altitude: "1.200–1.600 mdpl",
    acidity: "Balanced",
    body: "Medium",
    aroma: "Floral",
    desc: [
      "Secangkir Gayo yang seimbang, dengan sentuhan citrus segar dan manis karamel.",
      "A balanced Gayo cup with fresh citrus and caramel sweetness.",
    ],
  },
  {
    slug: "arabica-gayo-peaberry",
    name: "Arabica Gayo Peaberry",
    category: "Arabika",
    image: coffee3,
    price: 95000,
    notes: "Honey · Nutty · Chocolate",
    process: "Honey",
    roast: "Medium",
    altitude: "1.200–1.600 mdpl",
    acidity: "Gentle",
    body: "Full",
    aroma: "Sweet",
    desc: [
      "Biji tunggal pilihan dengan rasa manis madu, aroma kacang, dan body yang kaya.",
      "Selected single beans with honey sweetness, nutty aroma, and a rich body.",
    ],
  },
  {
    slug: "robusta-gayo",
    name: "Robusta Gayo",
    category: "Robusta",
    image: coffee4,
    price: 45000,
    notes: "Earthy · Cacao · Spices",
    process: "Natural",
    roast: "Dark",
    altitude: "600–1.000 mdpl",
    acidity: "Low",
    body: "Full",
    aroma: "Spiced",
    desc: [
      "Rasa tegas dan penuh, cocok untuk kopi tubruk khas Aceh dan campuran susu.",
      "Bold and full-bodied, ideal for traditional Acehnese coffee and milk drinks.",
    ],
  },
  {
    slug: "kopi-bubuk-tradisional",
    name: "Kopi Bubuk Tradisional",
    category: "Robusta",
    image: coffee4,
    price: 35000,
    notes: "Cacao · Roasted nuts",
    process: "Natural",
    roast: "Dark",
    altitude: "600–1.000 mdpl",
    acidity: "Low",
    body: "Full",
    aroma: "Roasted",
    desc: [
      "Kopi giling untuk menikmati tradisi seduhan tubruk di rumah.",
      "Ground coffee for enjoying traditional immersion brewing at home.",
    ],
  },
];
export type Product = (typeof products)[number];
export const sizes = ["100g", "250g", "1kg"] as const;
export function priceFor(product: Product, size: string) {
  return Math.round(product.price * (size === "100g" ? 0.4 : size === "1kg" ? 4 : 1));
}
export function rupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
export function orderMessage(
  name: string,
  grind: string,
  size: string,
  quantity: number,
  roast: string,
) {
  return `Halo Kopi Gayo, saya ingin memesan:\nProduk: ${name}\nBentuk: ${grind}\nKemasan: ${size}\nSangrai: ${roast}\nJumlah: ${quantity}\nMohon konfirmasi harga dan ketersediaannya. / Please confirm price and availability.`;
}
export function whatsappLink(message: string) {
  return `https://wa.me/${business.whatsapp ? business.whatsapp : ""}?text=${encodeURIComponent(message)}`;
}
export function pageMeta(title: string, description: string) {
  return {
    meta: [
      { title: `${title} — Kopi Gayo Lhokseumawe` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — Kopi Gayo Lhokseumawe` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
export const articles = [
  {
    slug: "dari-dataran-tinggi-gayo",
    title: ["Dari dataran tinggi, untuk dunia.", "From the highlands, to the world."],
    image: landscape,
    category: ["Asal & Tradisi", "Origin & Tradition"],
    paragraphs: [
      [
        "Di jantung Aceh, dataran tinggi Gayo merupakan salah satu wilayah penghasil kopi Arabika yang dikenal luas. Udara sejuk, bentang pegunungan, dan perhatian para petani membentuk karakter kopi yang khas.",
        "Kopi bukan sekadar hasil kebun. Bagi masyarakat Gayo, kopi hadir dalam pertemuan, percakapan, dan kehidupan sehari-hari. Setiap seduhan membawa cerita tanah asalnya.",
        "Karakter setiap lot dapat berbeda menurut kebun, musim, proses pascapanen, dan sangrai. Jelajahi katalog dan pilih profil rasa yang paling dekat dengan selera Anda.",
      ],
      [
        "In the heart of Aceh, the Gayo highlands are a renowned Arabica-growing region. Cool air, mountain landscapes, and attentive farmers shape its distinctive coffee.",
        "Coffee is more than a crop. For Gayo communities, it accompanies gatherings, conversations, and everyday life. Every brew carries a story of its origin.",
        "Each lot varies with farm, season, processing, and roast. Explore our catalog to find a flavour profile that suits your taste.",
      ],
    ],
  },
  {
    slug: "panduan-seduh-kopi",
    title: ["Seduhan yang baik, dimulai di rumah.", "A good brew begins at home."],
    image: collection,
    category: ["Panduan Seduh", "Brew Guide"],
    paragraphs: [
      [
        "Mulailah dengan kopi segar dan air bersih. Untuk seduhan filter, rasio 15 gram kopi dengan 250 ml air dapat menjadi titik awal, lalu sesuaikan dengan selera.",
        "Gunakan gilingan sedang untuk pour-over. Tuang sedikit air untuk membasahi kopi, tunggu sekitar 30 detik, lalu lanjutkan menuang perlahan dengan gerakan melingkar.",
        "Jika terasa terlalu pahit, coba gilingan lebih kasar. Jika terasa tipis atau terlalu asam, coba gilingan sedikit lebih halus. Ubah satu variabel setiap kali untuk mengenali hasilnya.",
      ],
      [
        "Start with fresh coffee and clean water. For filter coffee, 15 grams of coffee to 250 ml of water is a useful starting point; adjust to taste.",
        "Use a medium grind for pour-over. Wet the grounds with a little water, wait around 30 seconds, then pour slowly in circles.",
        "If the coffee tastes too bitter, try a coarser grind. If it tastes thin or too sour, try a slightly finer grind. Change one variable at a time.",
      ],
    ],
  },
  {
    slug: "oleh-oleh-dari-aceh",
    title: ["Bawa pulang sepenggal cerita Aceh.", "Take home a little of Aceh."],
    image: harvest,
    category: ["Cerita Aceh", "Aceh Stories"],
    paragraphs: [
      [
        "Oleh-oleh yang berkesan memiliki cerita. Kopi Gayo menjadi pilihan bagi Anda yang ingin membagikan cita rasa Aceh kepada keluarga dan sahabat.",
        "Untuk pencinta kopi yang menggiling sendiri, pilih biji utuh. Untuk hadiah yang praktis, pilih bubuk sesuai metode seduh penerimanya.",
        "Simpan kopi di tempat sejuk, kering, dan jauh dari cahaya langsung. Tutup kemasan setelah digunakan agar aromanya terjaga.",
      ],
      [
        "A memorable souvenir tells a story. Gayo coffee lets you share the flavours of Aceh with family and friends.",
        "Choose whole beans for those who grind their own coffee, or ground coffee matched to the recipient’s brewing method for a practical gift.",
        "Store coffee in a cool, dry place away from direct light. Reseal the pouch after use to preserve its aroma.",
      ],
    ],
  },
];

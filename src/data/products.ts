// Seed catalogue, taken from the live shop. Replace with the Firestore `Products` collection later.

export type ProductCategory = "hoodie" | "bags" | "t-shirt" | "bottles";

export type Product = {
  slug: string;
  code: string;
  name: string;
  category: ProductCategory;
  /** Selling price in rupees. */
  price: number;
  /** Original price in rupees, shown struck through. */
  mrp: number;
  description: string;
  /** Short spec list shown under the description on the product page. */
  details?: string[];
  sizes?: string[];
  image?: string;
  inStock: boolean;
};

export const productCategories: { value: "all" | ProductCategory; label: string }[] = [
  { value: "all", label: "All products" },
  { value: "hoodie", label: "Hoodies" },
  { value: "bags", label: "Bags" },
  { value: "t-shirt", label: "T-shirts" },
  { value: "bottles", label: "Bottles" },
];

export const products: Product[] = [
  {
    slug: "rc-tote-bag",
    code: "RC-BAG-001",
    name: "RC Tote Bag",
    category: "bags",
    price: 199,
    mrp: 299,
    description:
      "An everyday black tote with the Rogue Code logo printed on the front. Carry your notebook and everyday essentials to class, the office or a weekend coding sprint.",
    details: [
      "Black with the Rogue Code logo in gold and white",
      "Long shoulder handles",
      "Material: [e.g. 100% cotton canvas]",
      "Size: [e.g. 38 × 42 cm]",
      "Care: [e.g. hand wash cold, do not iron the print]",
    ],
    image: "/images/shop/rc-tote-bag.jpg",
    inStock: true,
  },
  {
    slug: "plain-rc-tshirt",
    code: "RC-TEE-001",
    name: "Plain RC T-shirt",
    category: "t-shirt",
    price: 499,
    mrp: 600,
    description:
      "A clean black crew-neck tee with a small Rogue Code logo on the chest. Simple enough for every day and comfortable enough for a long day of classes or a late-night build.",
    details: [
      "Black crew neck, short sleeves",
      "Rogue Code logo printed on the left chest",
      "Fabric: [e.g. 100% cotton, 180 GSM]",
      "Fit: [e.g. regular fit; size up for a relaxed look]",
      "Care: [e.g. machine wash cold, wash inside out]",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/images/shop/rc-tshirt.jpg",
    inStock: true,
  },
];

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
      "[Product description — material, size and print details for the Rogue Code tote bag.]",
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
      "[Product description — fabric, fit and print details for the Rogue Code t-shirt.]",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/images/shop/rc-tshirt.jpg",
    inStock: true,
  },
];

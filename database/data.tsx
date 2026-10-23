// database/data.tsx

export const CATEGORIES = [
  { name: "Woody", image: "/Categories/woody.jpg" },
  { name: "Floral", image: "/Categories/floral.jpg" },
  { name: "Fresh", image: "/Categories/fresh.jpg" },
  { name: "Oriental", image: "/Categories/oriental.jpg" },
  { name: "Citrus", image: "/Categories/citrus.jpg" },
  { name: "Musk", image: "/Categories/musk.jpg" },
];

export const products = [
  {
    id: "imperial-pineapple",
    name: "Imperial Pineapple",
    inspiredBy: "Aventus Creed",
    prices: { "30ml": 1999, "50ml": 2499, "100ml": 3999 },
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742002/Imperial.jpg",
  },
  {
    id: "midnight",
    name: "Midnight",
    inspiredBy: "Azzaro Most Wanted",
    prices: { "30ml": 1599, "50ml": 1999, "100ml": 2999 },
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742002/midnight.jpg",
  },
  {
    id: "crystal",
    name: "Crystal",
    inspiredBy: "Baccarat Rouge-540",
    prices: { "30ml": 1999, "50ml": 2499, "100ml": 3999 },
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742001/Crystal.jpg",
  },
  {
    id: "blue-horizon",
    name: "Blue Horizon",
    inspiredBy: "Bleu De Chanel",
    prices: { "30ml": 1399, "50ml": 1899, "100ml": 2699 },
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742001/blue-horizon.jpg",
  },
  {
    id: "crimson-desire",
    name: "Crimson Desire",
    inspiredBy: "Dunhill Desire",
    prices: { "30ml": 1399, "50ml": 1899, "100ml": 2799 },
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742001/Crimson-desire.jpg",
  },
  {
    id: "blossom-kiss",
    name: "Blossom Kiss",
    inspiredBy: "Gucci Flora",
    prices: { "30ml": 1499, "50ml": 1999, "100ml": 2999 },
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742001/Blossom-kiss.jpg",
  },
  {
    id: "emerald",
    name: "Emerald",
    inspiredBy: "Nishane Hacivat",
    prices: { "30ml": 1999, "50ml": 2499, "100ml": 3999 },
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742001/Emerald.jpg",
  },
  {
    id: "millionaire",
    name: "Millionaire",
    inspiredBy: "One Million",
    prices: { "30ml": 1399, "50ml": 1899, "100ml": 2799 },
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742002/millionaire.jpg",
  },
  {
    id: "velvet-plum",
    name: "Velvet Plum",
    inspiredBy: "Pure Seduction",
    prices: { "30ml": 1299, "50ml": 1699, "100ml": 2599 },
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742002/velvet-plum.jpg",
  },
  {
    id: "blue-storm",
    name: "Blue Storm",
    inspiredBy: "Sauvage Dior",
    prices: { "30ml": 1350, "50ml": 1799, "100ml": 2699 },
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742001/blue-storm.jpg",
  },
  {
    id: "afterglow",
    name: "Afterglow",
    inspiredBy: "Thomas Kosmala No-4",
    prices: { "30ml": 1799, "50ml": 2299, "100ml": 3799 },
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742001/Afterglow.jpg",
  },
  {
    id: "mountain",
    name: "Mountain",
    inspiredBy: "Hugo Boss Bottled",
    prices: { "30ml": 1350, "50ml": 1799, "100ml": 2699 },
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792763184/Mountain.jpg",
  }
];

export const COLLECTIONS = [
  { id: 1, title: "Best Perfumes For Men", image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742035/bottle-01.png", bgClass: "bg-gray-300" },
  { id: 2, title: "Best Perfumes For Women", image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742035/bottle-01.png", bgClass: "bg-[#e4d3d3]" },
  { id: 3, title: "Gift Box", image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742035/bottle-01.png", bgClass: "bg-red-900" },
];

export const SCENT_ARTICLES = [
  {
    id: 1,
    title: "The Art of Layering Fragrances",
    category: "Guides",
    date: "Oct 24, 2025",
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742035/bottle-01.png",
    content: "Layering perfumes is an art that allows you to create a truly unique signature scent. Start with a heavy base like Oud or Musk, and top it off with lighter citrus or floral notes to create depth and longevity."
  },
  {
    id: 2,
    title: "Why 'Nayab' Scents Last Longer",
    category: "Behind the Scenes",
    date: "Nov 02, 2025",
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742035/bottle-01.png",
    content: "Our formulation process involves a higher concentration of perfume oils compared to standard market fragrances. We steep our blends for weeks to ensure maturity and projection that lasts 12+ hours."
  },
  {
    id: 3,
    title: "Top 5 Winter Fragrances for 2026",
    category: "Trends",
    date: "Jan 15, 2026",
    image: "https://res.cloudinary.com/lrskxjqs/image/upload/v1792742035/bottle-01.png",
    content: "As the temperature drops, warm and spicy notes take center stage. Discover our top picks featuring Amber, Vanilla, and Tobacco notes that provide a cozy yet sophisticated aura."
  }
];

export const PERFUME_FAQS = [
  {
    question: "How long does Nayab Scents perfume last?",
    answer: "Our premium perfumes are formulated as Extrait de Parfum or High-Concentration EDP, designed to last typically 8-12 hours on skin and even longer on fabric, depending on environmental conditions."
  },
  {
    question: "Are these original fragrances?",
    answer: "Nayab Scents creates premium high-quality impressions and original blends using imported oils. We ensure 98% match with designer notes but with enhanced longevity."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 'Open Parcel' policy. You can check your parcel upon delivery. If the bottle is damaged or leaked, you can return it immediately to the rider."
  },
  {
    question: "How should I store my perfume?",
    answer: "To maintain the quality of your Nayab Scent, store the bottle in a cool, dry place away from direct sunlight and humidity. A wardrobe or dresser drawer is ideal."
  },
  {
    question: "Do you offer testers or samples?",
    answer: "Yes! We offer a 'Discovery Box' which contains 5 miniature bottles of our best-sellers so you can try them before committing to a full-size bottle."
  }
];

export const WHATSAPP_NUMBER = "923176402959";
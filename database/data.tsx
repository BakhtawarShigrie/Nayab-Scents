// database/data.tsx

export const CATEGORIES = [
  { name: "Woody", image: "/bottle-01.png" },
  { name: "Floral", image: "/bottle-01.png" },
  { name: "Fresh", image: "/bottle-01.png" },
  { name: "Oriental", image: "/bottle-01.png" },
  { name: "Citrus", image: "/bottle-01.png" },
  { name: "Musk", image: "/bottle-01.png" },
];

export const PRODUCTS = [
  { 
    id: 1, 
    title: "Classic Nayab", 
    prices: { "30 ml": "Rs.2,999", "50 ml": "Rs.4,500", "100 ml": "Rs.8,000" }, 
    image: "/bottle-01.png", 
    category: "Woody", 
    gender: "Men",
    stock: 734 // Random stock 500-1000
  },
  { 
    id: 2, 
    title: "Royal Scent", 
    prices: { "30 ml": "Rs.3,500", "50 ml": "Rs.5,200", "100 ml": "Rs.9,500" },
    image: "/bottle-01.png", 
    category: "Floral", 
    gender: "Women",
    stock: 912 
  },
  { 
    id: 3, 
    title: "Azure Mist", 
    prices: { "30 ml": "Rs.5,650", "50 ml": "Rs.8,500", "100 ml": "Rs.15,000" },
    image: "/bottle-01.png", 
    category: "Fresh", 
    gender: "Unisex",
    stock: 567 
  },
  { 
    id: 4, 
    title: "Velvet Oud", 
    prices: { "30 ml": "Rs.7,600", "50 ml": "Rs.11,000", "100 ml": "Rs.20,000" },
    image: "/bottle-01.png", 
    category: "Oriental", 
    gender: "Unisex",
    stock: 889 
  },
  { 
    id: 5, 
    title: "Mystic Musk", 
    prices: { "30 ml": "Rs.3,200", "50 ml": "Rs.4,800", "100 ml": "Rs.8,500" },
    image: "/bottle-01.png", 
    category: "Musk", 
    gender: "Unisex",
    stock: 645 
  },
];

export const COLLECTIONS = [
  { id: 1, title: "Best Perfumes For Men", image: "/bottle-01.png", bgClass: "bg-gray-300" },
  { id: 2, title: "Best Perfumes For Women", image: "/bottle-01.png", bgClass: "bg-[#e4d3d3]" },
  { id: 3, title: "Gift Box", image: "/bottle-01.png", bgClass: "bg-red-900" },
];

export const SCENT_ARTICLES = [
  {
    id: 1,
    title: "The Art of Layering Fragrances",
    category: "Guides",
    date: "Oct 24, 2025",
    image: "/bottle-01.png",
    content: "Layering perfumes is an art that allows you to create a truly unique signature scent. Start with a heavy base like Oud or Musk, and top it off with lighter citrus or floral notes to create depth and longevity."
  },
  {
    id: 2,
    title: "Why 'Nayab' Scents Last Longer",
    category: "Behind the Scenes",
    date: "Nov 02, 2025",
    image: "/bottle-01.png",
    content: "Our formulation process involves a higher concentration of perfume oils compared to standard market fragrances. We steep our blends for weeks to ensure maturity and projection that lasts 12+ hours."
  },
  {
    id: 3,
    title: "Top 5 Winter Fragrances for 2026",
    category: "Trends",
    date: "Jan 15, 2026",
    image: "/bottle-01.png",
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
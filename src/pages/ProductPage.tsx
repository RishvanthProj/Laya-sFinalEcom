import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Star, Truck, RotateCcw, ShieldCheck, Heart, Minus, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import defaultImage from "@/assets/hero.jpg"; // Using a generic fallback image

// Helper to format slug to title (e.g. "floral-embroidered-tote" -> "Floral Embroidered Tote")
const formatTitle = (slug?: string) => {
  if (!slug) return "Product Details";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ProductPage = () => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const state = location.state as { img?: string; price?: string; color?: string } | null;

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(state?.img || defaultImage);

  // Parse price from state or fallback to default
  const priceStr = state?.price?.replace(/[^0-9]/g, '') || "849";
  const basePrice = parseInt(priceStr, 10);
  const originalPrice = Math.round(basePrice * 1.4);

  // In a real app, you would fetch product data based on `id`.
  const product = {
    title: formatTitle(id),
    category: "WOMEN'S",
    price: basePrice,
    originalPrice: originalPrice,
    savings: originalPrice - basePrice,
    rating: 4.8,
    reviews: 124,
    description: "Crafted from premium cotton canvas with intricate hand-embroidery, this tote bag celebrates traditional artisanship. Spacious enough for daily essentials with an inner zip pocket. Reinforced handles ensure comfortable carrying throughout the day.",
    images: state?.img ? [state.img, state.img] : [defaultImage, defaultImage], // Array of images for thumbnails
  };

  useEffect(() => {
    // Reset state when id changes
    setQuantity(1);
    setMainImage(state?.img || defaultImage);
    window.scrollTo(0, 0);
  }, [id, state?.img]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          
          {/* Left Column: Images */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="relative aspect-[4/5] w-full bg-[#f4f2eb] rounded-sm overflow-hidden">
              <span className="absolute top-4 left-4 z-10 bg-[#C18F76] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                Bestseller
              </span>
              {state?.color && !state?.img ? (
                <div className={`w-full h-full ${state.color}`} />
              ) : (
                <img 
                  src={mainImage} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-24 border-2 transition-all ${mainImage === img ? 'border-[#C18F76]' : 'border-transparent hover:border-gray-300'}`}
                >
                  {state?.color && !state?.img ? (
                    <div className={`w-full h-full ${state.color}`} />
                  ) : (
                    <img src={img} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="w-full md:w-1/2 flex flex-col">
            <p className="text-[#C18F76] text-xs font-bold tracking-[0.2em] uppercase mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-[#2C2C2A] mb-4">
              {product.title}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-[#C18F76]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i >= Math.floor(product.rating) ? "text-gray-300" : ""} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
            </div>
            
            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl text-[#2C2C2A]">₹{product.price}</span>
              <span className="text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="text-emerald-600 text-sm font-medium">You save ₹{product.savings}</span>
            </div>
            
            {/* Short Description */}
            <p className="text-[#666] text-sm leading-relaxed mb-8">
              Handcrafted floral tote that carries your essentials in effortless style.
            </p>
            
            <hr className="border-gray-200 mb-8" />
            
            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded-sm">
                <button onClick={handleDecrease} className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors">
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <button onClick={handleIncrease} className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-1 bg-[#C18F76] hover:bg-[#A6755D] text-white py-3 px-6 rounded-sm text-[11px] font-bold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2">
                Add to Cart
              </button>
              <button className="flex-1 bg-transparent border border-gray-300 hover:border-gray-800 text-gray-800 py-3 px-6 rounded-sm text-[11px] font-bold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2">
                <Heart size={16} />
                Add to Wishlist
              </button>
            </div>
            
            {/* Features list */}
            <div className="flex flex-col gap-2 mb-8 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-[#4ea88f]" />
                <span>Free delivery on this order · Ships in 2-3 days</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={14} className="text-[#4ea88f]" />
                <span>Easy 7-day returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#4ea88f]" />
                <span>Secure checkout</span>
              </div>
            </div>
            
            <hr className="border-gray-200 mb-4" />
            
            {/* Accordions */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-gray-200">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                  Product Description
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-gray-200">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                  Materials & Care
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                  • 100% Premium Cotton Canvas
                  <br />• Hand-embroidered floral details
                  <br />• Spot clean only with mild detergent
                  <br />• Do not machine wash or tumble dry
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b border-gray-200">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                  We offer free standard shipping on all orders. Expedited shipping is available at checkout. 
                  Returns are accepted within 7 days of delivery for a full refund, provided the item is in its 
                  original condition and packaging.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;

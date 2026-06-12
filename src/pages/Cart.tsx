import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import notebook from "@/assets/p-notebook.jpg";
import earrings from "@/assets/p-earrings.jpg";

const CartPage = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Linen Bound Journal", price: 649, qty: 1, img: notebook },
    { id: 2, name: "Pearl Stud Earrings", price: 499, qty: 2, img: earrings },
  ]);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const updateQty = (id: number, delta: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col" data-theme="home">
      <Navbar cartCount={items.length} />
      
      <main className="flex-1 container mx-auto px-4 py-10 md:py-12">
        <h1 className="font-serif text-3xl mb-6 md:text-4xl md:mb-8">Your Cart</h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[80px_1fr] gap-4 pb-6 border-b border-border sm:flex sm:items-center sm:gap-6">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary sm:w-24 sm:h-24">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-base sm:text-lg">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">Default variant</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-md">
                        <button onClick={() => updateQty(item.id, -1)} className="p-2 hover:bg-secondary transition-colors">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 font-medium">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-2 hover:bg-secondary transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 text-left sm:text-right">
                    <p className="font-bold text-lg">₹{item.price * item.qty}</p>
                    <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                  </div>
                </div>
              ))}

              {/* Suggestions */}
              <div className="mt-16">
                <h2 className="font-serif text-2xl mb-6">You might also like</h2>
                <div className="scroll-row">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-[46vw] max-w-48 flex-shrink-0 group">
                      <div className="aspect-square bg-secondary rounded-lg mb-2 overflow-hidden">
                        <div className="w-full h-full bg-neutral-200 group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <p className="text-sm font-medium">Coming Soon Item {i}</p>
                      <p className="text-sm text-muted-foreground">₹299</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
              <div className="bg-secondary/20 p-5 rounded-lg md:p-8">
                <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping Estimate</span>
                    <span className="font-medium">₹99</span>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="mb-2 text-muted-foreground">Discount Code</div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input 
                        type="text" 
                        placeholder="Enter code" 
                        className="flex-1 px-4 py-2 border border-border rounded-sm bg-white"
                      />
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-sm text-sm">Apply</button>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{subtotal + 99}</span>
                  </div>
                </div>
                <a 
                  href="/checkout"
                  className="block w-full mt-8 bg-[#2C2C2A] text-white text-center py-4 font-bold rounded-sm hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <ShoppingBag className="w-24 h-24 text-muted-foreground opacity-20" />
            <h2 className="text-2xl font-serif">Your cart is empty</h2>
            <a href="/" className="px-8 py-3 bg-[#2C2C2A] text-white font-bold rounded-sm hover:scale-105 transition-transform">
              Start Shopping
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;

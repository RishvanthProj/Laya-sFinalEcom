import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CreditCard, Truck, ShieldCheck, RefreshCcw, Lock, ChevronLeft, CreditCard as VisaIcon } from "lucide-react";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(2); // Progress bar indicator

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" data-theme="home">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-10">
        {/* Progress Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-secondary -z-10" />
            {[
              { id: 1, label: "Cart" },
              { id: 2, label: "Details" },
              { id: 3, label: "Payment" }
            ].map((s) => (
              <div key={s.id} className="bg-white px-2 flex flex-col items-center sm:px-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s.id ? "bg-[#C1602B] text-white" : "bg-secondary text-muted-foreground"}`}>
                  {s.id}
                </div>
                <span className={`text-[9px] uppercase tracking-[0.12em] mt-2 font-medium sm:text-[10px] sm:tracking-widest ${step >= s.id ? "text-[#C1602B]" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-7 space-y-9 md:space-y-12">
            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-[10px]">1</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="floating-label-group">
                  <input type="email" id="email" placeholder=" " required />
                  <label htmlFor="email">Email Address</label>
                </div>
                <div className="floating-label-group">
                  <input type="tel" id="phone" placeholder=" " required />
                  <label htmlFor="phone">Phone Number</label>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-[10px]">2</span>
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="floating-label-group">
                    <input type="text" id="fname" placeholder=" " required />
                    <label htmlFor="fname">First Name</label>
                  </div>
                  <div className="floating-label-group">
                    <input type="text" id="lname" placeholder=" " required />
                    <label htmlFor="lname">Last Name</label>
                  </div>
                </div>
                <div className="floating-label-group">
                  <input type="text" id="address" placeholder=" " required />
                  <label htmlFor="address">Street Address</label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="floating-label-group">
                    <input type="text" id="city" placeholder=" " required />
                    <label htmlFor="city">City</label>
                  </div>
                  <div className="floating-label-group">
                    <input type="text" id="state" placeholder=" " required />
                    <label htmlFor="state">State</label>
                  </div>
                  <div className="floating-label-group">
                    <input type="text" id="pincode" placeholder=" " required />
                    <label htmlFor="pincode">Pincode</label>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-[10px]">3</span>
                Delivery Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative flex p-4 border border-[#C1602B] bg-[#C1602B]/5 rounded-sm cursor-pointer">
                  <input type="radio" name="delivery" defaultChecked className="hidden" />
                  <Truck className="w-5 h-5 text-[#C1602B] mr-4" />
                  <div>
                    <span className="block font-bold">Standard Delivery</span>
                    <span className="text-xs text-muted-foreground">3-5 business days</span>
                  </div>
                  <span className="ml-auto font-bold text-sm">₹99</span>
                </label>
                <label className="relative flex p-4 border border-border rounded-sm cursor-pointer transition-colors hover:bg-secondary/20">
                  <input type="radio" name="delivery" className="hidden" />
                  <Truck className="w-5 h-5 text-muted-foreground mr-4" />
                  <div>
                    <span className="block font-bold">Express Delivery</span>
                    <span className="text-xs text-muted-foreground">1-2 business days</span>
                  </div>
                  <span className="ml-auto font-bold text-sm">₹249</span>
                </label>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-[10px]">4</span>
                Payment
              </h2>
              <div className="p-6 border border-border rounded-sm bg-secondary/5 space-y-4">
                <div className="floating-label-group">
                  <input type="text" id="card" placeholder=" " required />
                  <label htmlFor="card">Card Number</label>
                  <VisaIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-600 opacity-60" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="floating-label-group">
                    <input type="text" id="expiry" placeholder=" " required />
                    <label htmlFor="expiry">Expiry (MM/YY)</label>
                  </div>
                  <div className="floating-label-group">
                    <input type="text" id="cvv" placeholder=" " required />
                    <label htmlFor="cvv">CVV</label>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF9F6] p-5 border border-border rounded-sm lg:sticky lg:top-24 md:p-8">
              <h2 className="text-xl font-serif mb-6">Order Summary</h2>
              
              {/* Mini Item List */}
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-neutral-200 rounded-sm relative">
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-white text-[10px] rounded-full flex items-center justify-center">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Linen Bound Journal</p>
                    <p className="text-xs text-muted-foreground">Standard variant</p>
                  </div>
                  <p className="text-sm font-bold">₹649</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹649</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>₹99</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4">
                  <span>Total</span>
                  <span>₹748</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                className="w-full mt-8 bg-[#2C2C2A] text-white py-4 font-bold rounded-sm transition-all hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Place Order
                  </>
                )}
              </button>

              {/* Trust badges */}
              <div className="mt-6 flex items-center justify-between pt-6 border-t border-border opacity-60">
                <div className="flex flex-col items-center gap-1">
                  <Lock className="w-4 h-4" />
                  <span className="text-[9px] uppercase tracking-tighter">Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[9px] uppercase tracking-tighter">Buyer Protection</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCcw className="w-4 h-4" />
                  <span className="text-[9px] uppercase tracking-tighter">Easy Returns</span>
                </div>
              </div>
            </div>
            
            <a href="/cart" className="flex items-center gap-2 mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors justify-center">
              <ChevronLeft className="w-4 h-4" />
              Return to Cart
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;

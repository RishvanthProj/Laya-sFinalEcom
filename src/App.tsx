import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import CartPage from "./pages/Cart.tsx";
import CheckoutPage from "./pages/Checkout.tsx";
import PromoCollectionPage from "./pages/PromoCollectionPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/Laya-sFinalEcom/">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/shop/:collection" element={<PromoCollectionPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/category/:category/:subcategory" element={<CategoryPage />} />
          <Route path="/category/:category/:subcategory/:item" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

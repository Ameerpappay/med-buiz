import { useCallback, useState } from "react";
import { InquiryProvider } from "./components/inquiry/InquiryContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { TrustBar } from "./components/sections/TrustBar";
import { ProductLines } from "./components/sections/ProductLines";
import { Catalog } from "./components/sections/Catalog";
import { Quality } from "./components/sections/Quality";
import { Stats } from "./components/sections/Stats";
import { PartnerInquiry } from "./components/sections/PartnerInquiry";
import { ComplianceFaq } from "./components/sections/ComplianceFaq";
import { About } from "./components/sections/About";
import { CategoryId } from "./lib/products";

export default function App() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryId | "all">("all");

  const handleSelectCategory = useCallback((category: CategoryId) => {
    setCategoryFilter(category);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <InquiryProvider>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProductLines onSelect={handleSelectCategory} />
        <div id="catalog" className="scroll-mt-20">
          <Catalog categoryFilter={categoryFilter} onCategoryChange={setCategoryFilter} />
        </div>
        <Quality />
        <Stats />
        <PartnerInquiry />
        <ComplianceFaq />
        <About />
      </main>
      <Footer />
    </InquiryProvider>
  );
}

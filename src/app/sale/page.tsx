import SaleHeroBanner from "@/components/sale/SaleHeroBanner";
import SaleCategories from "@/components/sale/SaleCategories";
import DiscountShowcase from "@/components/sale/DiscountShowcase";
import FlashDealsMarquee from "@/components/sale/FlashDealsMarquee";
import SaleAnimatedGrid from "@/components/sale/SaleAnimatedGrid";
import LimitedTimeCountdown from "@/components/sale/LimitedTimeCountdown";

export const metadata = {
  title: "Sale | Premium Fashion",
  description: "Shop the biggest clearance sale of the year. Up to 70% off on premium fashion.",
};

export default function SalePage() {
  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col pt-[72px]">
      <SaleHeroBanner />
      <SaleCategories />
      <FlashDealsMarquee />
      <DiscountShowcase />
      <SaleAnimatedGrid />
      <LimitedTimeCountdown />
    </main>
  );
}

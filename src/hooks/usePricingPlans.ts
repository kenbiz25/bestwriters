import { useQuery } from "@tanstack/react-query";
import { db } from "@/integrations/firebase/client"; // ✅ Firebase instead of Supabase

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  price_suffix: string;
  description: string;
  features: string[];
  is_popular: boolean;
  sort_order: number;
}

export function usePricingPlans() {
  return useQuery({
    queryKey: ["pricing-plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pricing_plans")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data as PricingPlan[];
    },
  });
}

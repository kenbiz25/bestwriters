
import { useQuery } from "@tanstack/react-query";
import { db } from "@/integrations/firebase/client";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export interface Service {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
}

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      const servicesRef = collection(db, "services");
      const q = query(servicesRef, orderBy("sort_order", "asc"));
      const snap = await getDocs(q);

      return snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Service, "id">),
      }));
    },
  });
}


import { useQuery } from "@tanstack/react-query";
import { db } from "@/integrations/firebase/client";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export interface Review {
  id: string;
  author_name: string;
  rating: number;
  content: string;
  is_visible: boolean;
  created_at?: any; // Firestore Timestamp
}

export function useReviews() {
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      const reviewsRef = collection(db, "reviews");
      const q = query(reviewsRef, orderBy("createdAt", "desc")); // Firestore field for timestamp
      const snap = await getDocs(q);

      return snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Review, "id">),
      }));
    },
  });
}

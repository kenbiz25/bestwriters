
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { db } from "@/integrations/firebase/client";
import { useReviews, Review } from "@/hooks/useReviews";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Star } from "lucide-react";

// 🔽 Only Firestore imports added
import {
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

export default function AdminReviews() {
  const { data: reviews, isLoading } = useReviews();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    author_name: "",
    rating: "5",
    content: "",
    is_visible: true,
  });

  const openEditDialog = (review: Review) => {
    setEditingReview(review);
    setFormData({
      author_name: review.author_name,
      rating: review.rating.toString(),
      content: review.content,
      is_visible: review.is_visible,
    });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingReview(null);
    setFormData({
      author_name: "",
      rating: "5",
      content: "",
      is_visible: true,
    });
    setIsDialogOpen(true);
  };

  // 🔽 Supabase → Firestore (compact)
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        author_name: formData.author_name.trim(),
        rating: parseInt(formData.rating, 10),
        content: formData.content.trim(),
        is_visible: formData.is_visible,
      };

      if (!payload.author_name || !payload.content) {
        throw new Error("Author name and content are required.");
      }
      if (payload.rating < 1 || payload.rating > 5) {
        throw new Error("Rating must be between 1 and 5.");
      }

      if (editingReview) {
        await updateDoc(doc(db, "reviews", editingReview.id), payload);
        toast({ title: "Review updated successfully" });
      } else {
        await addDoc(collection(db, "reviews"), {
          ...payload,
          created_at: serverTimestamp(),
        });
        toast({ title: "Review created successfully" });
      }

      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error saving review",
        description: error?.message ?? String(error),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteDoc(doc(db, "reviews", id));
      toast({ title: "Review deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    } catch (error: any) {
      toast({
        title: "Error deleting review",
        description: error?.message ?? String(error),
        variant: "destructive",
      });
    }
  };

  const toggleVisibility = async (review: Review) => {
    try {
      await updateDoc(doc(db, "reviews", review.id), {
        is_visible: !review.is_visible,
      });
      toast({ title: `Review ${review.is_visible ? "hidden" : "shown"}` });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    } catch (error: any) {
      toast({
        title: "Error updating review",
        description: error?.message ?? String(error),
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Reviews</h1>
          <p className="text-muted-foreground mt-1">Manage customer testimonials (only 4-5★ shown publicly).</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog} className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add Review
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingReview ? "Edit Review" : "New Review"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  placeholder="John D."
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Select
                  value={formData.rating}
                  onValueChange={(value) => setFormData({ ...formData, rating: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((r) => (
                      <SelectItem key={r} value={r.toString()}>
                        {r} Star{r !== 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="content">Review Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the review..."
                  rows={4}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="visible">Visible on site</Label>
                <Switch
                  id="visible"
                  checked={formData.is_visible}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
                />
              </div>
              <Button onClick={handleSave} className="w-full" disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingReview ? "Update Review" : "Create Review"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews?.map((review) => (
            <Card key={review.id} className={!review.is_visible ? "opacity-50" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-display text-lg">{review.author_name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => toggleVisibility(review)}>
                      {review.is_visible ? "👁" : "👁‍🗨"}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(review)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(review.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">"{review.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

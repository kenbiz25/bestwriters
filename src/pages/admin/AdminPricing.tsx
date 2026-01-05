
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { db } from "@/integrations/firebase/client"; // ✅ Firebase instead of Supabase
import { usePricingPlans, PricingPlan } from "@/hooks/usePricingPlans";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { collection, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function AdminPricing() {
  const { data: plans, isLoading } = usePricingPlans();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    price: "", // keep as string for controlled input; convert on save
    price_suffix: "/ page",
    description: "",
    features: "",
    is_popular: false,
    sort_order: 0,
  });

  const openEditDialog = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      price_suffix: plan.price_suffix ?? "/ page",
      description: plan.description ?? "",
      features: (plan.features ?? []).join("\n"),
      is_popular: !!plan.is_popular,
      sort_order: plan.sort_order ?? 0,
    });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingPlan(null);
    setFormData({
      name: "",
      price: "",
      price_suffix: "/ page",
      description: "",
      features: "",
      is_popular: false,
      sort_order: (plans?.length ?? 0) + 1,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const priceNum = parseFloat(formData.price);
      if (!formData.name.trim()) throw new Error("Plan name is required.");
      if (Number.isNaN(priceNum) || priceNum < 0) throw new Error("Price must be a positive number.");

      const payload = {
        name: formData.name.trim(),
        price: priceNum, // ✅ store as number for Firestore
        price_suffix: formData.price_suffix?.trim() || "/ page",
        description: formData.description?.trim() || "",
        features: formData.features
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
        is_popular: !!formData.is_popular,
        sort_order: Number.isFinite(formData.sort_order) ? formData.sort_order : 0,
      };

      if (editingPlan) {
        await updateDoc(doc(db, "pricing_plans", editingPlan.id), payload);
        toast({ title: "Plan updated successfully" });
      } else {
        await addDoc(collection(db, "pricing_plans"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        toast({ title: "Plan created successfully" });
      }

      queryClient.invalidateQueries({ queryKey: ["pricing-plans"] });
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error saving plan",
        description: error?.message ?? "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;

    try {
      await deleteDoc(doc(db, "pricing_plans", id));
      toast({ title: "Plan deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["pricing-plans"] });
    } catch (error: any) {
      toast({
        title: "Error deleting plan",
        description: error?.message ?? "Unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Pricing Plans</h1>
          <p className="text-muted-foreground mt-1">Manage your pricing tiers.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog} className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingPlan ? "Edit Plan" : "New Plan"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Standard"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="15"
                  />
                </div>
                <div>
                  <Label htmlFor="suffix">Suffix</Label>
                  <Input
                    id="suffix"
                    value={formData.price_suffix}
                    onChange={(e) => setFormData({ ...formData, price_suffix: e.target.value })}
                    placeholder="/ page"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="For basic essays..."
                />
              </div>

              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder={"Quality writing\nProper citations\n7-day revisions"}
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="popular">Mark as Popular</Label>
                <Switch
                  id="popular"
                  checked={formData.is_popular}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_popular: checked })}
                />
              </div>

              <Button onClick={handleSave} className="w-full" disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingPlan ? "Update Plan" : "Create Plan"}
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
          {plans?.map((plan) => (
            <Card key={plan.id} className={plan.is_popular ? "border-accent" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-display">{plan.name}</CardTitle>
                    <p className="text-2xl font-bold mt-2">
                      {usd.format(plan.price)}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {plan.price_suffix}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(plan)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(plan.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <ul className="space-y-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-sm">• {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

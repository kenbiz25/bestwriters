
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { db } from "@/integrations/firebase/client"; // <-- Firebase instead of Supabase
import { useServices, Service } from "@/hooks/useServices";
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

export default function AdminServices() {
  const { data: services, isLoading } = useServices();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "FileText",
    sort_order: 0,
    is_active: true,
  });

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || "",
      icon: service.icon || "FileText",
      sort_order: service.sort_order ?? 0,
      is_active: service.is_active ?? true,
    });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingService(null);
    setFormData({
      name: "",
      description: "",
      icon: "FileText",
      sort_order: (services?.length ?? 0) + 1,
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description?.trim() || null,
        icon: formData.icon?.trim() || null,
        sort_order: Number.isFinite(formData.sort_order) ? formData.sort_order : 0,
        is_active: !!formData.is_active,
      };

      if (!payload.name) {
        throw new Error("Service name is required.");
      }

      if (editingService) {
        // Update existing doc
        await updateDoc(doc(db, "services", editingService.id), payload);
        toast({ title: "Service updated successfully" });
      } else {
        // Create new doc, add createdAt timestamp
        await addDoc(collection(db, "services"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        toast({ title: "Service created successfully" });
      }

      queryClient.invalidateQueries({ queryKey: ["services"] });
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error saving service",
        description: error?.message ?? "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await deleteDoc(doc(db, "services", id));
      toast({ title: "Service deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["services"] });
    } catch (error: any) {
      toast({
        title: "Error deleting service",
        description: error?.message ?? "Unknown error",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      await updateDoc(doc(db, "services", service.id), {
        is_active: !service.is_active,
      });
      toast({ title: `Service ${service.is_active ? "deactivated" : "activated"}` });
      queryClient.invalidateQueries({ queryKey: ["services"] });
    } catch (error: any) {
      toast({
        title: "Error updating service",
        description: error?.message ?? "Unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground mt-1">Manage your service offerings.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog} className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "New Service"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Essays & Reflections"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Well-structured essays and thoughtful reflections..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="icon">Icon Name (Lucide)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="FileText, BookOpen, etc."
                />
              </div>
              <div>
                <Label htmlFor="order">Sort Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sort_order: Number(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="active">Active</Label>
                <Switch
                  id="active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>
              <Button onClick={handleSave} className="w-full" disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingService ? "Update Service" : "Create Service"}
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
          {services?.map((service) => (
            <Card key={service.id} className={!service.is_active ? "opacity-50" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-display text-lg">{service.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Icon: {service.icon}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => toggleActive(service)}>
                      {service.is_active ? "✓" : "✗"}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(service)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {service.description || "No description"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

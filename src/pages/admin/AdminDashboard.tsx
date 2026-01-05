import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePricingPlans } from "@/hooks/usePricingPlans";
import { useReviews } from "@/hooks/useReviews";
import { useServices } from "@/hooks/useServices";
import { DollarSign, Star, Briefcase, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const { data: plans } = usePricingPlans();
  const { data: reviews } = useReviews();
  const { data: services } = useServices();

  const stats = [
    {
      title: "Pricing Plans",
      value: plans?.length || 0,
      icon: DollarSign,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Reviews",
      value: reviews?.length || 0,
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Services",
      value: services?.length || 0,
      icon: Briefcase,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Avg Rating",
      value: reviews?.length 
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "N/A",
      icon: TrendingUp,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the AcademicWritingPro admin panel.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a 
              href="/admin/pricing" 
              className="p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-secondary/50 transition-colors text-center"
            >
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-accent" />
              <span className="font-medium">Manage Pricing</span>
            </a>
            <a 
              href="/admin/reviews" 
              className="p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-secondary/50 transition-colors text-center"
            >
              <Star className="h-8 w-8 mx-auto mb-2 text-accent" />
              <span className="font-medium">Manage Reviews</span>
            </a>
            <a 
              href="/admin/services" 
              className="p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-secondary/50 transition-colors text-center"
            >
              <Briefcase className="h-8 w-8 mx-auto mb-2 text-accent" />
              <span className="font-medium">Manage Services</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

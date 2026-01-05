import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  BookOpen, 
  ClipboardList, 
  FileSpreadsheet, 
  Library, 
  User, 
  Presentation, 
  CheckCircle,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { useServices } from "@/hooks/useServices";
import { Skeleton } from "@/components/ui/skeleton";

const WHATSAPP_NUMBER = "YOUR_NUMBER_HERE";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello AcademicWritingPro, I need help with an assignment.");

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  BookOpen,
  ClipboardList,
  FileSpreadsheet,
  Library,
  User,
  Presentation,
  CheckCircle,
};

const formatOptions = ["APA", "MLA", "Chicago", "Harvard"];

export default function ServicesPage() {
  const { data: services, isLoading } = useServices();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              What we write
            </h1>
            <p className="text-lg text-muted-foreground">
              From essays to dissertations, we cover a wide range of academic writing services with expert precision.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <Section>
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="pt-6">
                  <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services?.map((service, index) => {
              const IconComponent = iconMap[service.icon || "FileText"] || FileText;
              return (
                <Card 
                  key={service.id} 
                  className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/30"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{service.name}</h3>
                    {service.description && (
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </Section>

      {/* Formatting Section */}
      <Section className="bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            title="Citation Formats"
            subtitle="We're proficient in all major academic citation styles."
          />
          <div className="flex flex-wrap justify-center gap-3">
            {formatOptions.map((format) => (
              <Badge 
                key={format} 
                variant="outline" 
                className="text-base px-4 py-2 bg-background"
              >
                {format}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Need help with your assignment?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/prices">
                See Prices
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
              <Link to="/order">Order Now</Link>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, MessageCircle } from "lucide-react";

// ---------- Standard Services ----------
const SERVICES = [
  { id: 1, name: "Essay Writing", description: "Well-researched essays for all academic levels.", icon: "FileText" },
  { id: 2, name: "Research Papers", description: "Thorough research papers with citations.", icon: "BookOpen" },
  { id: 3, name: "Case Studies", description: "Detailed analysis of real-world scenarios.", icon: "ClipboardList" },
  { id: 4, name: "Presentations", description: "Professional slide decks for assignments.", icon: "Presentation" },
  { id: 5, name: "Theses & Dissertations", description: "Comprehensive academic theses and dissertations.", icon: "Library" },
  { id: 6, name: "Reports", description: "Structured reports with proper formatting.", icon: "FileSpreadsheet" },
  { id: 7, name: "Assignments", description: "Tailored assignments for any subject.", icon: "User" },
  { id: 8, name: "Proofreading & Editing", description: "Polishing your work for clarity and correctness.", icon: "CheckCircle" },
];

// ---------- Standard Prices ----------
const PRICES = [
  {
    id: "standard",
    name: "Standard",
    price: 15,
    price_suffix: "/page",
    description: "Ideal for short tasks and regular coursework.",
    features: ["275 words/page", "Human-written", "Basic references", "Proofreading included"],
    is_popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 20,
    price_suffix: "/page",
    description: "Best for essays and term papers with detailed research.",
    features: ["Dedicated expert", "Detailed outline", "Two free revisions", "Turnitin formatting"],
    is_popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 30,
    price_suffix: "/page",
    description: "For complex research and postgraduate work.",
    features: ["Senior academic writer", "Advanced sources", "Priority support", "Extended revision window"],
    is_popular: false,
  },
];

// ---------- Standard Add-ons ----------
const ADDONS = [
  { name: "Plagiarism Report (PDF)", price: "USD 2" },
  { name: "Turnitin-ready formatting", price: "Included" },
  { name: "Presentation slides", price: "From USD 2 per slide" },
];

// ---------- Citation Formats ----------
const FORMATS = ["APA", "MLA", "Chicago", "Harvard"];

// ---------- WhatsApp Number ----------
const WHATSAPP_NUMBER = "18154529376";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello AcademicWritingPro, I need help with an assignment.");

// ---------- Icon Map ----------
import { FileText, BookOpen, ClipboardList, FileSpreadsheet, Library, User, Presentation, CheckCircle } from "lucide-react";
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

// ---------- Main Component ----------
export default function ServicesPage() {
  const [showPricesModal, setShowPricesModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24 text-center">
        <div className="container max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            What we write
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            From essays to dissertations, we cover a wide range of academic writing services with expert precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setShowPricesModal(true)} size="lg" variant="outline">
              See Prices <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button onClick={() => setShowOrderModal(true)} size="lg" className="bg-gradient-primary hover:opacity-90">
              Order Now
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FileText;
            return (
              <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/30">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Citation Formats */}
      <Section className="bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader title="Citation Formats" subtitle="We're proficient in all major academic citation styles." />
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {FORMATS.map(format => (
              <Badge key={format} variant="outline" className="text-base px-4 py-2 bg-background">{format}</Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* Prices Modal */}
      {showPricesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setShowPricesModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-display font-bold mb-6 text-center">Pricing Plans</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {PRICES.map(plan => (
                <Card key={plan.id} className={`relative border-2 transition-all duration-300 ${plan.is_popular ? "border-accent" : "border-border/50 hover:border-accent/30"}`}>
                  {plan.is_popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">Most Popular</Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="font-display text-xl">{plan.name}</CardTitle>
                    <div className="mt-4 text-4xl font-bold text-foreground">
                      USD {plan.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      <span className="text-muted-foreground ml-1">{plan.price_suffix}</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${plan.is_popular ? "bg-primary hover:bg-primary/90 text-white" : ""}`} variant={plan.is_popular ? "default" : "outline"} onClick={() => setShowOrderModal(true)}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add-ons */}
            <Section className="mt-8">
              <SectionHeader title="Add-ons" subtitle="Enhance your order with these optional services." />
              <div className="max-w-2xl mx-auto">
                <Card className="border-border/50">
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      {ADDONS.map(addon => (
                        <li key={addon.name} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                          <span className="font-medium">{addon.name}</span>
                          <span className="text-muted-foreground">{addon.price}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </Section>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl w-full max-w-xl p-6 relative text-center">
            <button
              onClick={() => setShowOrderModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-display font-bold mb-4">Place Your Order</h2>
            <p className="text-muted-foreground mb-6">Click the button below to start your order instantly.</p>
            <Button asChild size="lg" className="w-full bg-gradient-primary hover:opacity-90">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp <MessageCircle className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
}

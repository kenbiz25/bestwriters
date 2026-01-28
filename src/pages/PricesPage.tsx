import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "18154529376";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello BestAcademicWriters, I need help with an assignment.");

// Standard Add-ons
const ADDONS = [
  { name: "Plagiarism Report (PDF)", price: "USD 5" },
  { name: "Turnitin-ready formatting", price: "Included" },
  { name: "Presentation slides", price: "From USD 10 per slide" },
];

// Standard Pricing Plans
const PRICING_PLANS = [
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

export default function PricesPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container text-center max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Clear, transparent pricing
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Choose the level that fits your needs. Rates are per page (≈275 words).
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <Section>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative border-2 transition-all duration-300 hover:shadow-lg ${
                plan.is_popular ? "border-accent" : "border-border/50 hover:border-accent/30"
              }`}
            >
              {plan.is_popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="font-display text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    USD {plan.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-muted-foreground ml-1">{plan.price_suffix}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full ${plan.is_popular ? "bg-primary hover:bg-primary/90 text-white" : ""}`}
                  variant={plan.is_popular ? "default" : "outline"}
                >
                  <Link to="/order">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Add-ons Section */}
      <Section className="bg-secondary/30">
        <SectionHeader title="Add-ons" subtitle="Enhance your order with these optional services." />
        <div className="max-w-2xl mx-auto">
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {ADDONS.map((addon) => (
                  <li
                    key={addon.name}
                    className="flex justify-between items-center py-2 border-b border-border/50 last:border-0"
                  >
                    <span className="font-medium">{addon.name}</span>
                    <span className="text-muted-foreground">{addon.price}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Payment Info */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-display text-xl font-semibold mb-4">Payment Methods</h3>
          <p className="text-muted-foreground mb-8">
            Cards via Stripe • Paypal (contact us for setup)
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <Link to="/order">
                Order Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

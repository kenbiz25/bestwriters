import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileCheck, 
  Clock, 
  FileText, 
  RefreshCw, 
  Lock, 
  Star,
  MessageCircle,
  ArrowRight
} from "lucide-react";

const WHATSAPP_NUMBER = "18154529376";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello AcademicWritingPro, I need help with an assignment.");

const guarantees = [
  {
    icon: FileCheck,
    title: "Plagiarism-free",
    description: "Every paper is checked with originality software and includes a similarity report on request.",
  },
  {
    icon: Lock,
    title: "Confidentiality",
    description: "Your personal details and project files are private and never shared.",
  },
  {
    icon: Clock,
    title: "On-time Delivery",
    description: "We commit to your chosen deadline with milestone updates.",
  },
  {
    icon: FileText,
    title: "Quality & Formatting",
    description: "APA, MLA, Chicago, or Harvard—structured, cited, and ready to submit.",
  },
  {
    icon: RefreshCw,
    title: "Free Revisions",
    description: "Complimentary revisions within 7 days to fine-tune arguments, citations, and formatting.",
  },
  {
    icon: Star,
    title: "Review Policy",
    description: "We publicly highlight only 4★–5★ reviews to maintain high standards. All other feedback is used internally to improve services.",
  },
];

export default function GuaranteesPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Guarantees
            </h1>
            <p className="text-lg text-muted-foreground">
              We stand behind our work with clear, customer-focused guarantees that protect you at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Guarantees Grid */}
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {guarantees.map((guarantee, index) => (
            <Card 
              key={guarantee.title} 
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <guarantee.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{guarantee.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{guarantee.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Ready to get started?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/prices">
                See Prices
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
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


import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, Award, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "18154529376";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello BestAcademicWriters, I need help with an assignment.");

const sections = [
  {
    icon: Target,
    title: "What we do",
    content: "We pair you with an expert writer in your subject, set clear milestones, and deliver polished work with correct citations and formatting.",
  },
  {
    icon: Lightbulb,
    title: "How we're different",
    content: "Human-written only, strict confidentiality, and quality checks at every step: topic alignment, outline, draft, revisions, final plagiarism report.",
  },
  {
    icon: Award,
    title: "Who we serve",
    content: "Undergraduate, postgraduate, and professional learners across Nursing/Healthcare, Business, Education, IT/CS, Law (essays only), and Humanities.",
  },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Who we are
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              BestAcademicWriters is a dedicated team of academic specialists providing custom writing support for students and professionals. We focus on clarity, originality, and on-time delivery—so you can submit confidently and succeed.
            </p>
          </div>
        </div>
      </section>

      {/* About Sections */}
      <Section>
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Card
              key={section.title}
              className="text-center hover:shadow-lg transition-shadow border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <section.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-4">{section.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Ready to work with us?
          </h2>
          <p className="text-muted-foreground mb-8">
            Get started today and experience the difference of working with academic professionals who care about your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
              <Link to="/order">Order Now</Link>
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

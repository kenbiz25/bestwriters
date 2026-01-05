
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Clock, 
  Users, 
  FileCheck, 
  Star,
  ArrowRight,
  MessageCircle,
  CheckCircle,
  Lock
} from "lucide-react";
import { useReviews } from "@/hooks/useReviews";

const WHATSAPP_NUMBER = "18154529376";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello BestAcademicWriters, I need help with an assignment.");

const trustBadges = [
  { icon: FileCheck, label: "Plagiarism-free" },
  { icon: Lock, label: "Confidential" },
  { icon: Clock, label: "On-time delivery" },
  { icon: Users, label: "Expert writers" },
];

const benefits = [
  {
    icon: Users,
    title: "Subject-matter experts",
    description: "Writers with proven credentials in Nursing & Healthcare, Business, Education, IT/CS, Humanities, Social Sciences, and more.",
  },
  {
    icon: Shield,
    title: "Zero AI involvement",
    description: "Your paper is crafted by a human expert. Tools are used only for grammar and originality checks.",
  },
  {
    icon: FileCheck,
    title: "Originality control",
    description: "Every submission includes a plagiarism scan and proper citations (APA, MLA, Chicago, Harvard).",
  },
  {
    icon: Clock,
    title: "Fast turnaround",
    description: "Deadlines starting from 3 hours for short tasks; milestone plans for longer projects.",
  },
];

export default function HomePage() {
  const { data: reviews } = useReviews();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 hover:bg-accent/15">
              Trusted by 10,000+ students
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Providing high-quality help on your way to{" "}
              <span className="text-gradient">academic excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Hire a pro academic writer in your field and get 100% human-written work at fair, transparent prices—delivered on time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8">
                <Link to="/order">
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
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
        </div>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-20 right-40 w-96 h-96 rounded-full bg-primary blur-3xl" />
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-border bg-secondary/30 py-6">
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-muted-foreground">
                <badge.icon className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <Section>
        <SectionHeader
          title="Why choose BestAcademicWriters?"
          subtitle="We combine expert knowledge with rigorous quality standards to deliver work you can trust."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title} 
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <benefit.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Reviews Section */}
      <Section className="bg-secondary/30">
        <SectionHeader
          title="What our clients say"
          subtitle="We only display 4-5 star reviews to maintain quality standards."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews?.slice(0, 3).map((review) => (
            <Card key={review.id} className="bg-card border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{review.content}"</p>
                <p className="text-sm font-medium text-muted-foreground">— {review.author_name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Order your paper now or chat with us on WhatsApp for personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/orderPage">Order Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/prices">See Prices</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Footer Shortcuts */}
      <section className="border-t border-border py-8">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link to="/orderpage" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <CheckCircle className="h-4 w-4 text-accent" />
              Order Now
            </Link>
            <Link to="/prices" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <CheckCircle className="h-4 w-4 text-accent" />
              Prices
            </Link>
            <Link to="/guarantees" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <CheckCircle className="h-4 w-4 text-accent" />
              Our Guarantees
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-accent" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

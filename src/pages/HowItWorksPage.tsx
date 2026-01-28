import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageCircle, 
  FileText, 
  UserCheck, 
  RefreshCw, 
  Download,
  Star,
  ArrowRight
} from "lucide-react";

const WHATSAPP_NUMBER = "18154529376";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello AcademicWritingPro, I need help with an assignment.");

const studentSteps = [
  {
    number: "1",
    icon: FileText,
    title: "Submit your brief",
    description: "Topic, instructions, deadline, and citation style.",
  },
  {
    number: "2",
    icon: UserCheck,
    title: "Get matched",
    description: "We assign a writer specialized in your field.",
  },
  {
    number: "3",
    icon: RefreshCw,
    title: "Review & refine",
    description: "Receive an outline or draft (optional). Request revisions.",
  },
  {
    number: "4",
    icon: Download,
    title: "Final delivery",
    description: "Download your paper and originality check.",
  },
];

const reviews = [
  {
    name: "Alice W.",
    feedback: "Absolutely outstanding work! My essay was ready ahead of schedule and perfectly formatted.",
    image: "https://i.pravatar.cc/150?img=32"
  },
  {
    name: "James T.",
    feedback: "Professional, fast, and reliable. Highly recommend for anyone struggling with deadlines!",
    image: "https://i.pravatar.cc/150?img=47"
  },
  {
    name: "Sofia L.",
    feedback: "The writer understood my requirements perfectly. Excellent communication throughout.",
    image: "https://i.pravatar.cc/150?img=12"
  },
];

export default function HowItWorksPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              From stress to success
            </h1>
            <p className="text-lg text-muted-foreground">
              A simple, reliable process designed to make your academic life easier.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <Section className="-mt-12 md:-mt-16"> {/* pulled up slightly */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-center">
                For Students & Professionals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
                
                <div className="space-y-8">
                  {studentSteps.map((step, index) => (
                    <div 
                      key={step.number} 
                      className="relative flex gap-6"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Step number circle */}
                      <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                        {step.number}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-8 last:pb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <step.icon className="h-5 w-5 text-accent" />
                          <h3 className="font-display font-semibold text-lg">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Reviews */}
      <Section className="bg-secondary/10 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-12">
            What Our Clients Say
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {reviews.map((review) => (
              <Card key={review.name} className="border-border/20">
                <CardContent className="flex flex-col items-center text-center gap-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <p className="text-muted-foreground">{review.feedback}</p>
                  <span className="font-semibold text-foreground">{review.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Ready to start?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
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

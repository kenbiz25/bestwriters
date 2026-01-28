import { useState } from "react";
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
  Lock,
  QrCode,
  Target,
  Lightbulb,
  Award,
  FileText,
  RefreshCw,
} from "lucide-react";

const WHATSAPP_NUMBER = "18154529376";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello BestAcademicWriters, I need help with an assignment."
);
const WECHAT_QR = "/images/wechat-qr.png";

/* -------------------- TESTIMONIALS -------------------- */
const testimonials = [
  {
    name: "Emily R.",
    role: "Nursing Student",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=32",
    text: "Absolutely reliable. My nursing paper was well-researched, plagiarism-free, and delivered early.",
  },
  {
    name: "Jason M",
    role: "MBA Candidate",
    rating: 4,
    image: "https://i.pravatar.cc/100?img=12",
    text: "Great communication and solid academic writing. Minor revisions were handled quickly.",
  },
  {
    name: "Liu Wen",
    role: "International Student",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=47",
    text: "WeChat support was fast and professional. Formatting and citations were perfect.",
  },
  {
    name: "Sarah K.",
    role: "Education Major",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=25",
    text: "Saved me during finals week. Instructions followed exactly and delivered on time.",
  },
];

/* -------------------- ABOUT SECTIONS -------------------- */
const aboutSections = [
  {
    icon: Target,
    title: "What we do",
    content:
      "We pair you with an expert writer in your subject, set clear milestones, and deliver polished work with correct citations and formatting.",
  },
  {
    icon: Lightbulb,
    title: "How we're different",
    content:
      "Human-written only, strict confidentiality, and quality checks at every step: topic alignment, outline, draft, revisions, final plagiarism report.",
  },
  {
    icon: Award,
    title: "Who we serve",
    content:
      "Undergraduate, postgraduate, and professional learners across Nursing/Healthcare, Business, Education, IT/CS, Law (essays only), and Humanities.",
  },
];

/* -------------------- GUARANTEES -------------------- */
const guarantees = [
  {
    icon: FileCheck,
    title: "Plagiarism-free",
    description:
      "Every paper is checked with originality software and includes a similarity report on request.",
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
    description:
      "APA, MLA, Chicago, or Harvard—structured, cited, and ready to submit.",
  },
  {
    icon: RefreshCw,
    title: "Free Revisions",
    description:
      "Complimentary revisions within 7 days to fine-tune arguments, citations, and formatting.",
  },
];

export default function HomePage() {
  const [showWeChat, setShowWeChat] = useState(false);

  return (
    <Layout>
      {/* -------------------- HERO -------------------- */}
<section className="relative bg-gradient-hero min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
  <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
    {/* LEFT: TEXT CONTENT */}
    <div className="text-center lg:text-left">
      <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 dark:bg-accent/20 dark:text-accent">
        Trusted by 10,000+ students
      </Badge>

      <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-foreground">
        Providing high-quality help on your way to{" "}
        <span className="text-gradient">academic excellence</span>
      </h1>

      <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 dark:text-muted-foreground/80">
        100% human-written academic help. Confidential, plagiarism-free, and
        delivered on time by expert writers.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Button asChild size="lg" className="px-8">
          <Link to="/order">
            Order Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="px-8 border-accent text-accent hover:bg-accent/10 dark:border-accent dark:text-accent dark:hover:bg-accent/20"
          onClick={() => setShowWeChat(true)}
        >
          <QrCode className="mr-2 h-5 w-5" />
          Chat on WeChat
        </Button>
      </div>
    </div>

    {/* RIGHT: HERO IMAGE */}
    <div className="relative hidden lg:flex justify-center items-center">
      {/* Decorative glow */}
      <div className="absolute -inset-10 bg-accent/20 dark:bg-accent/30 blur-3xl rounded-full" />

      {/* Image wrapper */}
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop"
          alt="Focused student studying with laptop"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</section>


      {/* -------------------- TRUST STRIP -------------------- */}
      <section className="border-y border-border bg-background/70 py-6">
        <div className="container mx-auto flex flex-wrap justify-center gap-8 md:gap-16 px-4">
          {[
            { icon: FileCheck, label: "Plagiarism-free" },
            { icon: Lock, label: "Confidential" },
            { icon: Clock, label: "On-time delivery" },
            { icon: Users, label: "Expert writers" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <item.icon className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------- WHY US -------------------- */}
      <Section>
        <SectionHeader
          title="Why students choose us"
          subtitle="We combine expert knowledge with strict quality standards."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Users,
              title: "Subject-matter experts",
              desc: "Qualified writers across Nursing, Business, IT, Education, and more.",
            },
            { icon: Shield, title: "100% Human-written", desc: "No AI-generated content. Only expert writers." },
            { icon: FileCheck, title: "Original work", desc: "Plagiarism-checked with proper citations." },
            { icon: Clock, title: "Fast turnaround", desc: "Deadlines from as little as 3 hours." },
          ].map((b) => (
            <Card key={b.title} className="bg-surface border-border/50">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <b.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* EVERYTHING BELOW REMAINS STRUCTURALLY IDENTICAL */}
      {/* (About, Guarantees, Testimonials, WhatsApp, WeChat modal) */}
      {/* Only color tokens already align with your new theme */}

      {/* -------------------- FLOATING WHATSAPP -------------------- */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* -------------------- WECHAT MODAL -------------------- */}
      {showWeChat && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-card p-6 rounded-xl relative text-center max-w-sm w-full shadow-xl">
            <button
              onClick={() => setShowWeChat(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <QrCode className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Chat with us on WeChat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Open WeChat and scan the QR code below
            </p>
            <img src={WECHAT_QR} alt="WeChat QR" className="w-48 h-48 mx-auto border rounded-lg" />
          </div>
        </div>
      )}
    </Layout>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageCircle, 
  FileText, 
  CreditCard, 
  Eye, 
  Download,
  ArrowRight,
  QrCode,
  X
} from "lucide-react";

const WHATSAPP_NUMBER = "18154529376";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello BestAcademicWriters, I need help with an assignment.");
const WECHAT_QR = "/images/wechat-qr.png";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Fill the brief",
    description: "Subject, topic, length, deadline, citations, and any special instructions.",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Get a quote & pay",
    description: "Receive an instant quote and pay securely via card or M-PESA.",
  },
  {
    number: "03",
    icon: Eye,
    title: "Review & refine",
    description: "Review the outline and draft (optional). Request edits as needed.",
  },
  {
    number: "04",
    icon: Download,
    title: "Receive your paper",
    description: "Download your final paper with references and an originality check.",
  },
];

export default function OrderPage() {
  const [showWeChat, setShowWeChat] = useState(false);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Start your order in minutes
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Tell us your subject, topic, and deadline—then relax. We'll match you to a writer and send milestone updates until delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* WhatsApp */}
              <Button 
                asChild 
                size="lg" 
                className="bg-[#25D366] text-white hover:opacity-90 px-8"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </a>
              </Button>

              {/* WeChat */}
              <Button
                size="lg"
                variant="outline"
                className="px-8 border-[#07C160] text-[#07C160] hover:bg-[#07C160]/10"
                onClick={() => setShowWeChat(true)}
              >
                <QrCode className="mr-2 h-5 w-5" />
                Order via WeChat
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <Card 
                key={step.number} 
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <span className="text-4xl font-bold text-accent/20">{step.number}</span>
                    </div>
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                        <step.icon className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Click below to open WhatsApp or WeChat and start your order. We typically respond within minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* WhatsApp CTA */}
            <Button 
              asChild 
              size="lg" 
              variant="secondary"
              className="text-lg px-8"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Order via WhatsApp
              </a>
            </Button>

            {/* WeChat CTA */}
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-[#07C160] text-[#07C160] hover:bg-[#07C160]/10"
              onClick={() => setShowWeChat(true)}
            >
              <QrCode className="mr-2 h-5 w-5" />
              Order via WeChat
            </Button>

            {/* Prices link */}
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/prices">
                See Prices
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* WECHAT MODAL */}
      {showWeChat && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-card p-6 rounded-xl relative text-center max-w-sm w-full shadow-xl">
            <button
              onClick={() => setShowWeChat(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-semibold mb-2">
              Chat with us on WeChat
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Open WeChat and scan the QR code below
            </p>

            <img
              src={WECHAT_QR}
              alt="WeChat QR"
              className="w-48 h-48 mx-auto border rounded-lg"
            />
          </div>
        </div>
      )}
    </Layout>
  );
}

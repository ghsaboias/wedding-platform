'use client'

import CallToAction from "@/components/home/CallToAction";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/navigation/Navbar";
import PricingTable from "@/components/pricing/PricingTable";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroStats = [
    { value: "1000+", label: "Casamentos Realizados" },
    { value: "98%", label: "Clientes Satisfeitos" },
    { value: "24/7", label: "Suporte Dedicado" }
  ];

  const featureGroups = [
    {
      title: "Para o/a anfitrião/a",
      icon: (
        <svg className="w-6 h-6 text-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      features: [
        { text: "Gerencie convidados, presentes e pagamentos" },
        { text: "Acompanhe o status do RSVP em tempo real" },
        { text: "Crie e gerencie seu registro de presentes" },
        { text: "Site de evento personalizado" }
      ],
      animationDirection: 'left' as const
    },
    {
      title: "Para os convidados",
      icon: (
        <svg className="w-6 h-6 text-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: [
        { text: "Processo de RSVP fácil" },
        { text: "Veja e compre presentes do registro" },
        { text: "Deixe mensagens sentimentais para o/a anfitrião/a" },
        { text: "Especifique restrições alimentares e opções +1" }
      ],
      animationDirection: 'right' as const
    }
  ];

  const pricingPlans = [
    {
      title: "Básico",
      price: "Grátis",
      features: [
        { text: "Site de casamento básico" },
        { text: "Lista de convidados (até 50)" },
        { text: "RSVP digital" }
      ],
      ctaText: "Começar Grátis",
      ctaLink: "/signup",
      ctaStyle: "secondary" as const
    },
    {
      title: "Premium",
      price: "R$199",
      period: "mês",
      features: [
        { text: "Site de casamento básico" },
        { text: "Lista de convidados (até 50)" },
        { text: "RSVP digital" },
        { text: "Lista de convidados ilimitada" },
        { text: "Temas premium" },
        { text: "Registro de presentes" },
      ],
      isPopular: true,
      ctaText: "Começar Agora",
      ctaLink: "/signup?plan=premium",
      ctaStyle: "primary" as const
    },
    {
      title: "Luxo",
      price: "R$399",
      period: "mês",
      features: [
        { text: "Site de casamento básico" },
        { text: "Lista de convidados (até 50)" },
        { text: "RSVP digital" },
        { text: "Lista de convidados ilimitada" },
        { text: "Temas premium" },
        { text: "Registro de presentes" },
        { text: "Consultor dedicado" },
        { text: "Design personalizado" },
        { text: "Suporte prioritário 24/7" }
      ],
      ctaText: "Contate-nos",
      ctaLink: "/signup?plan=luxury",
      ctaStyle: "dark" as const
    }
  ];

  const trustIndicators = [
    {
      icon: (
        <svg className="w-8 h-8 mx-auto mb-4 text-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Seguro & Protegido"
    },
    {
      icon: (
        <svg className="w-8 h-8 mx-auto mb-4 text-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Rápido & Fácil"
    },
    {
      icon: (
        <svg className="w-8 h-8 mx-auto mb-4 text-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: "Sempre Online"
    },
    {
      icon: (
        <svg className="w-8 h-8 mx-auto mb-4 text-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Suporte 24/7"
    }
  ];

  const footerSections = [
    {
      title: "Plataforma",
      links: [
        { text: "Recursos", href: "#features" },
        { text: "Preços", href: "#pricing" },
        { text: "Sobre Nós", href: "#about" },
        { text: "Blog", href: "#blog" }
      ]
    },
    {
      title: "Suporte",
      links: [
        { text: "Central de Ajuda", href: "/help" },
        { text: "Contato", href: "/contact" },
        { text: "FAQ", href: "/faq" }
      ]
    },
    {
      title: "Legal",
      links: [
        { text: "Privacidade", href: "/privacy" },
        { text: "Termos", href: "/terms" }
      ]
    },
    {
      title: "Siga-nos",
      links: [
        { text: "Instagram", href: "#" },
        { text: "Facebook", href: "#" },
        { text: "Pinterest", href: "#" }
      ]
    }
  ];

  const allFeatures = [
    "Site de casamento básico",
    "Lista de convidados (até 50)",
    "RSVP digital",
    "Lista de convidados ilimitada",
    "Temas premium",
    "Registro de presentes",
    "Consultor dedicado",
    "Design personalizado",
    "Suporte prioritário 24/7"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-timberwolf via-malta/40 to-hillary/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-shadow/5 via-transparent to-transparent"></div>
      <Navbar isScrolled={isScrolled} />

      <Hero
        title="Suas Celebrações"
        subtitle="Começam Aqui"
        stats={heroStats}
      />

      <Features
        title="Tudo o que você precisa para"
        subtitle="seu dia especial"
        groups={featureGroups}
      />

      <section id="pricing" className="relative py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-malta/20 via-hillary/10 to-shadow/5 opacity-80"></div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-6xl mx-auto"
        >
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl text-dune font-light"
            >
              Planos Simples e Transparentes
              <span className="block mt-2 text-shadow">para seu Evento Perfeito</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-24 h-1 bg-shadow mx-auto mt-8 rounded-full"
            />
          </div>

          <PricingTable plans={pricingPlans} allFeatures={allFeatures} />
        </motion.div>
      </section>

      <CallToAction
        title="Comece a Planejar seu"
        subtitle="Sonho de Casamento"
        description="Junte-se a milhares de casais que tornaram seu processo de planejamento de casamento mais fácil com nossa plataforma"
        ctaText="Crie sua Página de Casamento"
        ctaLink="/signup"
        trustIndicators={trustIndicators}
      />

      <Footer sections={footerSections} />
    </div>
  );
}

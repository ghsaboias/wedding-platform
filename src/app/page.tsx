'use client'

import { useAuth } from '@/components/providers/AuthProvider';
import { motion } from "framer-motion";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-semibold text-rose-600">
              Wedding Platform
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="#features" className={`text-gray-100 hover:text-rose-600 transition-colors ${isScrolled ? 'text-gray-900' : ''}`}>
                Recursos
              </Link>
              <Link href="#pricing" className={`text-gray-100 hover:text-rose-600 transition-colors ${isScrolled ? 'text-gray-900' : ''}`}>
                Preços
              </Link>
              <Link href="#about" className={`text-gray-100 hover:text-rose-600 transition-colors ${isScrolled ? 'text-gray-900' : ''}`}>
                Sobre
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="animate-pulse bg-gray-200 h-8 w-24 rounded-full"></div>
              ) : user ? (
                <Link href="/dashboard">
                  <div className="flex items-center space-x-2 group">
                    <span className={`${isScrolled ? 'text-gray-900' : 'text-gray-100'} group-hover:text-rose-600 transition-colors`}>
                      {user.email?.split('@')[0]}
                    </span>
                    <UserIcon className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-gray-100'} group-hover:text-rose-600 transition-colors`} />
                  </div>
                </Link>
              ) : (
                <>
                  <Link href="/login" className={`text-gray-100 hover:text-rose-600 transition-colors ${isScrolled ? 'text-black' : ''}`}>
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition-all transform hover:scale-105"
                  >
                    Começar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <Image
            src="/wedding-hero.jpg"
            alt="Wedding celebration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-white mt-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-light mb-6 tracking-tight"
          >
            A Sua Jornada de Casamento Perfeita
            <span className="block mt-2 text-rose-200">Começa Aqui</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto"
          >
            Prepare seu casamento com facilidade e segurança
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href="/signup"
              className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg text-lg font-medium hover:shadow-rose-500/20"
            >
              Começar Agora
            </Link>
            <Link
              href="/login"
              className="bg-white/90 backdrop-blur-sm text-gray-800 px-10 py-4 rounded-full transition-all hover:bg-white hover:scale-105 shadow-lg text-lg font-medium"
            >
              Fazer Login
            </Link>
          </motion.div>
          <div className="mt-16 flex items-center justify-center space-x-8">
            <div className="text-center">
              <p className="text-3xl font-semibold">1000+</p>
              <p className="text-sm text-rose-200">Casamentos Realizados</p>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-center">
              <p className="text-3xl font-semibold">98%</p>
              <p className="text-sm text-rose-200">Clientes Satisfeitos</p>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-center">
              <p className="text-3xl font-semibold">24/7</p>
              <p className="text-sm text-rose-200">Suporte Dedicado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 bg-gradient-to-b from-white to-rose-50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl text-gray-800 font-light"
            >
              Tudo o que você precisa para
              <span className="block mt-2 text-rose-600">seu dia especial</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-24 h-1 bg-rose-600 mx-auto mt-8 rounded-full"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* For Couples */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
            >
              <div className="flex items-center mb-8">
                <span className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-rose-200 transition-colors">
                  <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <h3 className="text-2xl text-gray-800 font-semibold">Para o Casal</h3>
              </div>
              <ul className="space-y-6">
                {[
                  'Create and manage your guest list effortlessly',
                  'Acompanhe o status do RSVP em tempo real',
                  'Crie e gerencie seu registro de presentes',
                  'Site de casamento personalizado'
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start group"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center mr-3 group-hover:bg-rose-200 transition-colors">
                      <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* For Guests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
            >
              <div className="flex items-center mb-8">
                <span className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-rose-200 transition-colors">
                  <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                <h3 className="text-2xl text-gray-800 font-semibold">Para os Convidados</h3>
              </div>
              <ul className="space-y-6">
                {[
                  'Processo de RSVP fácil',
                  'Veja e compre presentes do registro',
                  'Deixe mensagens sentimentais para o casal',
                  'Especifique restrições alimentares e opções +1'
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start group"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center mr-3 group-hover:bg-rose-200 transition-colors">
                      <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl text-gray-800 font-light"
            >
              Planos Simples e Transparentes
              <span className="block mt-2 text-rose-600">para seu Casamento Perfeito</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-24 h-1 bg-rose-600 mx-auto mt-8 rounded-full"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Básico</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800">Grátis</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-rose-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Site de casamento básico
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-rose-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Lista de convidados (até 50)
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-rose-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  RSVP digital
                </li>
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 rounded-lg transition-colors"
              >
                Começar Grátis
              </Link>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-rose-200 relative transform hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 bg-rose-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                Popular
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800">R$199</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-rose-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Tudo do plano Básico
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-rose-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Lista de convidados ilimitada
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-rose-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Temas premium
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-rose-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Registro de presentes
                </li>
              </ul>
              <Link
                href="/signup?plan=premium"
                className="block w-full text-center bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Começar Agora
              </Link>
            </motion.div>

            {/* Luxury Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Luxo</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800">R$399</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-rose-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Tudo do plano Premium
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-rose-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Consultor dedicado
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-rose-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Design personalizado
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-rose-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Suporte prioritário 24/7
                </li>
              </ul>
              <Link
                href="/signup?plan=luxury"
                className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Contate-nos
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-rose-100 to-rose-50">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.6, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-200/40 via-transparent to-transparent"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center px-4"
        >
          <h2 className="text-4xl md:text-5xl mb-8 text-gray-800 font-light">
            Comece a Planejar seu
            <span className="block mt-2 text-rose-600 font-medium">Sonho de Casamento</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Junte-se a milhares de casais que tornaram seu processo de planejamento de casamento mais fácil com nossa plataforma
          </p>
          <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/signup"
                className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-12 py-4 rounded-full transition-colors shadow-lg text-lg font-medium hover:shadow-xl hover:shadow-rose-500/20"
              >
                Crie sua Página de Casamento
              </Link>
            </motion.div>
            <p className="text-sm text-gray-500">
              Grátis para começar • Nenhuma cartão de crédito necessário
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <svg className="w-8 h-8 mx-auto mb-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="font-semibold text-gray-800">Seguro & Protegido</h3>
              </motion.div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <svg className="w-8 h-8 mx-auto mb-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="font-semibold text-gray-800">Rápido & Fácil</h3>
              </motion.div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <svg className="w-8 h-8 mx-auto mb-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                <h3 className="font-semibold text-gray-800">Sempre Online</h3>
              </motion.div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <svg className="w-8 h-8 mx-auto mb-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="font-semibold text-gray-800">Suporte 24/7</h3>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Plataforma</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="#blog" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-rose-600 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Termos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Siga-nos</h3>
              <div className="flex space-x-4 justify-center">
                <a href="#" className="text-gray-600 hover:text-rose-600 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-rose-600 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-rose-600 transition-colors">
                  <span className="sr-only">Pinterest</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Wedding Platform. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client'

import { useAuth } from '@/components/providers/AuthProvider';
import { createClient } from '@/utils/supabase/client';
import { Baby, Cake, ChevronDownIcon, GlassWater, Heart, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export interface NavbarProps {
    isScrolled: boolean;
}

export default function Navbar({ isScrolled }: NavbarProps) {
    const { user, loading } = useAuth();
    const supabase = createClient();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut({ scope: 'local' });
        if (error) {
            console.error('Erro ao sair:', error);
        } else {
            window.location.reload();
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="text-4xl font-semibold text-shadow">
                            Celebrando
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8 ml-8">
                        <div className="group relative">
                            <button className={`flex items-center gap-2 ${isScrolled ? 'text-dune' : 'text-timberwolf'} hover:text-shadow transition-colors focus:outline-none`}>
                                Soluções
                                <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                            </button>
                            <div className="absolute left-1/2 -translate-x-1/2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="h-2 w-full" />
                                <div className="bg-white shadow-lg rounded-md overflow-hidden">
                                    <div className="p-2">
                                        <div className="flex items-start gap-3 p-3 cursor-pointer hover:bg-malta/5 transition-colors">
                                            <Baby className="w-5 h-5 mt-0.5 text-shadow" />
                                            <div>
                                                <div className="font-medium mb-1 text-dune">Brit Milah</div>
                                                <p className="text-sm text-dune/70">Organize a celebração com lista de convidados e presentes personalizados</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 cursor-pointer hover:bg-malta/5 transition-colors">
                                            <GlassWater className="w-5 h-5 mt-0.5 text-shadow" />
                                            <div>
                                                <div className="font-medium mb-1 text-dune">Bar e Bat Mitzvah</div>
                                                <p className="text-sm text-dune/70">Planeje cada detalhe da cerimônia com ferramentas especializadas</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 cursor-pointer hover:bg-malta/5 transition-colors">
                                            <Cake className="w-5 h-5 mt-0.5 text-shadow" />
                                            <div>
                                                <div className="font-medium mb-1 text-dune">Festa de 15 Anos</div>
                                                <p className="text-sm text-dune/70">Crie um site exclusivo com RSVP digital e gestão de convidados</p>
                                            </div>
                                        </div>
                                        <div className="h-px bg-malta/10 mx-2" />
                                        <div className="flex items-start gap-3 p-3 cursor-pointer hover:bg-malta/5 transition-colors bg-gradient-to-r from-malta/10 via-transparent to-transparent">
                                            <Heart className="w-5 h-5 mt-0.5 text-shadow" />
                                            <div>
                                                <div className="font-medium mb-1 text-dune">Casamentos</div>
                                                <p className="text-sm text-dune/70">Nossa solução completa para tornar seu dia especial ainda mais memorável</p>
                                            </div>
                                        </div>
                                        <div className="h-px bg-malta/10 mx-2" />
                                        <div className="p-3 cursor-pointer hover:bg-malta/5 transition-colors text-center">
                                            <span className="text-sm font-medium text-shadow">Ver todas as soluções</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link href="#pricing" className={`${isScrolled ? 'text-dune' : 'text-timberwolf'} hover:text-shadow transition-colors focus:outline-none`}>
                            Preços
                        </Link>
                        <Link href="#about" className={`${isScrolled ? 'text-dune' : 'text-timberwolf'} hover:text-shadow transition-colors focus:outline-none`}>
                            Sobre
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {loading ? (
                            <div className="animate-pulse bg-malta h-10 w-24 rounded-full"></div>
                        ) : user ? (
                            <div className="flex items-center space-x-4">
                                <Link href="/dashboard" className="h-10 flex items-center">
                                    <div className="flex items-center space-x-2 group h-full">
                                        <span className={`hidden sm:inline ${isScrolled ? 'text-dune' : 'text-timberwolf'} group-hover:text-shadow transition-colors`}>
                                            {user.email?.split('@')[0]}
                                        </span>
                                        <UserIcon className={`w-5 h-5 ${isScrolled ? 'text-dune' : 'text-timberwolf'} group-hover:text-shadow transition-colors`} />
                                    </div>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 group h-10"
                                >
                                    <span className={`hidden sm:inline ${isScrolled ? 'text-dune' : 'text-timberwolf'} group-hover:text-shadow transition-colors`}>
                                        Sair
                                    </span>
                                    <LogOutIcon className={`w-5 h-5 ${isScrolled ? 'text-dune' : 'text-timberwolf'} group-hover:text-shadow transition-colors`} />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="h-10 flex items-center bg-shadow text-timberwolf px-6 rounded-full hover:bg-pine-cone transition-all transform hover:scale-105"
                            >
                                <span className="sm:inline">Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
} 
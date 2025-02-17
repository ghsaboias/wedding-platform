'use client'

import Link from "next/link";

export interface FooterLink {
    text: string;
    href: string;
}

export interface FooterSection {
    title: string;
    links: FooterLink[];
}

export interface FooterProps {
    sections: FooterSection[];
}

export default function Footer({ sections }: FooterProps) {
    return (
        <footer className="bg-timberwolf py-16 px-4 border-t border-malta">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {sections.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-semibold text-dune mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link href={link.href} className="text-pine-cone hover:text-shadow transition-colors">
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-malta text-center">
                    <p className="text-pine-cone text-sm">
                        &copy; {new Date().getFullYear()} Wedding Platform. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
} 
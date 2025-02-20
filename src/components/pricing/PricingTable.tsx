'use client'

import { Check } from "lucide-react";
import Link from "next/link";

interface Feature {
    text: string;
}

interface PricingPlan {
    title: string;
    price: string;
    period?: string;
    features: Feature[];
    ctaText: string;
    ctaLink: string;
    ctaStyle: 'primary' | 'secondary' | 'dark';
    isPopular?: boolean;
}

interface PricingTableProps {
    plans: PricingPlan[];
    allFeatures: string[];
}

export default function PricingTable({ plans, allFeatures }: PricingTableProps) {
    const getCtaStyles = (style: 'primary' | 'secondary' | 'dark') => {
        switch (style) {
            case 'primary':
                return 'bg-shadow hover:bg-pine-cone text-timberwolf';
            case 'secondary':
                return 'bg-malta hover:bg-hillary text-dune';
            case 'dark':
                return 'bg-dune hover:bg-pine-cone text-timberwolf';
            default:
                return 'bg-shadow hover:bg-pine-cone text-timberwolf';
        }
    };

    return (
        <>
            {/* Mobile View - Cards */}
            <div className="md:hidden space-y-8">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`rounded-lg p-6 ${plan.isPopular ? 'bg-timberwolf shadow-lg ring-2 ring-shadow' : 'bg-timberwolf/50'}`}
                    >
                        {plan.isPopular && (
                            <div className="mb-4">
                                <span className="bg-shadow text-timberwolf px-3 py-1 rounded-full text-sm font-medium">
                                    Mais Popular
                                </span>
                            </div>
                        )}
                        <h3 className="text-2xl font-semibold text-dune">{plan.title}</h3>
                        <div className="mt-2 mb-6">
                            <span className="text-3xl font-bold text-dune">{plan.price}</span>
                            {plan.period && <span className="text-pine-cone">/{plan.period}</span>}
                        </div>

                        <div className="space-y-4">
                            {allFeatures.map((feature, featureIndex) => {
                                const hasFeature = plan.features.some(f => f.text === feature);
                                return (
                                    <div
                                        key={featureIndex}
                                        className={`flex items-center ${hasFeature ? 'text-pine-cone' : 'text-pine-cone/30'}`}
                                    >
                                        {hasFeature ? (
                                            <Check className="w-5 h-5 text-shadow mr-2 flex-shrink-0" />
                                        ) : (
                                            <span className="w-5 h-5 mr-2 flex-shrink-0">-</span>
                                        )}
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8">
                            <Link
                                href={plan.ctaLink}
                                className={`${getCtaStyles(plan.ctaStyle)} w-full block py-2 px-6 rounded-full text-center transition-all transform hover:scale-105 font-medium shadow-lg hover:shadow-xl`}
                            >
                                {plan.ctaText}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden md:block w-full overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="p-4 text-left text-pine-cone"></th>
                            {plans.map((plan, index) => (
                                <th key={index} className="p-4 text-center relative">
                                    <div className={`rounded-t-lg p-4 ${plan.isPopular ? 'bg-timberwolf shadow-lg' : ''}`}>
                                        {plan.isPopular && (
                                            <div className="absolute right-0 top-0 bg-shadow text-timberwolf px-3 py-1 rounded-full text-sm font-medium">
                                                Mais Popular
                                            </div>
                                        )}
                                        <h3 className="text-2xl font-semibold text-dune">{plan.title}</h3>
                                        <div className="mt-2">
                                            <span className="text-3xl font-bold text-dune">{plan.price}</span>
                                            {plan.period && <span className="text-pine-cone">/{plan.period}</span>}
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allFeatures.map((feature, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-timberwolf/50' : 'bg-timberwolf/20'}`}>
                                <td className="p-4 text-pine-cone font-medium">{feature}</td>
                                {plans.map((plan, planIndex) => (
                                    <td key={planIndex} className="p-4 text-center">
                                        {plan.features.some(f => f.text === feature) ? (
                                            <Check className="w-5 h-5 text-shadow mx-auto" />
                                        ) : (
                                            <span className="text-pine-cone/30">-</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td className="p-4"></td>
                            {plans.map((plan, index) => (
                                <td key={index} className="p-4 text-center">
                                    <Link
                                        href={plan.ctaLink}
                                        className={`${getCtaStyles(plan.ctaStyle)} inline-block py-2 px-6 rounded-full text-center transition-all transform hover:scale-105 font-medium shadow-lg`}
                                    >
                                        {plan.ctaText}
                                    </Link>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
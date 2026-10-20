import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig.js';

export default function ProcessSection({ onNavigateToSection }) {
  return (
    <section
      id="fonctionnement"
      aria-labelledby="process-heading"
      className="py-16 sm:py-24 bg-[#FDF2F7]/50 border-t border-[#F2DCE6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D81B60]">
            Comment ça fonctionne
          </span>
          <h2
            id="process-heading"
            className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]"
          >
            Une démarche simple et transparente
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#515154]">
            Préparez votre demande de soumission en quelques instants, sans engagement.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {BUSINESS_CONFIG.processSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="relative flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-8 border border-[#EFE4EA] shadow-sm"
            >
              <div>
                <span className="inline-flex items-center justify-center rounded-xl bg-[#FDF2F7] border border-[#F5D0E0] px-3.5 py-1.5 text-sm font-bold text-[#D81B60]">
                  Étape {step.stepNumber}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-[#1D1D1F]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-[#515154] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs sm:text-sm text-[#6E6E73] max-w-xl mx-auto">
            Note : La sélection d’une date dans le formulaire indique votre préférence et ne constitue pas une réservation automatique.
          </p>
          <div className="mt-5">
            <a
              href="#soumission"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToSection('#soumission');
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#D81B60] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#B8144F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2"
            >
              <span>Commencer ma demande de soumission</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

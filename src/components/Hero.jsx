import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig.js';

export default function Hero({ onNavigateToSection }) {
  return (
    <section
      id="accueil"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Colonne de texte */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDF2F7] border border-[#F5D0E0] px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[#B8144F]">
              <Sparkles className="h-3.5 w-3.5 text-[#D81B60]" aria-hidden="true" />
              <span>Entretien ménager résidentiel, commercial et bureaux</span>
            </div>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight text-[#1D1D1F] leading-[1.1]"
            >
              {BUSINESS_CONFIG.heroTitle}
            </h1>

            <p className="text-lg sm:text-xl text-[#515154] leading-relaxed max-w-xl">
              {BUSINESS_CONFIG.heroDescription}
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#soumission"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToSection('#soumission');
                }}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#D81B60] px-7 py-4 text-base font-semibold text-white shadow-sm hover:bg-[#B8144F] active:bg-[#9B1043] transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2"
              >
                <span>Demander une soumission</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToSection('#contact');
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#E5D8DF] px-7 py-4 text-base font-semibold text-[#1D1D1F] shadow-sm hover:bg-[#FDF2F7] hover:border-[#E8B9CE] transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2"
              >
                <span>Nous joindre</span>
              </a>
            </div>

            {/* Piliers de confiance issus de l'affiche */}
            <div className="pt-6 border-t border-[#EFE4EA] grid grid-cols-1 sm:grid-cols-3 gap-4">
              {BUSINESS_CONFIG.pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={pillar.id} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FDF2F7] text-[#D81B60]"
                      aria-hidden="true"
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1D1D1F]">{pillar.title}</p>
                      <p className="text-xs text-[#6E6E73] mt-0.5 leading-snug">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Colonne image éditoriale */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-[#FDF2F7] p-3 sm:p-4 border border-[#F2DCE6] shadow-sm">
              <div className="overflow-hidden rounded-2xl bg-white">
                <img
                  src={BUSINESS_CONFIG.images.hero}
                  alt="Salon et salle à manger lumineux et impeccablement propres dans un intérieur contemporain"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[460px] object-cover max-w-full"
                />
              </div>

              {/* Carte flottante discrète */}
              <div className="mt-3 sm:mt-0 sm:absolute sm:bottom-7 sm:left-7 sm:right-7 rounded-2xl bg-white/95 backdrop-blur-md p-4 sm:px-5 sm:py-4 border border-[#EFE4EA] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDF2F7] text-[#D81B60]"
                    aria-hidden="true"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1D1D1F]">
                      Un travail soigné, à chaque visite
                    </p>
                    <p className="text-xs text-[#515154]">
                      Option avec produits ou main-d’œuvre seulement selon votre préférence
                    </p>
                  </div>
                </div>
                <a
                  href={BUSINESS_CONFIG.phoneHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D81B60] hover:text-[#B8144F] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] rounded-lg px-2 py-1"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

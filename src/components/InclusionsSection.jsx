import React from 'react';
import { SlidersHorizontal, Check, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig.js';

export default function InclusionsSection({ currentSuppliesOption, onSelectLaborOnly }) {
  const isLaborOnlySelected =
    currentSuppliesOption === BUSINESS_CONFIG.laborOnlyOption.formValue;

  return (
    <section
      id="prestations"
      aria-labelledby="inclusions-heading"
      className="py-16 sm:py-24 bg-[#FAF8F6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Colonne gauche : présentation et image éditoriale */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D81B60]">
                Prestations
              </span>
              <h2
                id="inclusions-heading"
                className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]"
              >
                Ce que comprennent nos interventions
              </h2>
              <p className="mt-3 text-base text-[#515154] leading-relaxed">
                Chaque visite est réalisée avec méthode pour laisser vos pièces propres, saines et accueillantes.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#EFE4EA] bg-white p-2.5 shadow-sm">
              <img
                src={BUSINESS_CONFIG.images.inclusions}
                alt="Comptoir de cuisine moderne et lumineux parfaitement nettoyé"
                className="w-full h-64 sm:h-72 object-cover rounded-2xl max-w-full"
              />
            </div>

            {/* Carte option Main-d'œuvre seulement */}
            <div className="rounded-2xl bg-[#FDF2F7] border border-[#F2C6D8] p-6 shadow-sm">
              <div className="flex items-start gap-3.5">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#D81B60] border border-[#F2C6D8] shadow-sm"
                  aria-hidden="true"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-[#1D1D1F]">
                      {BUSINESS_CONFIG.laborOnlyOption.title}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-[#D81B60] border border-[#F2C6D8]">
                      Option flexible
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-[#515154] leading-relaxed">
                    {BUSINESS_CONFIG.laborOnlyOption.description}
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      id="btn-labor-only-option"
                      onClick={onSelectLaborOnly}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#D81B60] border border-[#EAB5CC] hover:bg-[#FCE4F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                    >
                      {isLaborOnlySelected ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden="true" />
                          <span>Option sélectionnée dans votre soumission</span>
                        </>
                      ) : (
                        <>
                          <span>Choisir cette option dans ma demande</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite : liste des 5 prestations */}
          <div className="lg:col-span-7 space-y-4">
            {BUSINESS_CONFIG.inclusions.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-4 rounded-2xl bg-white p-5 sm:p-6 border border-[#EFE4EA] shadow-sm hover:border-[#E4B8CB] transition-colors"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FDF2F7] text-[#D81B60]"
                    aria-hidden="true"
                  >
                    <IconComponent className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1D1D1F]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-[#515154] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

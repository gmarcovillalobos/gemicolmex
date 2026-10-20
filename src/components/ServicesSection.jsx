import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig.js';

export default function ServicesSection({ selectedServiceTitle, onSelectService }) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-16 sm:py-24 bg-[#FDF2F7]/65 border-y border-[#F2DCE6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D81B60]">
            Nos services
          </span>
          <h2
            id="services-heading"
            className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]"
          >
            Des solutions d’entretien adaptées à chaque espace
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#515154] leading-relaxed">
            Sélectionnez le service correspondant à vos besoins pour préremplir directement votre demande de soumission.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESS_CONFIG.services.map((service) => {
            const IconComponent = service.icon;
            const isSelected = selectedServiceTitle === service.title;

            return (
              <article
                key={service.id}
                className={`group flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-7 border transition-all motion-reduce:transition-none ${
                  isSelected
                    ? 'border-[#D81B60] ring-2 ring-[#D81B60]/15 shadow-md'
                    : 'border-[#EFE4EA] hover:border-[#E4B8CB] shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                        isSelected
                          ? 'bg-[#D81B60] text-white'
                          : 'bg-[#FDF2F7] text-[#D81B60] group-hover:bg-[#FCE4F0]'
                      }`}
                      aria-hidden="true"
                    >
                      <IconComponent className="h-6 w-6" />
                    </span>

                    <span className="inline-flex items-center rounded-full bg-[#FAF8F6] border border-[#EFE4EA] px-3 py-1 text-xs font-medium text-[#515154]">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-[#1D1D1F]">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-sm sm:text-base text-[#515154] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-7 pt-4 border-t border-[#F6EEF2]">
                  <button
                    type="button"
                    id={`btn-select-${service.id}`}
                    onClick={() => onSelectService(service.title)}
                    aria-pressed={isSelected}
                    className={`w-full inline-flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2 ${
                      isSelected
                        ? 'bg-[#FDF2F7] text-[#D81B60] border border-[#F2C6D8]'
                        : 'bg-[#FAF8F6] text-[#1D1D1F] hover:bg-[#FDF2F7] hover:text-[#D81B60]'
                    }`}
                  >
                    <span>Choisir ce service</span>
                    {isSelected ? (
                      <Check className="h-4 w-4 text-[#D81B60]" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-[#D81B60]" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig.js';

export default function FaqSection() {
  const [openId, setOpenId] = useState(BUSINESS_CONFIG.faqs[0].id);

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="questions-frequentes"
      aria-labelledby="faq-heading"
      className="py-16 sm:py-24 bg-[#FDF2F7]/55 border-t border-[#F2DCE6]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D81B60]">
            Questions fréquentes
          </span>
          <h2
            id="faq-heading"
            className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]"
          >
            Tout savoir sur nos services d’entretien
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#515154]">
            Des réponses claires pour vous aider à planifier votre demande de soumission.
          </p>
        </div>

        <div className="mt-10 space-y-3.5">
          {BUSINESS_CONFIG.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `panel-${faq.id}`;
            const buttonId = `btn-${faq.id}`;

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-[#EFE4EA] shadow-sm overflow-hidden"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-base sm:text-lg font-semibold text-[#1D1D1F] hover:bg-[#FDF2F7]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D81B60]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#D81B60] shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={isOpen ? 'px-6 pb-6 pt-1 text-sm sm:text-base text-[#515154] leading-relaxed border-t border-[#F8F1F4]' : 'hidden'}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Phone, MessageCircle, ExternalLink, Mail, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig.js';

export default function ContactFooter({ onNavigateToSection }) {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-white border-t border-[#EFE4EA]"
    >
      {/* Section de contact principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="rounded-3xl bg-[#FDF2F7] border border-[#F2C6D8] p-8 sm:p-12">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D81B60]">
              Nous joindre
            </span>
            <h2
              id="contact-heading"
              className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]"
            >
              Parlons de votre espace
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#515154] leading-relaxed">
              Communiquez avec notre équipe par téléphone, sur WhatsApp ou par courriel pour toute question ou demande de soumission.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Téléphone */}
            <a
              href={BUSINESS_CONFIG.phoneHref}
              className="group flex items-start gap-4 rounded-2xl bg-white p-5 sm:p-6 border border-[#EFE4EA] shadow-sm hover:border-[#D81B60] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FDF2F7] text-[#D81B60] group-hover:bg-[#D81B60] group-hover:text-white transition-colors"
                aria-hidden="true"
              >
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73]">
                  Téléphone
                </p>
                <p className="mt-1 text-lg font-semibold text-[#1D1D1F] group-hover:text-[#D81B60] transition-colors">
                  {BUSINESS_CONFIG.phoneDisplay}
                </p>
                <p className="mt-1 text-xs text-[#515154]">Appeler directement</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={BUSINESS_CONFIG.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl bg-white p-5 sm:p-6 border border-[#EFE4EA] shadow-sm hover:border-[#D81B60] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FDF2F7] text-[#D81B60] group-hover:bg-[#D81B60] group-hover:text-white transition-colors"
                aria-hidden="true"
              >
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73]">
                  WhatsApp
                </p>
                <p className="mt-1 text-lg font-semibold text-[#1D1D1F] group-hover:text-[#D81B60] transition-colors">
                  {BUSINESS_CONFIG.phoneDisplay}
                </p>
                <p className="mt-1 text-xs text-[#515154] inline-flex items-center gap-1">
                  <span>Écrire sur WhatsApp</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </p>
              </div>
            </a>

            {/* Courriel */}
            <a
              href={BUSINESS_CONFIG.emailHref}
              className="group flex items-start gap-4 rounded-2xl bg-white p-5 sm:p-6 border border-[#EFE4EA] shadow-sm hover:border-[#D81B60] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FDF2F7] text-[#D81B60] group-hover:bg-[#D81B60] group-hover:text-white transition-colors"
                aria-hidden="true"
              >
                <Mail className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73]">
                  Courriel
                </p>
                <p className="mt-1 text-sm sm:text-base font-semibold text-[#1D1D1F] truncate group-hover:text-[#D81B60] transition-colors">
                  {BUSINESS_CONFIG.email}
                </p>
                <p className="mt-1 text-xs text-[#515154]">Envoyer un courriel</p>
              </div>
            </a>
          </div>
        </div>

        {/* Barre inférieure du pied de page */}
        <div className="mt-12 pt-8 border-t border-[#EFE4EA] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDF2F7] border border-[#F5D0E0] text-[#D81B60]"
              aria-hidden="true"
            >
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-base font-semibold text-[#1D1D1F]">
                {BUSINESS_CONFIG.companyName}
              </p>
              <p className="text-sm font-medium text-[#D81B60]">
                {BUSINESS_CONFIG.tagline}
              </p>
            </div>
          </div>

          <nav aria-label="Liens du pied de page" className="flex flex-wrap justify-center gap-4 text-sm text-[#515154]">
            {BUSINESS_CONFIG.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToSection(item.href);
                }}
                className="hover:text-[#D81B60] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] rounded px-1.5 py-0.5"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

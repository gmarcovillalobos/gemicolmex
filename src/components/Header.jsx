import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Phone, Menu, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig.js';

export default function Header({ onNavigateToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateToSection(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F6]/90 backdrop-blur-md border-b border-[#EFE4EA] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Identité provisoire centralisée */}
          <a
            href="#accueil"
            onClick={(e) => handleLinkClick(e, '#accueil')}
            className="group inline-flex items-center gap-3 rounded-xl py-1.5 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2"
            aria-label={`${BUSINESS_CONFIG.companyName} — Retour à l’accueil`}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF2F7] border border-[#F5D0E0] text-[#D81B60] shadow-sm transition-transform motion-reduce:transition-none group-hover:scale-105"
              aria-hidden="true"
            >
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-semibold tracking-tight text-[#1D1D1F]">
                {BUSINESS_CONFIG.companyName}
              </span>
              <span className="text-xs text-[#6E6E73] hidden sm:inline">
                Résidentiel • Commercial • Bureaux
              </span>
            </div>
          </a>

          {/* Navigation principale (Bureau) */}
          <nav
            aria-label="Navigation principale"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {BUSINESS_CONFIG.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#3A3A3C] hover:text-[#D81B60] hover:bg-[#FDF2F7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Bouton d'action principal (Bureau) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#soumission"
              onClick={(e) => handleLinkClick(e, '#soumission')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D81B60] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#B8144F] active:bg-[#9B1043] transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2"
            >
              <span>Demander une soumission</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Bouton du menu mobile */}
          <div className="flex md:hidden">
            <button
              type="button"
              id="btn-menu-mobile"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="menu-mobile-panel"
              aria-label={
                mobileMenuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'
              }
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-[#1D1D1F] hover:bg-[#FDF2F7] hover:text-[#D81B60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Panneau de navigation mobile */}
      {mobileMenuOpen && (
        <div
          id="menu-mobile-panel"
          className="md:hidden border-t border-[#EFE4EA] bg-[#FAF8F6] px-4 pt-3 pb-6 shadow-lg"
        >
          <nav aria-label="Navigation mobile" className="flex flex-col space-y-1.5">
            {BUSINESS_CONFIG.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="px-4 py-3 rounded-xl text-base font-medium text-[#1D1D1F] hover:bg-[#FDF2F7] hover:text-[#D81B60] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-[#EFE4EA] flex flex-col gap-2.5">
              <a
                href="#soumission"
                onClick={(e) => handleLinkClick(e, '#soumission')}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#D81B60] px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#B8144F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
              >
                <span>Demander une soumission</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={BUSINESS_CONFIG.phoneHref}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#FDF2F7] border border-[#F3D1E0] px-5 py-2.5 text-sm font-medium text-[#1D1D1F] hover:bg-[#FCE4F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
              >
                <Phone className="h-4 w-4 text-[#D81B60]" aria-hidden="true" />
                <span>{BUSINESS_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

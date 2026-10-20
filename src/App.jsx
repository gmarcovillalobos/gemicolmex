import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Home,
  Building2,
  Store,
  Truck,
  Sparkles,
  Droplets,
  Maximize2,
  Layers,
  ShieldCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  MapPin,
  Menu,
  X,
  Copy,
  ExternalLink,
  AlertCircle,
  ArrowRight,
  Clock,
  HeartHandshake,
  SlidersHorizontal,
  Info,
  FileText,
  Eye,
  Wand2,
  RotateCcw,
  Plus,
  Minus,
  Compass,
  Sliders,
} from 'lucide-react';

// ============================================================================
// CONFIGURATION CENTRALISÉE DE L'ENTREPRISE (Québec, fr-CA)
// Modifiez simplement `companyName` lorsque le nom commercial définitif sera choisi.
// ============================================================================
export const BUSINESS_CONFIG = {
  companyName: 'Services de nettoyage',
  tagline: 'Votre espace, notre priorité.',
  heroBadge: 'DES ESPACES PLUS SAINS AU QUOTIDIEN',
  heroTitle: 'Un espace propre. L’esprit tranquille.',
  heroDescription:
    'Des services d’entretien ménager résidentiel et commercial, adaptés à votre espace et à vos besoins.',
  phoneDisplay: '514-516-6773',
  phoneHref: 'tel:+15145166773',
  whatsappBaseUrl: 'https://wa.me/15145166773',
  email: 'solucionesmdsas@gmail.com',
  emailHref: 'mailto:solucionesmdsas@gmail.com',
  images: {
    hero: '/images/hero_interior.jpg',
    inclusions: '/images/kitchen_interior.jpg',
    office: '/images/service_office.jpg',
    commercial: '/images/service_commercial.jpg',
    move: '/images/service_move.jpg',
    event: '/images/service_event.jpg',
  },
  navigation: [
    { label: 'Services', href: '#services' },
    { label: 'Comment ça fonctionne', href: '#fonctionnement' },
    { label: 'Demande de soumission', href: '#soumission' },
    { label: 'Contact', href: '#contact' },
  ],
  pillars: [
    {
      id: 'fiable',
      title: 'Fiable et digne de confiance',
      description: 'Un travail soigné, exécuté avec discrétion et respect de vos lieux.',
      icon: ShieldCheck,
    },
    {
      id: 'ponctualite',
      title: 'Ponctualité et flexibilité',
      description: 'Des interventions planifiées selon vos disponibilités et votre rythme.',
      icon: Clock,
    },
    {
      id: 'adapte',
      title: 'Service adapté à vos besoins',
      description: 'Une formule personnalisée pour chaque résidence, bureau ou commerce.',
      icon: HeartHandshake,
    },
  ],
  services: [
    {
      id: 'entretien-residentiel',
      title: 'Entretien résidentiel',
      shortTitle: 'Résidentiel',
      description: 'Maisons et appartements, pour un espace agréable au quotidien.',
      badge: 'Résidentiel',
      icon: Home,
      imageKey: 'hero',
      defaultPropertyType: 'Appartement ou condo',
      propertyTypes: [
        'Appartement ou condo',
        'Maison unifamiliale',
        'Duplex ou triplex',
        'Autre habitation résidentielle',
      ],
      highlights: [
        'Cuisine, salles de bain et pièces de vie',
        'Planchers, vitres accessibles et miroirs',
        'Époussetage complet et désinfection',
      ],
      isResidential: true,
      showBathrooms: true,
      defaultFrequency: 'Toutes les deux semaines',
    },
    {
      id: 'entretien-bureaux',
      title: 'Entretien de bureaux',
      shortTitle: 'Bureaux',
      description: 'Des espaces de travail propres et accueillants.',
      badge: 'Bureaux',
      icon: Building2,
      imageKey: 'office',
      defaultPropertyType: 'Bureau professionnel',
      propertyTypes: [
        'Bureau professionnel',
        'Espace de travail partagé',
        'Cabinet ou clinique',
        'Autre local de bureau',
      ],
      highlights: [
        'Postes de travail, salles de réunion et accueil',
        'Cuisinette, salles d’eau et surfaces vitrées',
        'Désinfection des points de contact fréquents',
      ],
      isResidential: false,
      showBathrooms: true,
      defaultFrequency: 'Chaque semaine',
    },
    {
      id: 'entretien-commercial',
      title: 'Entretien commercial',
      shortTitle: 'Commercial',
      description: 'Un entretien adapté aux commerces et aux locaux professionnels.',
      badge: 'Commercial',
      icon: Store,
      imageKey: 'commercial',
      defaultPropertyType: 'Commerce ou boutique',
      propertyTypes: [
        'Commerce ou boutique',
        'Locaux professionnels',
        'Studio ou salle d’exposition',
        'Autre espace commercial',
      ],
      highlights: [
        'Aires d’accueil clients et présentoirs',
        'Vitrines accessibles, miroirs et planchers',
        'Sanitaires et espaces réservés au personnel',
      ],
      isResidential: false,
      showBathrooms: true,
      defaultFrequency: 'Chaque semaine',
    },
    {
      id: 'nettoyage-demenagement',
      title: 'Nettoyage après déménagement',
      shortTitle: 'Déménagement',
      description: 'Un nettoyage en profondeur avant votre arrivée ou après votre départ.',
      badge: 'Grand ménage',
      icon: Truck,
      imageKey: 'move',
      defaultPropertyType: 'Appartement ou condo',
      propertyTypes: [
        'Appartement ou condo',
        'Maison unifamiliale',
        'Duplex ou triplex',
        'Bureau ou local commercial',
      ],
      highlights: [
        'Remise à neuf complète des pièces vides',
        'Nettoyage approfondi cuisine et salle de bain',
        'Lavage minutieux des planchers et plinthes',
      ],
      isResidential: true,
      showBathrooms: true,
      defaultFrequency: 'Une seule fois',
    },
    {
      id: 'nettoyage-evenement',
      title: 'Nettoyage après événement',
      shortTitle: 'Événement',
      description: 'Retrouvez un espace propre après vos réceptions et événements.',
      badge: 'Événementiel',
      icon: Sparkles,
      imageKey: 'event',
      defaultPropertyType: 'Résidence privée',
      propertyTypes: [
        'Résidence privée',
        'Salle de réception ou espace événementiel',
        'Bureau ou local commercial',
      ],
      highlights: [
        'Remise en ordre rapide après réception',
        'Nettoyage des surfaces, verres et comptoirs',
        'Aspiration, lavage des planchers et sanitaires',
      ],
      isResidential: false,
      showBathrooms: true,
      defaultFrequency: 'Une seule fois',
    },
  ],
  inclusions: [
    {
      id: 'general-profondeur',
      title: 'Nettoyage général et en profondeur',
      description:
        'Entretien complet des aires de vie, des pièces communes et des surfaces accessibles.',
      zoneLabel: 'Surfaces & aires communes',
      hotspotX: '28%',
      hotspotY: '46%',
      icon: Sparkles,
    },
    {
      id: 'cuisine-salle-bain',
      title: 'Cuisine et salle de bain',
      description:
        'Lavage minutieux des comptoirs, éviers, lavabos, robinetteries et installations sanitaires.',
      zoneLabel: 'Comptoirs, évier & robinetterie',
      hotspotX: '52%',
      hotspotY: '49%',
      icon: Droplets,
    },
    {
      id: 'vitres-miroirs',
      title: 'Vitres et miroirs',
      description:
        'Nettoyage sans traces des miroirs et des surfaces vitrées intérieures accessibles.',
      zoneLabel: 'Fenêtres & surfaces vitrées',
      hotspotX: '86%',
      hotspotY: '34%',
      icon: Maximize2,
    },
    {
      id: 'planchers',
      title: 'Nettoyage des planchers',
      description:
        'Aspiration et lavage soignés adaptés à tous les types de planchers.',
      zoneLabel: 'Planchers de bois & céramique',
      hotspotX: '74%',
      hotspotY: '78%',
      icon: Layers,
    },
    {
      id: 'epoussetage-desinfection',
      title: 'Époussetage et désinfection',
      description:
        'Retrait de la poussière sur le mobilier et désinfection des surfaces fréquemment touchées.',
      zoneLabel: 'Armoires, poignées & mobilier',
      hotspotX: '18%',
      hotspotY: '32%',
      icon: ShieldCheck,
    },
  ],
  laborOnlyOption: {
    title: 'Main-d’œuvre seulement',
    description: 'Vous fournissez les produits et le matériel de nettoyage.',
    formValue: 'Je fournis les produits et le matériel',
  },
  processSteps: [
    {
      stepNumber: '1',
      title: 'Décrivez vos besoins.',
      subtitle: 'Demande de soumission',
      description:
        'Indiquez le service souhaité, le type d’espace, la fréquence et vos préférences dans notre configurateur interactif.',
      detailTag: 'Configuration en moins de 2 minutes',
      icon: FileText,
    },
    {
      stepNumber: '2',
      title: 'Recevez une soumission personnalisée.',
      subtitle: 'Évaluation personnalisée',
      description:
        'Préparez votre demande en un clic et transmettez-la à notre équipe pour obtenir une proposition adaptée à votre espace.',
      detailTag: 'Réponse directe par notre équipe',
      icon: Calendar,
    },
    {
      stepNumber: '3',
      title: 'Convenez d’une date avec notre équipe.',
      subtitle: 'Planification sur mesure',
      description:
        'Nous validons la disponibilité selon votre date souhaitée et confirmons avec vous les détails de la visite.',
      detailTag: 'Horaire confirmé avec vous',
      icon: Sparkles,
    },
  ],
  frequencies: [
    'Une seule fois',
    'Chaque semaine',
    'Toutes les deux semaines',
    'Chaque mois',
  ],
  suppliesOptions: [
    'À discuter avec l’équipe',
    'Je fournis les produits et le matériel',
  ],
  bedroomOptions: ['Studio / Loft', '1', '2', '3', '4', '5 ou plus'],
  bathroomOptions: ['1', '2', '3', '4 ou plus'],
  surfacePresets: [
    { label: 'Moins de 1 000 pi²', value: '850' },
    { label: '1 001 – 1 500 pi²', value: '1250' },
    { label: '1 501 – 2 500 pi²', value: '1850' },
    { label: 'Plus de 2 500 pi²', value: '2800' },
  ],
  priorityTags: [
    'Cuisine en profondeur',
    'Salles de bain',
    'Vitres et miroirs intérieurs',
    'Lavage des planchers',
    'Époussetage complet',
  ],
  quoteDisclaimer: 'Le tarif et la disponibilité seront confirmés par notre équipe.',
  whatsappConfirmationNote:
    'Votre demande sera envoyée lorsque vous confirmerez l’envoi dans WhatsApp.',
  faqs: [
    {
      id: 'faq-espaces',
      question: 'Quels types d’espaces nettoyez-vous ?',
      answer:
        'Nous assurons l’entretien ménager des espaces résidentiels (maisons, appartements et condos), des bureaux ainsi que des commerces et locaux professionnels. Nous proposons également le nettoyage après déménagement et le nettoyage après événement.',
    },
    {
      id: 'faq-produits',
      question: 'Puis-je fournir mes produits et mon matériel ?',
      answer:
        'Tout à fait. Vous pouvez sélectionner l’option « Main-d’œuvre seulement » (« Je fournis les produits et le matériel ») dans le formulaire de demande de soumission, ou choisir « À discuter avec l’équipe » pour convenir ensemble de la formule qui vous convient.',
    },
    {
      id: 'faq-soumission',
      question: 'Comment obtenir une soumission ?',
      answer:
        'Complétez la section « Demande de soumission » sur cette page, puis cliquez sur « Préparer ma demande ». Vous pourrez vérifier l’aperçu complet de votre message avant de l’envoyer sur WhatsApp au 514-516-6773, ou nous joindre directement par téléphone ou par courriel.',
    },
    {
      id: 'faq-date',
      question: 'La date souhaitée est-elle automatiquement confirmée ?',
      answer:
        'Non. La date sélectionnée dans le formulaire indique votre préférence afin d’orienter notre équipe. Le tarif et la disponibilité seront confirmés directement avec vous après réception de votre demande.',
    },
  ],
};

// ============================================================================
// UTILITAIRES DE DATE ET DE FORMATAGE (fr-CA)
// ============================================================================
function getLocalTodayIso() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDaysToIso(baseIso, daysToAdd) {
  const parts = baseIso.split('-').map(Number);
  const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
  dateObj.setDate(dateObj.getDate() + daysToAdd);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateFrCA(isoDate) {
  if (!isoDate) return 'Non précisée';
  const parts = isoDate.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return isoDate;
  const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
  try {
    return new Intl.DateTimeFormat('fr-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  } catch (e) {
    return isoDate;
  }
}

// ============================================================================
// COMPOSANT : EN-TÊTE (Header)
// ============================================================================
function Header({ onNavigateToSection }) {
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
    <header className="sticky top-0 z-50 bg-[#FAF8F6]/90 backdrop-blur-xl border-b border-[#EFE4EA] transition-all">
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
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D81B60] to-[#B8144F] text-white shadow-sm transition-transform duration-300 motion-reduce:transition-none group-hover:scale-105"
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
                className="px-3.5 py-2 rounded-full text-sm font-medium text-[#3A3A3C] hover:text-[#D81B60] hover:bg-[#FDF2F7] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D81B60] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#B8144F] hover:shadow-md active:scale-[0.99] transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2"
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
                mobileMenuOpen
                  ? 'Fermer le menu de navigation'
                  : 'Ouvrir le menu de navigation'
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

// ============================================================================
// COMPOSANT : HERO IMMERSIF AVEC SÉLECTEUR INTERACTIF D'ESPACE
// ============================================================================
function Hero({ selectedServiceTitle, onSelectService, onNavigateToSection }) {
  const [hoveredServiceId, setHoveredServiceId] = useState(null);

  const activePreviewService = useMemo(() => {
    if (hoveredServiceId) {
      return (
        BUSINESS_CONFIG.services.find((s) => s.id === hoveredServiceId) ||
        BUSINESS_CONFIG.services[0]
      );
    }
    return (
      BUSINESS_CONFIG.services.find((s) => s.title === selectedServiceTitle) ||
      BUSINESS_CONFIG.services[0]
    );
  }, [hoveredServiceId, selectedServiceTitle]);

  const activeImageSrc =
    BUSINESS_CONFIG.images[activePreviewService.imageKey] ||
    BUSINESS_CONFIG.images.hero;

  return (
    <section
      id="accueil"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#FAF8F6] border-b border-[#EFE4EA]"
    >
      {/* Arrière-plan éditorial fondu style magazine (inspiré de la maquette de référence) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="relative rounded-[2rem] overflow-hidden bg-white border border-[#EFE4EA] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Colonne gauche : Contenu éditorial sur fond dégradé chaud */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between bg-gradient-to-br from-white via-[#FAF8F6] to-[#FDF2F7]/70 z-10">
              <div className="space-y-5 sm:space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#FDF2F7] border border-[#F5D0E0] px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D81B60]">
                  <Sparkles className="h-3.5 w-3.5 text-[#D81B60]" aria-hidden="true" />
                  <span>{BUSINESS_CONFIG.heroBadge}</span>
                </div>

                <h1
                  id="hero-heading"
                  className="text-4xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-[#1D1D1F] leading-[1.08]"
                >
                  {BUSINESS_CONFIG.heroTitle}
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-[#515154] leading-relaxed max-w-xl">
                  {BUSINESS_CONFIG.heroDescription}
                </p>

                {/* Boutons d'action principaux */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                  <a
                    href="#soumission"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateToSection('#soumission');
                    }}
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#D81B60] px-7 py-4 text-base font-semibold text-white shadow-sm hover:bg-[#B8144F] hover:shadow-md active:scale-[0.99] transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2"
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
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#E5D8DF] px-6 py-4 text-base font-semibold text-[#1D1D1F] shadow-sm hover:bg-[#FDF2F7] hover:border-[#E8B9CE] transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2"
                  >
                    <span>Nous joindre</span>
                  </a>
                </div>
              </div>

              {/* Sélecteur interactif d'aperçu en direct dans le Hero */}
              <div className="mt-8 pt-6 border-t border-[#EFE4EA]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] mb-3 flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5 text-[#D81B60]" aria-hidden="true" />
                  <span>Explorez nos interventions par type d’espace :</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_CONFIG.services.map((service) => {
                    const IconComp = service.icon;
                    const isCurrent = activePreviewService.id === service.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        id={`btn-hero-preview-${service.id}`}
                        onMouseEnter={() => setHoveredServiceId(service.id)}
                        onMouseLeave={() => setHoveredServiceId(null)}
                        onClick={() => onSelectService(service.title)}
                        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs sm:text-sm font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] ${
                          isCurrent
                            ? 'bg-[#D81B60] text-white border-[#D81B60] shadow-sm scale-[1.02]'
                            : 'bg-white/90 text-[#1D1D1F] border-[#E6D7DF] hover:border-[#D81B60] hover:bg-[#FDF2F7]'
                        }`}
                      >
                        <IconComp className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{service.shortTitle}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Colonne droite : Photographie dynamique avec fondu latéral et badge interactif */}
            <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[520px] bg-[#FDF2F7] overflow-hidden">
              <img
                src={activeImageSrc}
                alt={`Aperçu d’un espace impeccable : ${activePreviewService.title}`}
                className="w-full h-full object-cover transition-all duration-500 motion-reduce:transition-none"
              />
              {/* Fondu doux vers la colonne de texte sur grand écran */}
              <div
                className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FAF8F6] via-[#FAF8F6]/50 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Carte interactive superposée */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 rounded-2xl bg-white/95 backdrop-blur-md p-4 border border-[#EFE4EA] shadow-lg transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDF2F7] text-[#D81B60] border border-[#F5D0E0]"
                      aria-hidden="true"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#D81B60]">
                        {activePreviewService.badge}
                      </span>
                      <p className="text-sm font-semibold text-[#1D1D1F]">
                        {activePreviewService.title}
                      </p>
                      <p className="text-xs text-[#515154] mt-0.5 line-clamp-2">
                        {activePreviewService.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bandeau des 3 engagements issus du flyer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {BUSINESS_CONFIG.pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="flex items-start gap-3.5 rounded-2xl bg-white/80 px-5 py-4 border border-[#EFE4EA] shadow-sm"
              >
                <div
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FDF2F7] text-[#D81B60]"
                  aria-hidden="true"
                >
                  <IconComponent className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1D1D1F]">{pillar.title}</p>
                  <p className="text-xs text-[#6E6E73] mt-0.5 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPOSANT : GALERIE PHOTOGRAPHIQUE INTERACTIVE DES 5 SERVICES (ServicesSection)
// ============================================================================
function ServicesSection({ selectedServiceTitle, onSelectService }) {
  const [expandedCardId, setExpandedCardId] = useState(null);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-16 sm:py-24 bg-[#FAF8F6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D81B60]">
              NOS SERVICES
            </span>
            <h2
              id="services-heading"
              className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]"
            >
              Des solutions de nettoyage pour chaque besoin
            </h2>
            <p className="mt-2.5 text-base sm:text-lg text-[#515154] leading-relaxed">
              Un service professionnel et attentionné, pour des espaces propres et agréables à vivre ou à travailler.
            </p>
          </div>
          <p className="text-xs font-medium text-[#6E6E73]">
            Cliquez sur une carte pour préremplir votre demande de soumission.
          </p>
        </div>

        {/* Grille à 5 colonnes sur grand écran comme dans la maquette de référence */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {BUSINESS_CONFIG.services.map((service) => {
            const IconComponent = service.icon;
            const isSelected = selectedServiceTitle === service.title;
            const isExpanded = expandedCardId === service.id;
            const cardImage =
              BUSINESS_CONFIG.images[service.imageKey] || BUSINESS_CONFIG.images.hero;

            return (
              <article
                key={service.id}
                className={`group flex flex-col justify-between rounded-2xl bg-white overflow-hidden border transition-all duration-300 motion-reduce:transition-none ${
                  isSelected
                    ? 'border-[#D81B60] ring-2 ring-[#D81B60]/20 shadow-lg -translate-y-1'
                    : 'border-[#EFE4EA] hover:border-[#E4B8CB] shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Miniature photographique en haut de chaque carte */}
                  <div className="relative h-36 overflow-hidden bg-[#FDF2F7]">
                    <img
                      src={cardImage}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold text-[#1D1D1F] shadow-sm">
                        {service.badge}
                      </span>
                    </div>
                  </div>

                  {/* Contenu de la carte avec icône en superposition */}
                  <div className="p-5 pt-0">
                    <div className="-mt-6 relative z-10 inline-flex">
                      <span
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white shadow-sm transition-colors ${
                          isSelected
                            ? 'bg-[#D81B60] text-white'
                            : 'bg-[#FDF2F7] text-[#D81B60] group-hover:bg-[#D81B60] group-hover:text-white'
                        }`}
                        aria-hidden="true"
                      >
                        <IconComponent className="h-5 w-5" />
                      </span>
                    </div>

                    <h3 className="mt-3.5 text-base font-bold text-[#1D1D1F] leading-snug">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#515154] leading-relaxed">
                      {service.description}
                    </p>

                    {/* Bouton interactif pour afficher/masquer les points clés du service */}
                    <button
                      type="button"
                      id={`btn-details-${service.id}`}
                      onClick={() =>
                        setExpandedCardId(isExpanded ? null : service.id)
                      }
                      aria-expanded={isExpanded}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#D81B60] hover:text-[#B8144F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] rounded"
                    >
                      <span>{isExpanded ? 'Masquer les détails' : 'Points clés'}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {isExpanded && (
                      <ul className="mt-2.5 pt-2.5 border-t border-[#F5ECEF] space-y-1.5 text-xs text-[#515154]">
                        {service.highlights.map((pt) => (
                          <li key={pt} className="flex items-start gap-1.5">
                            <Check
                              className="h-3.5 w-3.5 text-[#D81B60] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Pied de carte : bouton "Choisir ce service" */}
                <div className="px-5 pb-5 pt-2">
                  <button
                    type="button"
                    id={`btn-select-${service.id}`}
                    onClick={() => onSelectService(service.title)}
                    aria-pressed={isSelected}
                    className={`w-full inline-flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2 ${
                      isSelected
                        ? 'bg-[#D81B60] text-white shadow-sm'
                        : 'bg-[#FDF2F7] text-[#D81B60] hover:bg-[#D81B60] hover:text-white'
                    }`}
                  >
                    <span>Choisir ce service</span>
                    {isSelected ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
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

// ============================================================================
// COMPOSANT : PRESTATIONS INTERACTIVES AVEC EXPLORATEUR PAR ZONE & SIMULATEUR D'ÉCLAT
// ============================================================================
function InclusionsSection({ currentSuppliesOption, onSelectLaborOnly }) {
  const [activeZoneId, setActiveZoneId] = useState(
    BUSINESS_CONFIG.inclusions[0].id
  );
  const [visualMode, setVisualMode] = useState('hotspots'); // 'hotspots' | 'simulator'
  const [sparkleLevel, setSparkleLevel] = useState(82);

  const isLaborOnlySelected =
    currentSuppliesOption === BUSINESS_CONFIG.laborOnlyOption.formValue;

  const activeInclusion = useMemo(() => {
    return (
      BUSINESS_CONFIG.inclusions.find((item) => item.id === activeZoneId) ||
      BUSINESS_CONFIG.inclusions[0]
    );
  }, [activeZoneId]);

  return (
    <section
      id="prestations"
      aria-labelledby="inclusions-heading"
      className="py-16 sm:py-24 bg-white border-t border-[#EFE4EA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D81B60]">
              CE QUI EST INCLUS
            </span>
            <h2
              id="inclusions-heading"
              className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]"
            >
              Un nettoyage complet et soigné
            </h2>
            <p className="mt-2.5 text-base sm:text-lg text-[#515154] leading-relaxed">
              Explorez les zones d’intervention en cliquant sur les points interactifs ou sur chaque prestation ci-dessous.
            </p>
          </div>

          {/* Commutateur d'effet interactif */}
          <div
            role="group"
            aria-label="Mode d’exploration visuelle"
            className="inline-flex rounded-full bg-[#FAF8F6] p-1 border border-[#EFE4EA] self-start"
          >
            <button
              type="button"
              id="btn-mode-hotspots"
              onClick={() => setVisualMode('hotspots')}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] ${
                visualMode === 'hotspots'
                  ? 'bg-[#D81B60] text-white shadow-sm'
                  : 'text-[#515154] hover:text-[#1D1D1F]'
              }`}
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>Points interactifs</span>
            </button>
            <button
              type="button"
              id="btn-mode-simulator"
              onClick={() => setVisualMode('simulator')}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] ${
                visualMode === 'simulator'
                  ? 'bg-[#D81B60] text-white shadow-sm'
                  : 'text-[#515154] hover:text-[#1D1D1F]'
              }`}
            >
              <Sliders className="h-4 w-4" aria-hidden="true" />
              <span>Simulateur Avant / Après</span>
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Colonne gauche : Grille interactive des prestations + Option Main-d'œuvre seulement */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BUSINESS_CONFIG.inclusions.map((item, idx) => {
                const IconComponent = item.icon;
                const isSelected = activeZoneId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    id={`btn-zone-${item.id}`}
                    onClick={() => {
                      setActiveZoneId(item.id);
                      setVisualMode('hotspots');
                    }}
                    className={`text-left rounded-2xl p-5 border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] ${
                      isSelected
                        ? 'bg-[#FDF2F7] border-[#D81B60] shadow-sm'
                        : 'bg-[#FAF8F6] border-[#EFE4EA] hover:bg-white hover:border-[#E4B8CB]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          isSelected
                            ? 'bg-[#D81B60] text-white'
                            : 'bg-white text-[#D81B60] border border-[#F2C6D8]'
                        }`}
                        aria-hidden="true"
                      >
                        <IconComponent className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#D81B60]">
                            Zone 0{idx + 1}
                          </span>
                          <Check
                            className="h-4 w-4 text-[#D81B60] shrink-0"
                            aria-hidden="true"
                          />
                        </div>
                        <h3 className="mt-1 text-base font-bold text-[#1D1D1F]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-[#515154] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* 6e carte dans la grille 2x3 : Option Main-d'œuvre seulement */}
              <div className="rounded-2xl bg-gradient-to-br from-[#FDF2F7] to-[#FCE4F0]/70 border border-[#F2C6D8] p-5 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#D81B60] border border-[#F2C6D8]"
                      aria-hidden="true"
                    >
                      <SlidersHorizontal className="h-5 w-5" />
                    </span>
                    <span className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#D81B60] border border-[#F2C6D8]">
                      Formule au choix
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-[#1D1D1F]">
                    {BUSINESS_CONFIG.laborOnlyOption.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#515154] leading-relaxed">
                    {BUSINESS_CONFIG.laborOnlyOption.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F2C6D8]/60">
                  <button
                    type="button"
                    id="btn-labor-only-option"
                    onClick={onSelectLaborOnly}
                    className="w-full inline-flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 text-xs font-semibold text-[#D81B60] border border-[#EAB5CC] hover:bg-[#D81B60] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                  >
                    <span>
                      {isLaborOnlySelected
                        ? 'Option sélectionnée dans votre soumission'
                        : 'Choisir cette option dans ma demande'}
                    </span>
                    {isLaborOnlySelected ? (
                      <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite : Scène visuelle interactive (Hotspots ou Simulateur Avant/Après) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[#FAF8F6] border border-[#EFE4EA] p-4 shadow-sm">
              {visualMode === 'hotspots' ? (
                <div>
                  <div className="relative overflow-hidden rounded-2xl bg-white">
                    <img
                      src={BUSINESS_CONFIG.images.inclusions}
                      alt="Cuisine moderne lumineuse avec points d’inspection interactifs"
                      className="w-full h-[320px] sm:h-[360px] object-cover max-w-full"
                    />
                    {/* Points interactifs (Hotspots) sur l'image */}
                    {BUSINESS_CONFIG.inclusions.map((item, idx) => {
                      const isActive = activeZoneId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          id={`btn-hotspot-${item.id}`}
                          onClick={() => setActiveZoneId(item.id)}
                          aria-label={`Inspecter la zone : ${item.title}`}
                          style={{ left: item.hotspotX, top: item.hotspotY }}
                          className={`-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                            isActive
                              ? 'h-10 w-10 bg-[#D81B60] text-white ring-4 ring-[#D81B60]/30 scale-110 z-20 shadow-lg'
                              : 'h-8 w-8 bg-white/95 text-[#D81B60] border border-[#D81B60] hover:scale-110 z-10 shadow-md'
                          }`}
                        >
                          <span className="text-xs font-bold">{idx + 1}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Carte descriptive de la zone sélectionnée */}
                  <div className="mt-4 rounded-2xl bg-white p-4 border border-[#EFE4EA] flex items-start gap-3.5">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDF2F7] text-[#D81B60]"
                      aria-hidden="true"
                    >
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#D81B60]">
                        {activeInclusion.zoneLabel}
                      </span>
                      <h4 className="text-sm font-bold text-[#1D1D1F] mt-0.5">
                        {activeInclusion.title}
                      </h4>
                      <p className="text-xs text-[#515154] mt-1 leading-relaxed">
                        {activeInclusion.description}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Simulateur Avant / Après avec curseur interactif */
                <div>
                  <div className="relative overflow-hidden rounded-2xl bg-white select-none">
                    {/* Image de fond : Avant l'entretien (voile terne et contraste réduit) */}
                    <img
                      src={BUSINESS_CONFIG.images.inclusions}
                      alt="Aperçu avant l’entretien ménager"
                      className="w-full h-[320px] sm:h-[360px] object-cover filter brightness-90 contrast-75 sepia-[0.18] blur-[0.6px] max-w-full"
                    />
                    {/* Image de dessus découpée : Après l'entretien (éclat lumineux) */}
                    <div
                      style={{ clipPath: `inset(0 ${100 - sparkleLevel}% 0 0)` }}
                      className="absolute inset-0"
                    >
                      <img
                        src={BUSINESS_CONFIG.images.inclusions}
                        alt="Aperçu après l’entretien ménager"
                        className="w-full h-[320px] sm:h-[360px] object-cover max-w-full"
                      />
                    </div>

                    {/* Ligne de séparation verticale */}
                    <div
                      style={{ left: `${sparkleLevel}%` }}
                      className="absolute inset-y-0 w-0.5 bg-[#D81B60] shadow-md pointer-events-none"
                      aria-hidden="true"
                    >
                      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-[#D81B60] text-white shadow-lg border-2 border-white">
                        <Sliders className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 rounded-full bg-[#D81B60] px-3 py-1 text-[11px] font-semibold text-white shadow">
                      Après notre passage
                    </div>
                    <div className="absolute top-3 right-3 rounded-full bg-[#1D1D1F]/80 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-white shadow">
                      Avant l’entretien
                    </div>
                  </div>

                  {/* Curseur accessible */}
                  <div className="mt-4 rounded-2xl bg-white p-4 border border-[#EFE4EA]">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#1D1D1F] mb-2">
                      <label htmlFor="slider-sparkle-compare">
                        Glissez pour comparer l’éclat des surfaces
                      </label>
                      <span className="text-[#D81B60]">{sparkleLevel} %</span>
                    </div>
                    <input
                      id="slider-sparkle-compare"
                      type="range"
                      min="5"
                      max="95"
                      value={sparkleLevel}
                      onChange={(e) => setSparkleLevel(Number(e.target.value))}
                      className="w-full accent-[#D81B60] cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPOSANT : PROCESSUS INTERACTIF EN 3 ÉTAPES (ProcessSection)
// ============================================================================
function ProcessSection({ onNavigateToSection }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section
      id="fonctionnement"
      aria-labelledby="process-heading"
      className="py-16 sm:py-24 bg-[#FDF2F7]/70 border-y border-[#F2DCE6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D81B60]">
            COMMENT ÇA FONCTIONNE
          </span>
          <h2
            id="process-heading"
            className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]"
          >
            Une approche simple et efficace
          </h2>
          <p className="mt-2.5 text-base sm:text-lg text-[#515154]">
            Obtenez une soumission personnalisée rapidement et convenez d’une visite avec notre équipe.
          </p>
        </div>

        {/* Barre de progression interactive */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {BUSINESS_CONFIG.processSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isCurrent = activeStepIndex === index;

            return (
              <div
                key={step.stepNumber}
                onMouseEnter={() => setActiveStepIndex(index)}
                onClick={() => setActiveStepIndex(index)}
                className={`cursor-pointer rounded-2xl p-6 sm:p-7 border transition-all duration-300 ${
                  isCurrent
                    ? 'bg-white border-[#D81B60] shadow-md -translate-y-1'
                    : 'bg-white/80 border-[#EFE4EA] hover:bg-white hover:border-[#E4B8CB] shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D81B60] text-sm font-bold text-white shadow-sm">
                      {step.stepNumber}
                    </span>
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF2F7] text-[#D81B60]"
                      aria-hidden="true"
                    >
                      <StepIcon className="h-5 w-5" />
                    </span>
                  </div>
                  {index < 2 && (
                    <ChevronRight
                      className="hidden md:block h-5 w-5 text-[#D81B60]/50"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#D81B60]">
                  {step.subtitle}
                </p>
                <h3 className="mt-1 text-lg sm:text-xl font-bold text-[#1D1D1F]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[#515154] leading-relaxed">
                  {step.description}
                </p>
                <div className="mt-4 pt-3 border-t border-[#F5ECEF] flex items-center justify-between text-xs font-medium text-[#6E6E73]">
                  <span>{step.detailTag}</span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isCurrent ? 'bg-[#D81B60]' : 'bg-[#E5D8DF]'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white/90 border border-[#EFE4EA] px-6 py-4">
          <p className="text-xs sm:text-sm text-[#515154]">
            Note : La sélection d’une date dans le formulaire indique votre préférence et ne constitue pas une réservation automatique.
          </p>
          <a
            href="#soumission"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToSection('#soumission');
            }}
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#D81B60] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#B8144F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
          >
            <span>Configurer ma demande</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPOSANT : CONFIGURATEUR INTERACTIF DE SOUMISSION (QuoteSection)
// Inclut : Remplissage d'exemple en 1 clic, curseur de superficie, tags interactifs
// et carte latérale "Votre demande" inspirée de la maquette de référence.
// ============================================================================
function QuoteSection({
  formData,
  setFormData,
  selectionBanner,
  onClearSelectionBanner,
}) {
  const [errors, setErrors] = useState({});
  const [previewReady, setPreviewReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const [selectedPriorityTags, setSelectedPriorityTags] = useState([]);
  const previewRef = useRef(null);
  const errorSummaryRef = useRef(null);

  const todayIso = useMemo(() => getLocalTodayIso(), []);

  // Configuration du service actuellement sélectionné
  const currentServiceConfig = useMemo(() => {
    return (
      BUSINESS_CONFIG.services.find((s) => s.title === formData.serviceType) ||
      BUSINESS_CONFIG.services[0]
    );
  }, [formData.serviceType]);

  // Détermine si le champ "Nombre de chambres" est pertinent
  const showBedroomsField = useMemo(() => {
    if (formData.serviceType === 'Entretien résidentiel') return true;
    if (
      formData.serviceType === 'Nettoyage après déménagement' &&
      formData.propertyType !== 'Bureau ou local commercial'
    ) {
      return true;
    }
    return false;
  }, [formData.serviceType, formData.propertyType]);

  // Détermine si le champ "Nombre de salles de bain" est pertinent
  const showBathroomsField = useMemo(() => {
    return Boolean(currentServiceConfig.showBathrooms);
  }, [currentServiceConfig]);

  // Calcul du niveau de complétion du formulaire pour la barre de progression en direct
  const completionPercentage = useMemo(() => {
    let completed = 0;
    const total = 6;
    if (formData.serviceType) completed += 1;
    if (formData.propertyType) completed += 1;
    if (formData.frequency) completed += 1;
    if (formData.desiredDate && formData.desiredDate >= todayIso) completed += 1;
    if (formData.fullName && formData.fullName.trim().length >= 2) completed += 1;
    if (
      formData.phone &&
      formData.phone.replace(/\D/g, '').length >= 10 &&
      formData.citySector &&
      formData.citySector.trim().length >= 2
    ) {
      completed += 1;
    }
    return Math.round((completed / total) * 100);
  }, [formData, todayIso]);

  // Mise à jour d'un champ du formulaire
  const handleFieldChange = (field, value) => {
    setPreviewReady(false);
    setCopyStatus(false);

    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === 'serviceType') {
        const matchedService =
          BUSINESS_CONFIG.services.find((s) => s.title === value) ||
          BUSINESS_CONFIG.services[0];
        if (!matchedService.propertyTypes.includes(prev.propertyType)) {
          updated.propertyType = matchedService.defaultPropertyType;
        }
        if (
          value === 'Nettoyage après déménagement' ||
          value === 'Nettoyage après événement'
        ) {
          updated.frequency = 'Une seule fois';
        }
      }
      return updated;
    });

    if (errors[field]) {
      setErrors((prevErrors) => {
        const next = { ...prevErrors };
        delete next[field];
        return next;
      });
    }
  };

  // Basculer un tag de priorité interactif
  const handleTogglePriorityTag = (tag) => {
    setPreviewReady(false);
    setSelectedPriorityTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Remplir un exemple réaliste en un clic (comme "Exemple de formulaire rempli" sur l'image)
  const handleFillExample = () => {
    setErrors({});
    setPreviewReady(false);
    setSelectedPriorityTags(['Cuisine en profondeur', 'Vitres et miroirs intérieurs']);
    setFormData({
      serviceType: 'Entretien résidentiel',
      propertyType: 'Appartement ou condo',
      areaSqFt: '1250',
      bedrooms: '3',
      bathrooms: '2',
      frequency: 'Toutes les deux semaines',
      desiredDate: addDaysToIso(todayIso, 3),
      supplies: 'À discuter avec l’équipe',
      fullName: 'Camille Tremblay',
      phone: '514-555-0199',
      email: 'camille.tremblay@exemple.ca',
      citySector: 'Montréal (Plateau-Mont-Royal)',
      additionalNotes:
        'Nettoyage en profondeur souhaité pour la cuisine et les portes vitrées.',
    });
  };

  const handleResetForm = () => {
    setErrors({});
    setPreviewReady(false);
    setCopyStatus(false);
    setSelectedPriorityTags([]);
    setFormData({
      serviceType: BUSINESS_CONFIG.services[0].title,
      propertyType: BUSINESS_CONFIG.services[0].defaultPropertyType,
      areaSqFt: '',
      bedrooms: '2',
      bathrooms: '1',
      frequency: BUSINESS_CONFIG.services[0].defaultFrequency,
      desiredDate: addDaysToIso(todayIso, 2),
      supplies: BUSINESS_CONFIG.suppliesOptions[0],
      fullName: '',
      phone: '',
      email: '',
      citySector: '',
      additionalNotes: '',
    });
  };

  // Validation complète en français canadien (fr-CA)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.serviceType) {
      newErrors.serviceType = 'Veuillez sélectionner un type de service.';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Veuillez sélectionner un type de propriété.';
    }

    if (formData.areaSqFt && String(formData.areaSqFt).trim() !== '') {
      const numericArea = Number(formData.areaSqFt);
      if (Number.isNaN(numericArea) || numericArea <= 0 || numericArea > 250000) {
        newErrors.areaSqFt =
          'Veuillez inscrire une superficie valide en pieds carrés (ex. : 1200).';
      }
    }

    if (showBedroomsField && !formData.bedrooms) {
      newErrors.bedrooms = 'Veuillez indiquer le nombre de chambres.';
    }

    if (showBathroomsField && !formData.bathrooms) {
      newErrors.bathrooms = 'Veuillez indiquer le nombre de salles de bain.';
    }

    if (!formData.frequency) {
      newErrors.frequency = 'Veuillez choisir une fréquence d’entretien.';
    }

    if (!formData.desiredDate) {
      newErrors.desiredDate = 'Veuillez sélectionner une date souhaitée.';
    } else if (formData.desiredDate < todayIso) {
      newErrors.desiredDate =
        'La date souhaitée doit être aujourd’hui ou une date future.';
    }

    if (!formData.supplies) {
      newErrors.supplies =
        'Veuillez préciser votre préférence concernant les produits et le matériel.';
    }

    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Veuillez inscrire votre nom complet.';
    }

    const digitsOnly = (formData.phone || '').replace(/\D/g, '');
    if (!formData.phone || digitsOnly.length < 10) {
      newErrors.phone =
        'Veuillez inscrire un numéro de téléphone valide (au moins 10 chiffres).';
    }

    if (formData.email && formData.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email =
          'Veuillez inscrire une adresse courriel valide (ex. : nom@domaine.ca).';
      }
    }

    if (!formData.citySector || formData.citySector.trim().length < 2) {
      newErrors.citySector = 'Veuillez indiquer votre ville ou votre secteur.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Génération du message structuré en français pour WhatsApp et le presse-papiers
  const generatedFrenchMessage = useMemo(() => {
    const lines = [
      `Bonjour ${BUSINESS_CONFIG.companyName},`,
      `Je souhaite obtenir une soumission pour un service d’entretien ménager :`,
      ``,
      `• Type de service : ${formData.serviceType}`,
      `• Type de propriété : ${formData.propertyType}`,
    ];

    if (formData.areaSqFt && String(formData.areaSqFt).trim() !== '') {
      lines.push(`• Superficie approximative : ${formData.areaSqFt.trim()} pi²`);
    }

    if (showBedroomsField && formData.bedrooms) {
      lines.push(`• Nombre de chambres : ${formData.bedrooms}`);
    }

    if (showBathroomsField && formData.bathrooms) {
      lines.push(`• Nombre de salles de bain : ${formData.bathrooms}`);
    }

    lines.push(`• Fréquence : ${formData.frequency}`);
    lines.push(
      `• Date souhaitée : ${
        formData.desiredDate ? formatDateFrCA(formData.desiredDate) : 'À convenir'
      }`
    );
    lines.push(`• Produits et matériel : ${formData.supplies}`);

    if (selectedPriorityTags.length > 0) {
      lines.push(`• Priorités ciblées : ${selectedPriorityTags.join(', ')}`);
    }

    lines.push(``);
    lines.push(`Coordonnées :`);
    lines.push(`• Nom complet : ${formData.fullName.trim() || 'Non précisé'}`);
    lines.push(`• Téléphone : ${formData.phone.trim() || 'Non précisé'}`);

    if (formData.email && formData.email.trim() !== '') {
      lines.push(`• Courriel : ${formData.email.trim()}`);
    }

    lines.push(`• Ville ou secteur : ${formData.citySector.trim() || 'Non précisé'}`);

    if (formData.additionalNotes && formData.additionalNotes.trim() !== '') {
      lines.push(``);
      lines.push(`Précisions supplémentaires :`);
      lines.push(formData.additionalNotes.trim());
    }

    lines.push(``);
    lines.push(`Merci !`);

    return lines.join('\n');
  }, [formData, showBedroomsField, showBathroomsField, selectedPriorityTags]);

  // Construction du lien WhatsApp avec encodeURIComponent
  const whatsappUrl = useMemo(() => {
    return `${BUSINESS_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(
      generatedFrenchMessage
    )}`;
  }, [generatedFrenchMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      setPreviewReady(false);
      setTimeout(() => {
        if (errorSummaryRef.current) {
          errorSummaryRef.current.focus();
        }
      }, 50);
      return;
    }

    setPreviewReady(true);
    setTimeout(() => {
      if (previewRef.current) {
        previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        previewRef.current.focus();
      }
    }, 80);
  };

  const handleCopyRequest = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(generatedFrenchMessage);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = generatedFrenchMessage;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 3500);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = generatedFrenchMessage;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 3500);
    }
  };

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const errorKeys = Object.keys(errors);

  return (
    <section
      id="soumission"
      aria-labelledby="quote-heading"
      className="py-16 sm:py-24 bg-[#FAF8F6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D81B60]">
              DEMANDE DE SOUMISSION
            </span>
            <h2
              id="quote-heading"
              className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]"
            >
              Obtenez une soumission personnalisée
            </h2>
            <p className="mt-2.5 text-base sm:text-lg text-[#515154] leading-relaxed">
              Un formulaire clair et intuitif, avec un résumé qui se met à jour en temps réel.
            </p>
          </div>

          {/* Boutons interactifs : Remplir un exemple ou Réinitialiser */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              id="btn-fill-example"
              onClick={handleFillExample}
              className="inline-flex items-center gap-2 rounded-full bg-[#FDF2F7] border border-[#F2C6D8] px-4 py-2 text-xs sm:text-sm font-semibold text-[#D81B60] hover:bg-[#FCE4F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
            >
              <Wand2 className="h-4 w-4" aria-hidden="true" />
              <span>Exemple de demande remplie</span>
            </button>
            <button
              type="button"
              id="btn-reset-form"
              onClick={handleResetForm}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E5D8DF] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#515154] hover:text-[#1D1D1F] hover:bg-[#FAF8F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Réinitialiser</span>
            </button>
          </div>
        </div>

        {/* Bannière de confirmation lors d'une sélection depuis les cartes */}
        {selectionBanner && (
          <div
            role="status"
            aria-live="polite"
            className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-[#FDF2F7] border border-[#F2C6D8] px-4 py-3.5 text-sm text-[#1D1D1F]"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-[#D81B60] shrink-0" aria-hidden="true" />
              <span>{selectionBanner}</span>
            </div>
            <button
              type="button"
              id="btn-close-selection-banner"
              onClick={onClearSelectionBanner}
              aria-label="Fermer la notification de sélection"
              className="rounded-lg p-1 text-[#515154] hover:bg-white hover:text-[#1D1D1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Formulaire principal (7 colonnes) */}
          <div className="lg:col-span-7">
            <form
              id="quote-request-form"
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl bg-white p-6 sm:p-8 lg:p-10 border border-[#EFE4EA] shadow-sm space-y-8"
            >
              {/* Résumé d'erreurs accessible */}
              {errorKeys.length > 0 && (
                <div
                  ref={errorSummaryRef}
                  tabIndex={-1}
                  role="alert"
                  aria-labelledby="error-summary-title"
                  className="rounded-2xl bg-[#FEF2F2] border border-[#FECACA] p-4 sm:p-5 text-sm text-[#991B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-[#DC2626] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 id="error-summary-title" className="font-semibold text-[#7F1D1D]">
                        Veuillez vérifier les champs suivants avant de préparer votre demande :
                      </h3>
                      <ul className="mt-2 list-disc list-inside space-y-1 text-xs sm:text-sm">
                        {errorKeys.map((key) => (
                          <li key={key}>{errors[key]}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Bloc 1 : Votre espace et le service souhaité */}
              <fieldset className="space-y-6">
                <legend className="text-lg font-bold text-[#1D1D1F] pb-2 border-b border-[#F5ECEF] w-full">
                  1. Détails de l’entretien
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Type de service */}
                  <div>
                    <label
                      htmlFor="field-serviceType"
                      className="block text-sm font-semibold text-[#1D1D1F]"
                    >
                      Type de service <span className="text-[#D81B60]" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="field-serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={(e) => handleFieldChange('serviceType', e.target.value)}
                      aria-invalid={Boolean(errors.serviceType)}
                      aria-describedby={errors.serviceType ? 'err-serviceType' : undefined}
                      className="mt-2 block w-full rounded-xl border border-[#DFD2D9] bg-[#FAF8F6] px-3.5 py-3 text-sm text-[#1D1D1F] shadow-sm focus:border-[#D81B60] focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                    >
                      {BUSINESS_CONFIG.services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                    {errors.serviceType && (
                      <p id="err-serviceType" className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                        {errors.serviceType}
                      </p>
                    )}
                  </div>

                  {/* Type de propriété */}
                  <div>
                    <label
                      htmlFor="field-propertyType"
                      className="block text-sm font-semibold text-[#1D1D1F]"
                    >
                      Type de propriété <span className="text-[#D81B60]" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="field-propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={(e) => handleFieldChange('propertyType', e.target.value)}
                      aria-invalid={Boolean(errors.propertyType)}
                      aria-describedby={errors.propertyType ? 'err-propertyType' : undefined}
                      className="mt-2 block w-full rounded-xl border border-[#DFD2D9] bg-[#FAF8F6] px-3.5 py-3 text-sm text-[#1D1D1F] shadow-sm focus:border-[#D81B60] focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                    >
                      {currentServiceConfig.propertyTypes.map((propType) => (
                        <option key={propType} value={propType}>
                          {propType}
                        </option>
                      ))}
                    </select>
                    {errors.propertyType && (
                      <p id="err-propertyType" className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                        {errors.propertyType}
                      </p>
                    )}
                  </div>
                </div>

                {/* Superficie approximative (pi²) avec préréglages rapides interactifs */}
                <div className="rounded-2xl bg-[#FAF8F6] p-4 border border-[#EFE4EA]">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-5">
                      <label
                        htmlFor="field-areaSqFt"
                        className="block text-sm font-semibold text-[#1D1D1F]"
                      >
                        Superficie approximative (pi²)
                        <span className="block text-xs font-normal text-[#6E6E73]">
                          Optionnel — Saisissez ou choisissez un palier
                        </span>
                      </label>
                      <input
                        id="field-areaSqFt"
                        name="areaSqFt"
                        type="number"
                        min="100"
                        step="50"
                        inputMode="numeric"
                        placeholder="Ex. : 1250"
                        value={formData.areaSqFt}
                        onChange={(e) => handleFieldChange('areaSqFt', e.target.value)}
                        aria-invalid={Boolean(errors.areaSqFt)}
                        aria-describedby={errors.areaSqFt ? 'err-areaSqFt' : undefined}
                        className="mt-2 block w-full rounded-xl border border-[#DFD2D9] bg-white px-3.5 py-2.5 text-sm text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:border-[#D81B60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                      />
                    </div>

                    <div className="sm:col-span-7">
                      <span className="block text-xs font-medium text-[#6E6E73] mb-2">
                        Sélection rapide de superficie :
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {BUSINESS_CONFIG.surfacePresets.map((preset) => {
                          const isSelected = String(formData.areaSqFt) === preset.value;
                          return (
                            <button
                              key={preset.value}
                              type="button"
                              id={`btn-surface-${preset.value}`}
                              onClick={() => handleFieldChange('areaSqFt', preset.value)}
                              className={`rounded-xl px-3 py-2 text-xs font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] ${
                                isSelected
                                  ? 'bg-[#D81B60] text-white border-[#D81B60]'
                                  : 'bg-white text-[#1D1D1F] border-[#DFD2D9] hover:border-[#D81B60] hover:bg-[#FDF2F7]'
                              }`}
                            >
                              {preset.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {errors.areaSqFt && (
                    <p id="err-areaSqFt" className="mt-2 text-xs font-medium text-[#B91C1C]">
                      {errors.areaSqFt}
                    </p>
                  )}
                </div>

                {/* Nombre de chambres et Nombre de salles de bain */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {showBedroomsField && (
                    <div>
                      <label
                        htmlFor="field-bedrooms"
                        className="block text-sm font-semibold text-[#1D1D1F]"
                      >
                        Nombre de chambres <span className="text-[#D81B60]" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="field-bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={(e) => handleFieldChange('bedrooms', e.target.value)}
                        aria-invalid={Boolean(errors.bedrooms)}
                        aria-describedby={errors.bedrooms ? 'err-bedrooms' : undefined}
                        className="mt-2 block w-full rounded-xl border border-[#DFD2D9] bg-[#FAF8F6] px-3.5 py-3 text-sm text-[#1D1D1F] shadow-sm focus:border-[#D81B60] focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                      >
                        {BUSINESS_CONFIG.bedroomOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.bedrooms && (
                        <p id="err-bedrooms" className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                          {errors.bedrooms}
                        </p>
                      )}
                    </div>
                  )}

                  {showBathroomsField && (
                    <div>
                      <label
                        htmlFor="field-bathrooms"
                        className="block text-sm font-semibold text-[#1D1D1F]"
                      >
                        Nombre de salles de bain{' '}
                        <span className="text-[#D81B60]" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="field-bathrooms"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={(e) => handleFieldChange('bathrooms', e.target.value)}
                        aria-invalid={Boolean(errors.bathrooms)}
                        aria-describedby={errors.bathrooms ? 'err-bathrooms' : undefined}
                        className="mt-2 block w-full rounded-xl border border-[#DFD2D9] bg-[#FAF8F6] px-3.5 py-3 text-sm text-[#1D1D1F] shadow-sm focus:border-[#D81B60] focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                      >
                        {BUSINESS_CONFIG.bathroomOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.bathrooms && (
                        <p id="err-bathrooms" className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                          {errors.bathrooms}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Fréquence */}
                <div>
                  <span className="block text-sm font-semibold text-[#1D1D1F]">
                    Fréquence <span className="text-[#D81B60]" aria-hidden="true">*</span>
                  </span>
                  <div
                    role="radiogroup"
                    aria-label="Fréquence"
                    className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2.5"
                  >
                    {BUSINESS_CONFIG.frequencies.map((freq) => {
                      const active = formData.frequency === freq;
                      return (
                        <button
                          key={freq}
                          type="button"
                          id={`btn-freq-${freq.replace(/\s+/g, '-').toLowerCase()}`}
                          role="radio"
                          aria-checked={active}
                          onClick={() => handleFieldChange('frequency', freq)}
                          className={`rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold border text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] ${
                            active
                              ? 'bg-[#D81B60] text-white border-[#D81B60] shadow-sm'
                              : 'bg-[#FAF8F6] text-[#1D1D1F] border-[#DFD2D9] hover:bg-[#FDF2F7] hover:border-[#E4B8CB]'
                          }`}
                        >
                          {freq}
                        </button>
                      );
                    })}
                  </div>
                  {errors.frequency && (
                    <p className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                      {errors.frequency}
                    </p>
                  )}
                </div>

                {/* Date souhaitée & Produits et matériel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="field-desiredDate"
                      className="block text-sm font-semibold text-[#1D1D1F]"
                    >
                      Date souhaitée <span className="text-[#D81B60]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="field-desiredDate"
                      name="desiredDate"
                      type="date"
                      min={todayIso}
                      value={formData.desiredDate}
                      onChange={(e) => handleFieldChange('desiredDate', e.target.value)}
                      aria-invalid={Boolean(errors.desiredDate)}
                      aria-describedby="hint-desiredDate"
                      className="mt-2 block w-full rounded-xl border border-[#DFD2D9] bg-[#FAF8F6] px-3.5 py-3 text-sm text-[#1D1D1F] shadow-sm focus:border-[#D81B60] focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                    />
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        id="btn-date-today"
                        onClick={() => handleFieldChange('desiredDate', todayIso)}
                        className="rounded-lg bg-[#FDF2F7] px-2.5 py-1 text-xs font-medium text-[#B8144F] hover:bg-[#FCE4F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                      >
                        Aujourd’hui
                      </button>
                      <button
                        type="button"
                        id="btn-date-tomorrow"
                        onClick={() =>
                          handleFieldChange('desiredDate', addDaysToIso(todayIso, 1))
                        }
                        className="rounded-lg bg-[#FDF2F7] px-2.5 py-1 text-xs font-medium text-[#B8144F] hover:bg-[#FCE4F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                      >
                        Demain
                      </button>
                      <button
                        type="button"
                        id="btn-date-nextweek"
                        onClick={() =>
                          handleFieldChange('desiredDate', addDaysToIso(todayIso, 7))
                        }
                        className="rounded-lg bg-[#FDF2F7] px-2.5 py-1 text-xs font-medium text-[#B8144F] hover:bg-[#FCE4F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                      >
                        Dans 7 jours
                      </button>
                    </div>
                    <p id="hint-desiredDate" className="mt-1.5 text-xs text-[#6E6E73]">
                      Date à titre indicatif; confirmée avec notre équipe.
                    </p>
                    {errors.desiredDate && (
                      <p className="mt-1 text-xs font-medium text-[#B91C1C]">
                        {errors.desiredDate}
                      </p>
                    )}
                  </div>

                  {/* Produits et matériel */}
                  <div>
                    <label
                      htmlFor="field-supplies"
                      className="block text-sm font-semibold text-[#1D1D1F]"
                    >
                      Produits et matériel{' '}
                      <span className="text-[#D81B60]" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="field-supplies"
                      name="supplies"
                      value={formData.supplies}
                      onChange={(e) => handleFieldChange('supplies', e.target.value)}
                      aria-invalid={Boolean(errors.supplies)}
                      aria-describedby={errors.supplies ? 'err-supplies' : undefined}
                      className="mt-2 block w-full rounded-xl border border-[#DFD2D9] bg-[#FAF8F6] px-3.5 py-3 text-sm text-[#1D1D1F] shadow-sm focus:border-[#D81B60] focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                    >
                      {BUSINESS_CONFIG.suppliesOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-xs text-[#6E6E73]">
                      Option « Main-d’œuvre seulement » disponible si vous fournissez vos produits.
                    </p>
                    {errors.supplies && (
                      <p id="err-supplies" className="mt-1 text-xs font-medium text-[#B91C1C]">
                        {errors.supplies}
                      </p>
                    )}
                  </div>
                </div>

                {/* Tags interactifs de priorités */}
                <div>
                  <span className="block text-sm font-semibold text-[#1D1D1F]">
                    Zones prioritaires à cibler{' '}
                    <span className="text-xs font-normal text-[#6E6E73]">(optionnel)</span>
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {BUSINESS_CONFIG.priorityTags.map((tag, idx) => {
                      const isSelected = selectedPriorityTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          id={`btn-priority-${idx}`}
                          aria-pressed={isSelected}
                          onClick={() => handleTogglePriorityTag(tag)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] ${
                            isSelected
                              ? 'bg-[#D81B60] text-white border-[#D81B60]'
                              : 'bg-[#FAF8F6] text-[#515154] border-[#DFD2D9] hover:border-[#D81B60] hover:text-[#D81B60]'
                          }`}
                        >
                          {isSelected ? (
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          <span>{tag}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </fieldset>

              {/* Bloc 2 : Coordonnées */}
              <fieldset className="space-y-6 pt-2">
                <legend className="text-lg font-bold text-[#1D1D1F] pb-2 border-b border-[#F5ECEF] w-full">
                  2. Vos coordonnées
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nom complet */}
                  <div>
                    <label
                      htmlFor="field-fullName"
                      className="block text-sm font-semibold text-[#1D1D1F]"
                    >
                      Nom complet <span className="text-[#D81B60]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="field-fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Ex. : Camille Tremblay"
                      value={formData.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'err-fullName' : undefined}
                      className="mt-2 block w-full rounded-xl border border-[#DFD2D9] bg-[#FAF8F6] px-3.5 py-3 text-sm text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:border-[#D81B60] focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                    />
                    {errors.fullName && (
                      <p id="err-fullName" className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label
                      htmlFor="field-phone"
                      className="block text-sm font-semibold text-[#1D1D1F]"
                    >
                      Téléphone <span className="text-[#D81B60]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="field-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Ex. : 514-555-0199"
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'err-phone' : undefined}
                      className="mt-2 block w-full rounded-xl border border-[#DFD2D9] bg-[#FAF8F6] px-3.5 py-3 text-sm text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:border-[#D81B60] focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                    />
                    {errors.phone && (
                      <p id="err-phone" className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Courriel (optionnel) */}
                  <div>
                    <label
                      htmlFor="field-email"
                      className="block text-sm font-semibold text-[#1D1D1F]"
                    >
                      Courriel{' '}
                      <span className="text-xs font-normal text-[#6E6E73]">(optionnel)</span>
                    </label>
                    <input
                      id="field-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Ex. : camille@exemple.ca"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                      className="mt-2 block w-full rounded-xl border border-[#DFD2D9] bg-[#FAF8F6] px-3.5 py-3 text-sm text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:border-[#D81B60] focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                    />
                    {errors.email && (
                      <p id="err-email" className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Ville ou secteur */}
                  <div>
                    <label
                      htmlFor="field-citySector"
                      className="block text-sm font-semibold text-[#1D1D1F]"
                    >
                      Ville ou secteur <span className="text-[#D81B60]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="field-citySector"
                      name="citySector"
                      type="text"
                      placeholder="Ex. : Montréal, Laval, Longueuil…"
                      value={formData.citySector}
                      onChange={(e) => handleFieldChange('citySector', e.target.value)}
                      aria-invalid={Boolean(errors.citySector)}
                      aria-describedby={errors.citySector ? 'err-citySector' : undefined}
                      className="mt-2 block w-full rounded-xl border border-[#DFD2D9] bg-[#FAF8F6] px-3.5 py-3 text-sm text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:border-[#D81B60] focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                    />
                    {errors.citySector && (
                      <p id="err-citySector" className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                        {errors.citySector}
                      </p>
                    )}
                  </div>
                </div>

                {/* Précisions supplémentaires */}
                <div>
                  <label
                    htmlFor="field-additionalNotes"
                    className="block text-sm font-semibold text-[#1D1D1F]"
                  >
                    Précisions supplémentaires{' '}
                    <span className="text-xs font-normal text-[#6E6E73]">(optionnel)</span>
                  </label>
                  <textarea
                    id="field-additionalNotes"
                    name="additionalNotes"
                    rows={3}
                    placeholder="Décrivez vos besoins particuliers…"
                    value={formData.additionalNotes}
                    onChange={(e) => handleFieldChange('additionalNotes', e.target.value)}
                    className="mt-2 block w-full rounded-xl border border-[#DFD2D9] bg-[#FAF8F6] px-3.5 py-3 text-sm text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:border-[#D81B60] focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                  />
                </div>
              </fieldset>

              {/* Bouton final : Préparer ma demande */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-prepare-request"
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#D81B60] px-7 py-4 text-base font-semibold text-white shadow-sm hover:bg-[#B8144F] active:bg-[#9B1043] transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2"
                >
                  <span>Préparer ma demande</span>
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>

          {/* Panneau latéral : Carte "Votre demande" en temps réel inspirée de la maquette (5 colonnes) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <aside
              aria-label="Résumé de votre demande de soumission"
              className="rounded-3xl bg-[#FDF2F7] p-6 sm:p-8 border border-[#F2C6D8] shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#F2C6D8]">
                <div>
                  <h3 className="text-xl font-bold text-[#1D1D1F]">
                    Votre demande
                  </h3>
                  <p className="text-xs text-[#6E6E73] mt-0.5">
                    Résumé mis à jour en temps réel
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-bold text-[#D81B60] border border-[#F2C6D8]">
                  {completionPercentage} % complété
                </span>
              </div>

              {/* Barre de progression visuelle */}
              <div className="mt-3 h-1.5 w-full rounded-full bg-white overflow-hidden">
                <div
                  style={{ width: `${completionPercentage}%` }}
                  className="h-full bg-[#D81B60] transition-all duration-300"
                />
              </div>

              {/* Liste structurée avec icônes fucsia comme dans la maquette */}
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#D81B60] border border-[#F2C6D8]"
                    aria-hidden="true"
                  >
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div className="flex-1 flex justify-between gap-3">
                    <dt className="font-semibold text-[#1D1D1F]">Service</dt>
                    <dd className="text-[#515154] text-right font-medium">
                      {formData.serviceType || 'Non sélectionné'}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#D81B60] border border-[#F2C6D8]"
                    aria-hidden="true"
                  >
                    <Home className="h-4 w-4" />
                  </span>
                  <div className="flex-1 flex justify-between gap-3">
                    <dt className="font-semibold text-[#1D1D1F]">Propriété</dt>
                    <dd className="text-[#515154] text-right">
                      {formData.propertyType}
                      {showBedroomsField ? ` • ${formData.bedrooms} ch.` : ''}
                      {showBathroomsField ? ` • ${formData.bathrooms} sdb.` : ''}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#D81B60] border border-[#F2C6D8]"
                    aria-hidden="true"
                  >
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div className="flex-1 flex justify-between gap-3">
                    <dt className="font-semibold text-[#1D1D1F]">Ville ou secteur</dt>
                    <dd className="text-[#515154] text-right">
                      {formData.citySector ? formData.citySector : 'Non précisée'}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#D81B60] border border-[#F2C6D8]"
                    aria-hidden="true"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </span>
                  <div className="flex-1 flex justify-between gap-3">
                    <dt className="font-semibold text-[#1D1D1F]">Superficie</dt>
                    <dd className="text-[#515154] text-right">
                      {formData.areaSqFt && String(formData.areaSqFt).trim() !== ''
                        ? `${formData.areaSqFt} pi²`
                        : 'Non précisée'}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#D81B60] border border-[#F2C6D8]"
                    aria-hidden="true"
                  >
                    <Clock className="h-4 w-4" />
                  </span>
                  <div className="flex-1 flex justify-between gap-3">
                    <dt className="font-semibold text-[#1D1D1F]">Fréquence</dt>
                    <dd className="text-[#515154] text-right">{formData.frequency}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#D81B60] border border-[#F2C6D8]"
                    aria-hidden="true"
                  >
                    <Calendar className="h-4 w-4" />
                  </span>
                  <div className="flex-1 flex justify-between gap-3">
                    <dt className="font-semibold text-[#1D1D1F]">Date souhaitée</dt>
                    <dd className="text-[#515154] text-right">
                      {formData.desiredDate
                        ? formatDateFrCA(formData.desiredDate)
                        : 'Non précisée'}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#D81B60] border border-[#F2C6D8]"
                    aria-hidden="true"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </span>
                  <div className="flex-1 flex justify-between gap-3">
                    <dt className="font-semibold text-[#1D1D1F]">Produits</dt>
                    <dd className="text-[#515154] text-right">{formData.supplies}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#D81B60] border border-[#F2C6D8]"
                    aria-hidden="true"
                  >
                    <FileText className="h-4 w-4" />
                  </span>
                  <div className="flex-1 flex justify-between gap-3">
                    <dt className="font-semibold text-[#1D1D1F]">Détails</dt>
                    <dd className="text-[#515154] text-right max-w-[210px] truncate">
                      {formData.additionalNotes || selectedPriorityTags.length > 0
                        ? [
                            ...selectedPriorityTags,
                            formData.additionalNotes,
                          ]
                            .filter(Boolean)
                            .join(' • ')
                        : 'Aucun détail ajouté'}
                    </dd>
                  </div>
                </div>
              </dl>

              {/* Mention obligatoire sur le tarif et la disponibilité */}
              <div className="mt-6 rounded-2xl bg-white/90 border border-[#F2C6D8] p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-[#D81B60] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs sm:text-sm font-medium text-[#1D1D1F] leading-relaxed">
                  {BUSINESS_CONFIG.quoteDisclaimer}
                </p>
              </div>
            </aside>

            {/* Aperçu du message généré après validation ("Préparer ma demande") */}
            {previewReady && (
              <div
                ref={previewRef}
                tabIndex={-1}
                role="region"
                aria-labelledby="preview-heading"
                className="rounded-3xl bg-white p-6 sm:p-8 border-2 border-[#D81B60] shadow-lg space-y-5 focus-visible:outline-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D81B60]">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      <span>Demande prête</span>
                    </span>
                    <h3
                      id="preview-heading"
                      className="mt-1 text-xl font-bold text-[#1D1D1F]"
                    >
                      Aperçu de votre demande
                    </h3>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#FAF8F6] border border-[#EFE4EA] p-4">
                  <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#1D1D1F] leading-relaxed">
                    {generatedFrenchMessage}
                  </pre>
                </div>

                {/* Explication obligatoire avant l'ouverture de WhatsApp */}
                <p className="text-xs sm:text-sm text-[#515154] bg-[#FDF2F7] border border-[#F2C6D8] rounded-xl px-3.5 py-2.5">
                  {BUSINESS_CONFIG.whatsappConfirmationNote}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    id="btn-send-whatsapp"
                    onClick={handleOpenWhatsApp}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#D81B60] px-5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#B8144F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Envoyer sur WhatsApp</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    id="btn-copy-request"
                    onClick={handleCopyRequest}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF8F6] border border-[#DFD2D9] px-5 py-3.5 text-sm font-semibold text-[#1D1D1F] hover:bg-[#FDF2F7] hover:border-[#E4B8CB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2"
                  >
                    {copyStatus ? (
                      <>
                        <Check className="h-4 w-4 text-[#D81B60]" aria-hidden="true" />
                        <span>Demande copiée</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-[#D81B60]" aria-hidden="true" />
                        <span>Copier la demande</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPOSANT : FOIRE AUX QUESTIONS AVEC PHOTOGRAPHIE ÉDITORIALE LATÉRALE (FaqSection)
// ============================================================================
function FaqSection() {
  const [openId, setOpenId] = useState(BUSINESS_CONFIG.faqs[0].id);

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="questions-frequentes"
      aria-labelledby="faq-heading"
      className="py-16 sm:py-24 bg-white border-t border-[#EFE4EA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Colonne gauche : Accordéon accessible (7 colonnes) */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D81B60]">
              QUESTIONS FRÉQUENTES
            </span>
            <h2
              id="faq-heading"
              className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]"
            >
              Réponses aux questions courantes
            </h2>

            <div className="mt-8 space-y-3">
              {BUSINESS_CONFIG.faqs.map((faq) => {
                const isOpen = openId === faq.id;
                const panelId = `panel-${faq.id}`;
                const buttonId = `btn-${faq.id}`;

                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-colors overflow-hidden ${
                      isOpen
                        ? 'bg-[#FDF2F7]/50 border-[#EAB5CC]'
                        : 'bg-[#FAF8F6] border-[#EFE4EA]'
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm sm:text-base font-semibold text-[#1D1D1F] hover:text-[#D81B60] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D81B60]"
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
                      className={
                        isOpen
                          ? 'px-5 pb-5 pt-1 text-sm text-[#515154] leading-relaxed border-t border-[#EFE4EA]'
                          : 'hidden'
                      }
                    >
                      {faq.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Colonne droite : Image lumineuse de cuisine comme dans la maquette */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[#FDF2F7] p-3 border border-[#F2C6D8] shadow-sm">
              <img
                src={BUSINESS_CONFIG.images.inclusions}
                alt="Intérieur de cuisine blanc et lumineux impeccablement entretenu"
                className="w-full h-72 sm:h-80 object-cover rounded-2xl max-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPOSANT : CONTACT ET PIED DE PAGE (ContactFooter)
// ============================================================================
function ContactFooter({ onNavigateToSection }) {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#FAF8F6] border-t border-[#EFE4EA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="rounded-3xl bg-white border border-[#EFE4EA] p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D81B60]">
              NOUS JOINDRE
            </span>
            <h2
              id="contact-heading"
              className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]"
            >
              Parlons de votre espace
            </h2>
            <p className="mt-2.5 text-base sm:text-lg text-[#515154] leading-relaxed">
              Communiquez avec notre équipe par téléphone, sur WhatsApp ou par courriel pour toute question ou demande de soumission.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Téléphone */}
            <a
              href={BUSINESS_CONFIG.phoneHref}
              className="group flex items-start gap-4 rounded-2xl bg-[#FAF8F6] p-5 sm:p-6 border border-[#EFE4EA] hover:border-[#D81B60] hover:bg-[#FDF2F7]/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
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
                <p className="mt-1 text-lg font-bold text-[#1D1D1F] group-hover:text-[#D81B60] transition-colors">
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
              className="group flex items-start gap-4 rounded-2xl bg-[#FAF8F6] p-5 sm:p-6 border border-[#EFE4EA] hover:border-[#D81B60] hover:bg-[#FDF2F7]/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
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
                <p className="mt-1 text-lg font-bold text-[#1D1D1F] group-hover:text-[#D81B60] transition-colors">
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
              className="group flex items-start gap-4 rounded-2xl bg-[#FAF8F6] p-5 sm:p-6 border border-[#EFE4EA] hover:border-[#D81B60] hover:bg-[#FDF2F7]/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
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
                <p className="mt-1 text-sm sm:text-base font-bold text-[#1D1D1F] truncate group-hover:text-[#D81B60] transition-colors">
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
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D81B60] text-white"
              aria-hidden="true"
            >
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-base font-bold text-[#1D1D1F]">
                {BUSINESS_CONFIG.companyName}
              </p>
              <p className="text-sm font-medium text-[#D81B60]">
                {BUSINESS_CONFIG.tagline}
              </p>
            </div>
          </div>

          <nav
            aria-label="Liens du pied de page"
            className="flex flex-wrap justify-center gap-5 text-sm text-[#515154]"
          >
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

// ============================================================================
// COMPOSANT PRINCIPAL : App
// ============================================================================
export default function App() {
  const todayIso = useMemo(() => getLocalTodayIso(), []);

  const [formData, setFormData] = useState({
    serviceType: BUSINESS_CONFIG.services[0].title,
    propertyType: BUSINESS_CONFIG.services[0].defaultPropertyType,
    areaSqFt: '',
    bedrooms: '2',
    bathrooms: '1',
    frequency: BUSINESS_CONFIG.services[0].defaultFrequency,
    desiredDate: addDaysToIso(todayIso, 2),
    supplies: BUSINESS_CONFIG.suppliesOptions[0],
    fullName: '',
    phone: '',
    email: '',
    citySector: '',
    additionalNotes: '',
  });

  const [selectionBanner, setSelectionBanner] = useState('');

  useEffect(() => {
    document.documentElement.lang = 'fr-CA';
    document.title = `${BUSINESS_CONFIG.companyName} — ${BUSINESS_CONFIG.tagline}`;
  }, []);

  const scrollToSection = (hash) => {
    const id = hash.replace(/^#/, '');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectServiceFromCard = (serviceTitle) => {
    const matched =
      BUSINESS_CONFIG.services.find((s) => s.title === serviceTitle) ||
      BUSINESS_CONFIG.services[0];

    setFormData((prev) => ({
      ...prev,
      serviceType: matched.title,
      propertyType: matched.propertyTypes.includes(prev.propertyType)
        ? prev.propertyType
        : matched.defaultPropertyType,
      frequency:
        matched.title === 'Nettoyage après déménagement' ||
        matched.title === 'Nettoyage après événement'
          ? 'Une seule fois'
          : prev.frequency,
    }));

    setSelectionBanner(
      `Le service « ${matched.title} » a été sélectionné dans le formulaire ci-dessous.`
    );
    scrollToSection('#soumission');
  };

  const handleSelectLaborOnly = () => {
    setFormData((prev) => ({
      ...prev,
      supplies: BUSINESS_CONFIG.laborOnlyOption.formValue,
    }));
    setSelectionBanner(
      'L’option « Main-d’œuvre seulement » (« Je fournis les produits et le matériel ») a été appliquée à votre demande.'
    );
    scrollToSection('#soumission');
  };

  return (
    <div
      lang="fr-CA"
      className="min-h-screen bg-[#FAF8F6] text-[#1D1D1F] font-sans antialiased selection:bg-[#FCE8F1] selection:text-[#D81B60]"
    >
      {/* Lien d'évitement pour l'accessibilité au clavier */}
      <a
        href="#contenu-principal"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('#contenu-principal');
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-[#D81B60] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Aller au contenu principal
      </a>

      <Header onNavigateToSection={scrollToSection} />

      <main id="contenu-principal">
        <Hero
          selectedServiceTitle={formData.serviceType}
          onSelectService={handleSelectServiceFromCard}
          onNavigateToSection={scrollToSection}
        />

        <ServicesSection
          selectedServiceTitle={formData.serviceType}
          onSelectService={handleSelectServiceFromCard}
        />

        <InclusionsSection
          currentSuppliesOption={formData.supplies}
          onSelectLaborOnly={handleSelectLaborOnly}
        />

        <ProcessSection onNavigateToSection={scrollToSection} />

        <QuoteSection
          formData={formData}
          setFormData={setFormData}
          selectionBanner={selectionBanner}
          onClearSelectionBanner={() => setSelectionBanner('')}
        />

        <FaqSection />
      </main>

      <ContactFooter onNavigateToSection={scrollToSection} />
    </div>
  );
}

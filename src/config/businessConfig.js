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
  Clock,
  HeartHandshake,
} from 'lucide-react';

export const BUSINESS_CONFIG = {
  companyName: 'Services de nettoyage',
  tagline: 'Votre espace, notre priorité.',
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
      description: 'Maisons et appartements, pour un espace agréable au quotidien.',
      badge: 'Résidentiel',
      icon: Home,
      defaultPropertyType: 'Appartement ou condo',
      propertyTypes: [
        'Appartement ou condo',
        'Maison unifamiliale',
        'Duplex ou triplex',
        'Autre habitation résidentielle',
      ],
      isResidential: true,
      showBathrooms: true,
      defaultFrequency: 'Toutes les deux semaines',
    },
    {
      id: 'entretien-bureaux',
      title: 'Entretien de bureaux',
      description: 'Des espaces de travail propres et accueillants.',
      badge: 'Bureaux',
      icon: Building2,
      defaultPropertyType: 'Bureau professionnel',
      propertyTypes: [
        'Bureau professionnel',
        'Espace de travail partagé',
        'Cabinet ou clinique',
        'Autre local de bureau',
      ],
      isResidential: false,
      showBathrooms: true,
      defaultFrequency: 'Chaque semaine',
    },
    {
      id: 'entretien-commercial',
      title: 'Entretien commercial',
      description: 'Un entretien adapté aux commerces et aux locaux professionnels.',
      badge: 'Commercial',
      icon: Store,
      defaultPropertyType: 'Commerce ou boutique',
      propertyTypes: [
        'Commerce ou boutique',
        'Locaux professionnels',
        'Studio ou salle d’exposition',
        'Autre espace commercial',
      ],
      isResidential: false,
      showBathrooms: true,
      defaultFrequency: 'Chaque semaine',
    },
    {
      id: 'nettoyage-demenagement',
      title: 'Nettoyage après déménagement',
      description: 'Un nettoyage en profondeur avant votre arrivée ou après votre départ.',
      badge: 'Grand ménage',
      icon: Truck,
      defaultPropertyType: 'Appartement ou condo',
      propertyTypes: [
        'Appartement ou condo',
        'Maison unifamiliale',
        'Duplex ou triplex',
        'Bureau ou local commercial',
      ],
      isResidential: true,
      showBathrooms: true,
      defaultFrequency: 'Une seule fois',
    },
    {
      id: 'nettoyage-evenement',
      title: 'Nettoyage après événement',
      description: 'Retrouvez un espace propre après vos réceptions et événements.',
      badge: 'Événementiel',
      icon: Sparkles,
      defaultPropertyType: 'Résidence privée',
      propertyTypes: [
        'Résidence privée',
        'Salle de réception ou espace événementiel',
        'Bureau ou local commercial',
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
      description: 'Entretien complet des aires de vie, des pièces communes et des surfaces accessibles.',
      icon: Sparkles,
    },
    {
      id: 'cuisine-salle-bain',
      title: 'Cuisine et salle de bain',
      description: 'Lavage minutieux des comptoirs, éviers, lavabos, robinetteries et installations sanitaires.',
      icon: Droplets,
    },
    {
      id: 'vitres-miroirs',
      title: 'Vitres et miroirs',
      description: 'Nettoyage sans traces des miroirs et des surfaces vitrées intérieures accessibles.',
      icon: Maximize2,
    },
    {
      id: 'planchers',
      title: 'Nettoyage des planchers',
      description: 'Aspiration et lavage soignés adaptés à tous les types de planchers.',
      icon: Layers,
    },
    {
      id: 'epoussetage-desinfection',
      title: 'Époussetage et désinfection',
      description: 'Retrait de la poussière sur le mobilier et désinfection des surfaces fréquemment touchées.',
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
      stepNumber: '01',
      title: 'Décrivez vos besoins.',
      description:
        'Indiquez le service souhaité, le type d’espace, la fréquence et vos préférences dans notre formulaire interactif.',
    },
    {
      stepNumber: '02',
      title: 'Recevez une soumission personnalisée.',
      description:
        'Préparez votre demande en un clic et transmettez-la à notre équipe pour obtenir une proposition adaptée.',
    },
    {
      stepNumber: '03',
      title: 'Convenez d’une date avec notre équipe.',
      description:
        'Nous validons la disponibilité selon votre date souhaitée et confirmons avec vous les détails de la visite.',
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

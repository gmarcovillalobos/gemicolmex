import React, { useState, useMemo, useRef } from 'react';
import { CheckCircle2, X, AlertCircle, FileText, Info, MessageCircle, ExternalLink, Check, Copy } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig.js';
import { getLocalTodayIso, addDaysToIso, formatDateFrCA } from '../utils/dateUtils.js';

export default function QuoteSection({
  formData,
  setFormData,
  selectionBanner,
  onClearSelectionBanner,
}) {
  const [errors, setErrors] = useState({});
  const [previewReady, setPreviewReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
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

  // Mise à jour d'un champ du formulaire
  const handleFieldChange = (field, value) => {
    setPreviewReady(false);
    setCopyStatus(false);

    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Si l'utilisateur change de service, adapter le type de propriété et la fréquence par défaut
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

    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors((prevErrors) => {
        const next = { ...prevErrors };
        delete next[field];
        return next;
      });
    }
  };

  // Validation complète en français canadiense (fr-CA)
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
  }, [formData, showBedroomsField, showBathroomsField]);

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
      className="py-16 sm:py-24 bg-[#FAF8F6] border-t border-[#EFE4EA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D81B60]">
            Demande de soumission
          </span>
          <h2
            id="quote-heading"
            className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]"
          >
            Configurez votre demande sur mesure
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#515154] leading-relaxed">
            Remplissez les informations ci-dessous pour préparer votre demande personnalisée. Aucune donnée personnelle n’est stockée sur votre appareil.
          </p>
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
          {/* Formulaire principal (7 colonnes sur grand écran) */}
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
                <legend className="text-lg font-semibold text-[#1D1D1F] pb-2 border-b border-[#F5ECEF] w-full">
                  1. Détails de l’entretien
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Type de service */}
                  <div>
                    <label
                      htmlFor="field-serviceType"
                      className="block text-sm font-medium text-[#1D1D1F]"
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
                      className="block text-sm font-medium text-[#1D1D1F]"
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

                {/* Superficie, chambres et salles de bain */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Superficie approximative (pi²) */}
                  <div>
                    <label
                      htmlFor="field-areaSqFt"
                      className="block text-sm font-medium text-[#1D1D1F]"
                    >
                      Superficie approximative (pi²)
                      <span className="block text-xs font-normal text-[#6E6E73]">Optionnel</span>
                    </label>
                    <input
                      id="field-areaSqFt"
                      name="areaSqFt"
                      type="number"
                      min="100"
                      step="50"
                      inputMode="numeric"
                      placeholder="Ex. : 1100"
                      value={formData.areaSqFt}
                      onChange={(e) => handleFieldChange('areaSqFt', e.target.value)}
                      aria-invalid={Boolean(errors.areaSqFt)}
                      aria-describedby={errors.areaSqFt ? 'err-areaSqFt' : undefined}
                      className="mt-2 block w-full rounded-xl border border-[#DFD2D9] bg-[#FAF8F6] px-3.5 py-3 text-sm text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:border-[#D81B60] focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60]"
                    />
                    {errors.areaSqFt && (
                      <p id="err-areaSqFt" className="mt-1.5 text-xs font-medium text-[#B91C1C]">
                        {errors.areaSqFt}
                      </p>
                    )}
                  </div>

                  {/* Nombre de chambres (services résidentiels) */}
                  {showBedroomsField && (
                    <div>
                      <label
                        htmlFor="field-bedrooms"
                        className="block text-sm font-medium text-[#1D1D1F]"
                      >
                        Nombre de chambres <span className="text-[#D81B60]" aria-hidden="true">*</span>
                        <span className="block text-xs font-normal text-[#6E6E73]">
                          Espace résidentiel
                        </span>
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

                  {/* Nombre de salles de bain */}
                  {showBathroomsField && (
                    <div>
                      <label
                        htmlFor="field-bathrooms"
                        className="block text-sm font-medium text-[#1D1D1F]"
                      >
                        Nombre de salles de bain{' '}
                        <span className="text-[#D81B60]" aria-hidden="true">*</span>
                        <span className="block text-xs font-normal text-[#6E6E73]">
                          Ou salles d’eau
                        </span>
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
                  <span className="block text-sm font-medium text-[#1D1D1F]">
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
                          className={`rounded-xl px-3.5 py-3 text-xs sm:text-sm font-medium border text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] ${
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
                      className="block text-sm font-medium text-[#1D1D1F]"
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
                      className="block text-sm font-medium text-[#1D1D1F]"
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
              </fieldset>

              {/* Bloc 2 : Coordonnées */}
              <fieldset className="space-y-6 pt-2">
                <legend className="text-lg font-semibold text-[#1D1D1F] pb-2 border-b border-[#F5ECEF] w-full">
                  2. Vos coordonnées
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nom complet */}
                  <div>
                    <label
                      htmlFor="field-fullName"
                      className="block text-sm font-medium text-[#1D1D1F]"
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
                      className="block text-sm font-medium text-[#1D1D1F]"
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
                      className="block text-sm font-medium text-[#1D1D1F]"
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
                      className="block text-sm font-medium text-[#1D1D1F]"
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
                    className="block text-sm font-medium text-[#1D1D1F]"
                  >
                    Précisions supplémentaires{' '}
                    <span className="text-xs font-normal text-[#6E6E73]">(optionnel)</span>
                  </label>
                  <textarea
                    id="field-additionalNotes"
                    name="additionalNotes"
                    rows={3}
                    placeholder="Particularités de l’espace, priorités d’entretien, moment de la journée privilégié…"
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
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-[#D81B60] px-7 py-4 text-base font-semibold text-white shadow-sm hover:bg-[#B8144F] active:bg-[#9B1043] transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B60] focus-visible:ring-offset-2"
                >
                  <FileText className="h-5 w-5" aria-hidden="true" />
                  <span>Préparer ma demande</span>
                </button>
              </div>
            </form>
          </div>

          {/* Panneau latéral : Résumé en direct + Aperçu WhatsApp (5 colonnes) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            {/* Résumé en temps réel */}
            <aside
              aria-label="Résumé de votre demande de soumission"
              className="rounded-3xl bg-white p-6 sm:p-8 border border-[#EFE4EA] shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#F5ECEF]">
                <h3 className="text-lg font-semibold text-[#1D1D1F]">
                  Résumé de votre sélection
                </h3>
                <span className="inline-flex items-center rounded-full bg-[#FDF2F7] px-3 py-1 text-xs font-semibold text-[#D81B60]">
                  En direct
                </span>
              </div>

              <dl className="mt-5 space-y-3.5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6E6E73]">Type de service</dt>
                  <dd className="font-semibold text-[#1D1D1F] text-right">
                    {formData.serviceType}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-[#6E6E73]">Type de propriété</dt>
                  <dd className="font-medium text-[#1D1D1F] text-right">
                    {formData.propertyType}
                  </dd>
                </div>

                {formData.areaSqFt && String(formData.areaSqFt).trim() !== '' && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6E6E73]">Superficie approximative</dt>
                    <dd className="font-medium text-[#1D1D1F] text-right">
                      {formData.areaSqFt} pi²
                    </dd>
                  </div>
                )}

                {showBedroomsField && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6E6E73]">Nombre de chambres</dt>
                    <dd className="font-medium text-[#1D1D1F] text-right">
                      {formData.bedrooms}
                    </dd>
                  </div>
                )}

                {showBathroomsField && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6E6E73]">Nombre de salles de bain</dt>
                    <dd className="font-medium text-[#1D1D1F] text-right">
                      {formData.bathrooms}
                    </dd>
                  </div>
                )}

                <div className="flex justify-between gap-4">
                  <dt className="text-[#6E6E73]">Fréquence</dt>
                  <dd className="font-medium text-[#1D1D1F] text-right">
                    {formData.frequency}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-[#6E6E73]">Date souhaitée</dt>
                  <dd className="font-medium text-[#1D1D1F] text-right">
                    {formData.desiredDate
                      ? formatDateFrCA(formData.desiredDate)
                      : 'À sélectionner'}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-[#6E6E73]">Produits et matériel</dt>
                  <dd className="font-medium text-[#1D1D1F] text-right">
                    {formData.supplies}
                  </dd>
                </div>

                {(formData.fullName || formData.citySector) && (
                  <div className="pt-3 border-t border-[#F5ECEF] space-y-2.5">
                    {formData.fullName && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#6E6E73]">Nom complet</dt>
                        <dd className="font-medium text-[#1D1D1F] text-right">
                          {formData.fullName}
                        </dd>
                      </div>
                    )}
                    {formData.citySector && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#6E6E73]">Ville ou secteur</dt>
                        <dd className="font-medium text-[#1D1D1F] text-right">
                          {formData.citySector}
                        </dd>
                      </div>
                    )}
                  </div>
                )}
              </dl>

              {/* Mention obligatoire sur le tarif et la disponibilité */}
              <div className="mt-6 rounded-2xl bg-[#FDF2F7] border border-[#F2C6D8] p-4 flex items-start gap-3">
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
                className="rounded-3xl bg-white p-6 sm:p-8 border-2 border-[#D81B60] shadow-md space-y-5 focus-visible:outline-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D81B60]">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      <span>Demande prête</span>
                    </span>
                    <h3
                      id="preview-heading"
                      className="mt-1 text-xl font-semibold text-[#1D1D1F]"
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

# Services de nettoyage — Aplicación Web (Maqueta Funcional)

Aplicación web moderna, accesible y responsive diseñada para presentar los servicios de limpieza residencial, comercial y de oficinas de **Services de nettoyage** en Québec (`lang="fr-CA"`), permitiendo configurar una solicitud de cotización interactiva y enviarla por WhatsApp sin requerir backend.

## Stack Tecnológico

- **React 18** + **Vite**
- **Tailwind CSS** (estética minimalista en blanco cálido `#FAF8F6`, rosa pálido `#FDF2F7`, acento fucsia `#D81B60` y texto carbón `#1D1D1F`)
- **Lucide React** para iconografía limpia y consistente
- **Estado local en React** sin persistencia de datos personales en `localStorage` ni servicios externos de backend

## Requisitos Previos

- **Node.js** 18.x o superior
- **npm** 9.x o superior

## Instrucciones para Ejecutar y Compilar

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`.

3. **Compilar para producción (build):**
   ```bash
   npm run build
   ```

4. **Previsualizar la versión compilada:**
   ```bash
   npm run preview
   ```

## Estructura del Proyecto

- `index.html`: Documento principal configurado con `lang="fr-CA"`.
- `src/config/businessConfig.js`: Archivo centralizado con el nombre comercial provisional (`Services de nettoyage`), teléfono (`514-516-6773`), enlace de WhatsApp (`https://wa.me/15145166773`), correo (`solucionesmdsas@gmail.com`), servicios, prestaciones, pasos del proceso y preguntas frecuentes.
- `src/components/Header.jsx`: Encabezado fijo con navegación suave, menú móvil accesible y botón de acción rápida.
- `src/components/Hero.jsx`: Presentación principal con fotografía editorial e indicadores de valor respaldados por el flyer.
- `src/components/ServicesSection.jsx`: Tarjetas de los 5 servicios con selección directa hacia el formulario de cotización.
- `src/components/InclusionsSection.jsx`: Detalle de prestaciones incluidas y tarjeta destacada para la opción « Main-d’œuvre seulement ».
- `src/components/ProcessSection.jsx`: Explicación clara del proceso en 3 pasos sin simular una reserva confirmada.
- `src/components/QuoteSection.jsx`: Formulario interactivo adaptable según el servicio elegido, validación en francés canadiense, resumen lateral en tiempo real, vista previa del mensaje, copia al portapapeles y apertura controlada de WhatsApp con `encodeURIComponent`.
- `src/components/FaqSection.jsx`: Acordeón accesible por teclado con las 4 preguntas clave.
- `src/components/ContactFooter.jsx`: Sección de contacto directo (`tel:`, `mailto:`, WhatsApp) y pie de página con el lema « Votre espace, notre priorité. ».

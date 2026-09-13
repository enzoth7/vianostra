# Via Nostra — Guía de Identidad y Reglas para Agentes (AGENTS.md)

Este documento define la identidad visual, paleta cromática extraída del logotipo oficial, tipografía y lineamientos de diseño para el desarrollo y mantenimiento del proyecto **Via Nostra**. Todos los agentes que intervengan en este repositorio deben respetar estrictamente estas directrices.

---

## 1. Identidad y Propósito

- **Proyecto**: Via Nostra (`vianostra`).
- **Enfoque**: Plataforma sobria, editorial y rigurosa para uruguayos que buscan reconstruir sus raíces genealógicas e historia familiar en Italia (sin promesas vacías ni lógica comercial de agencia de pasaportes).
- **Tono**: Confiable, documental, institucional, sin tecnicismos innecesarios ni sensacionalismo.
- **Owner**: `Agente Fullstack` (con soporte de `Agente Content`).

---

## 2. Paleta Oficial de Colores (Extraída del Logotipo Oficial)

Los códigos hexadecimales fueron muestreados y extraídos directamente de los píxeles del activo maestro del sello (`public/LogoTransp.png`):

| Rol Visual | Nombre | HEX | RGB | Uso y Aplicación |
|---|---|---|---|---|
| **Color Primario Dominante (Único Azul)** | **Azul Consular** | `#07214e` | `(7, 33, 78)` | ÚNICO azul oficial permitido en toda la plataforma: titulares de alto impacto, marcos institucionales, fondos, botones primarios (CTA), bordes de énfasis, encabezados y referencias locales. |
| **Acento Primario** | **Verde Italiano** | `#076525` | `(7, 101, 37)` | Verde de la bandera italiana. Utilizado en badges de confirmación, pasos completados, micro-acentos y botones de acción secundaria. |
| **Acento Secundario** | **Rojo Italiano** | `#D20911` | `(210, 9, 17)` | Rojo de la bandera italiana. Reservado exclusivamente para enlaces a YouTube, alertas de estado crítico o detalles discretos. |
| **Acento Solar** | **Oro Sol de Mayo** | `#FEBF02` | `(254, 191, 2)` | Detalles mínimos alusivos al Sol de Mayo y sellos diplomáticos históricos. |
| **Fondo Base (Papel)** | **Marfil Consular** | `#FBFBFA` | `(251, 251, 250)` | Fondo general de la web. Otorga textura de documento oficial antiguo y evita el blanco digital estridente. |
| **Superficie de Tarjetas** | **Blanco Puro** | `#FFFFFF` | `(255, 255, 255)` | Fondo interior de tarjetas, formularios y modales interactivos para máximo contraste. |
| **Texto Principal** | **Grafito Oscuro** | `#1A1A1A` | `(26, 26, 26)` | Cuerpo de texto y párrafos de lectura continuada. |
| **Texto Secundario** | **Gris Atenuado** | `#525252` | `(82, 82, 82)` | Descripciones, subtítulos de apoyo y notas al pie. |
| **Líneas y Divisores** | **Borde Editorial** | `#E5E5E5` | `(229, 229, 229)` | Separadores sutiles de 1px entre secciones y bloques de contenido. |

### Reglas de Uso del Azul y Verde:
1. **Azul Consular (`#07214e`)**: Es la jerarquía máxima y el **ÚNICO azul oficial** permitido en toda la plataforma. Se utiliza para encabezados, fondos, botones, bordes y acentos. NUNCA usar otros tonos de azul, azul eléctrico ni gradientes brillantes.
2. **Verde Italiano (`#076525`)**: Aporta el arraigo de la península. Se utiliza con mesura para guiar al usuario en elementos aprobados, documentos verificados, badges de éxito y bordes activos de foco interactivo. Prohibido usar verde neón, verde flúor o verde "startup".

---

## 3. Tipografía Oficial Inalterable

Queda prohibido introducir fuentes genéricas de inteligencia artificial (*Plus Jakarta Sans*, *Cinzel*, *Poppins* o *Montserrat*).

1. **Titulares y Nombres Propios (Serif Clásico)**:
   - **Fuente**: `EB Garamond` (`serif`)
   - **Pesos**: `400` (Regular) y `500` (Medium).
   - **Aplicación**: H1, H2, H3, citas y títulos de documentos o comunas.
   - **Tracking**: `tracking-normal` o `tracking-tight` (-0.015em).

2. **Lectura Funcional y Formularios (Sans-serif)**:
   - **Fuente**: `Inter` (`sans-serif`)
   - **Pesos**: `300` (Light) para descripciones editoriales, `400` (Regular) para lectura continua y `500` (Medium) para labels.
   - **Aplicación**: Párrafos, inputs, botones, ayudas contextuales y tablas de datos.

3. **Metadatos y Documentación (Monospace)**:
   - **Fuente**: `ui-monospace`, `SFMono-Regular`, `Menlo`, `font-mono`
   - **Pesos**: `400` o `500`.
   - **Aplicación**: Códigos de expediente, fechas archivísticas, números de paso (`01`, `02`) y nombres de actas oficiales.

---

## 4. Reglas Estrictas de Contenedores y UI (Anti-IA)

1. **Cero Estética IA**:
   - **PROHIBIDO** el uso de píldoras de badges flotantes ("pills" redondeadas con bordes luminosos).
   - **PROHIBIDO** incluir resplandores, halos difuminados (`blur-2xl`, `blur-3xl`), o degradados de fondo de color.
   - **PROHIBIDO** el uso de puntos parpadeantes (`animate-pulse`) decorativos.
   - **PROHIBIDO** utilizar fondos negros o interfaces tipo "cyberpunk/SaaS tech". La estética es de archivo consular y biblioteca de estado.

2. **Geometría y Bordes**:
   - Contenedores limpios, estructurados y rectos (`rounded-none` o máximo `rounded-sm` de 2px).
   - Separaciones con líneas finas de 1px (`border-neutral-200` o `border-[#07214e]/15`).
   - Priorizar el **espacio en blanco (whitespace)** y el aire tipográfico sobre cajas anidadas.

3. **Botones y Acciones**:
   - **Primario**: Fondo `#07214e`, texto `#FFFFFF`, esquinas rectas (`rounded-none`), padding generoso (`px-8 py-3.5`).
   - **Secundario / Outline**: Fondo transparente, borde de 1px en `#07214e` o `#E5E5E5`, texto `#1A1A1A`.
   - **Acento Verde**: Fondo `#076525`, texto `#FFFFFF` para acciones de confirmación o copiado de cartas.

---

## 5. Endpoints y Arquitectura de Navegación

El proyecto utiliza un sistema de deep linking y endpoints sincronizados con la URL del navegador:

- **`#/`**: Inicio (Hero + Decreto Tajani + Ruta del Avo).
- **`#/decreto-tajani`**: Desplazamiento suave directo al análisis del Decreto Tajani.
- **`#/ruta-avo`**: Desplazamiento suave directo a los 4 pasos metodológicos de búsqueda.
- **`#/diagnostico`**: Vista interactiva dedicada del evaluador para uruguayos.
- **`#/carta-comuna`**: Vista interactiva dedicada del generador de carta formal a la comuna.
- **`#/videos`**: Vista dedicada con el catálogo de masterclasses y clips prácticos.

> **Regla de oro**: La página de inicio permanece limpia y minimalista. Las herramientas complejas se visualizan en sus propios endpoints dedicados accesibles desde el Header.

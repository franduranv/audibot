# 🤖 AudiBot

> Agente de compliance fiscal preventivo para PyMEs mexicanas

**AudiBot detecta riesgos de auditoría SAT antes de que lleguen.**

---

## ¿Qué es AudiBot?

AudiBot analiza los CFDI (facturas XML) de tu empresa y detecta patrones que el SAT utiliza para seleccionar contribuyentes para auditoría. En lugar de esperar a que llegue una carta invitación, AudiBot te avisa con anticipación y te dice exactamente qué corregir.

**Problema:** El 78% de las PyMEs mexicanas auditadas no sabían que tenían un riesgo fiscal hasta que el SAT tocó su puerta.

**Solución:** AudiBot analiza tus facturas, cruza contra criterios de riesgo del SAT y te da un reporte de semáforo con acciones concretas.

---

## MVP — ¿Qué hace la versión actual?

1. **Sube tus XMLs** — Carga de 1 a 50 CFDIs (versión 3.3 y 4.0)
2. **Análisis automático** — AudiBot detecta:
   - Inconsistencias en RFC y razón social
   - Montos fuera de rango sectorial
   - Conceptos fiscales riesgosos (simulación de operaciones)
   - Pagos sin respaldo documental
3. **Reporte de riesgo** — Semáforo 🔴🟡🟢 con:
   - Nivel de riesgo general
   - Top 3 alertas con fundamento legal (CFF, LISR, LIVA)
   - Recomendación accionable por cada alerta

---

## Tech Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS |
| UI Components | shadcn/ui |
| Backend | Next.js API Routes |
| Base de datos | Supabase (Postgres + pgvector) |
| AI/LLM | Claude 3.5 Sonnet (Anthropic) |
| Embeddings | OpenAI text-embedding-3-small |
| Deploy | Vercel |
| Storage | Supabase Storage |

### ¿Por qué Claude?
Claude 3.5 Sonnet tiene mejor comprensión del lenguaje legal-fiscal mexicano que otros LLMs. Menos alucinaciones en normativa, mejor razonamiento sobre texto del CFF y criterios del SAT.

---

## Estructura del Proyecto

```
audibot/
├── app/
│   ├── page.tsx                    # Landing + upload
│   ├── analisis/[id]/page.tsx      # Resultado del análisis
│   └── api/
│       ├── analizar/route.ts       # Análisis con Claude
│       └── upload/route.ts         # Procesamiento de XMLs
├── components/
│   ├── UploadZone.tsx
│   ├── ReporteRiesgo.tsx
│   └── AlertaCard.tsx
├── lib/
│   ├── claude.ts                   # Wrapper Anthropic SDK
│   ├── cfdi-parser.ts              # Parser XMLs SAT
│   └── risk-analyzer.ts            # Lógica de detección de riesgo
├── prompts/
│   └── audit-analyzer.ts           # System prompt de AudiBot
└── docs/
    ├── normativa-sat.md
    └── reglas-riesgo.md
```

---

## Configuración

```bash
# Clonar repo
git clone https://github.com/franduranv/audibot.git
cd audibot

# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env.local
# Editar .env.local con tus keys

# Desarrollo local
npm run dev
```

### Variables de entorno requeridas

```env
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## Roadmap

### v0.1 — MVP (48h)
- [x] Parser de CFDIs XML
- [x] Análisis de riesgo con Claude
- [x] Reporte con semáforo
- [x] Deploy en Vercel

### v0.2 — Beta
- [ ] Conexión directa al SAT (descarga masiva XML con FIEL)
- [ ] Análisis histórico (últimos 12 meses)
- [ ] Alertas proactivas vía WhatsApp Business
- [ ] Multi-empresa (un contador, varios clientes)

### v1.0 — Producción
- [ ] Integración con contabilidades (CONTPAQi, Aspel)
- [ ] Reporte para presentar ante SAT
- [ ] Dashboard mensual de riesgo
- [ ] API para integradores contables

---

## Integraciones Planeadas

| Integración | Estado | Notas |
|-------------|--------|-------|
| SAT verificaCFDI | ✅ Disponible | API pública |
| SAT descarga masiva XML | ⏳ Requiere FIEL del contribuyente | Bloqueador para prod |
| WhatsApp Business | 🔲 Planeado v0.2 | Requiere aprobación Meta |
| CONTPAQi | 🔲 Planeado v1.0 | API disponible |

---

## Disclaimer Legal

AudiBot es una herramienta de análisis preventivo. No reemplaza la asesoría de un contador público certificado. Los resultados son orientativos y deben ser validados por un profesional fiscal antes de tomar decisiones.

---

## Parte de ZXY Ventures

AudiBot es un proyecto de **[ZXY Ventures](https://zxy.vc)** — venture studio construyendo el futuro de las PyMEs mexicanas con AI.

**Contacto:** fran@zxy.vc

---

*Built with ❤️ in León, Guanajuato, México 🇲🇽*

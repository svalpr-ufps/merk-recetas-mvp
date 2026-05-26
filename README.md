# 🥘 MercaRecetas MVP

MVP de la startup MercaRecetas — Cúcuta, Colombia.

> "Tu almuerzo de hoy. Ingredientes exactos + receta. Sin pensar."

---

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (styling)
- **Google Fonts** — Playfair Display + DM Sans

---

## Correr el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:3000
```

---

## Flujo del MVP

```
/ (Catálogo del día)
  ↓ Elige almuerzo o "Elegir por mí"
/checkout?id=...
  ↓ Nombre + Dirección + Método de pago → Confirmar
/confirmacion
  ↓ Resumen del kit + Receta paso a paso + Link WhatsApp
```

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Catálogo del día — máx. 3 almuerzos + botón "Elegir por mí" |
| `/checkout` | Formulario de entrega y pago |
| `/confirmacion` | Confirmación + resumen del kit + receta |

## Para personalizar el menú del día

Edita `/lib/data.js` → array `ALMUERZOS_HOY`.
Cada almuerzo tiene: `id`, `nombre`, `descripcion`, `precio`, `tiempo`, `ingredientes`, `receta`, `badge`, `esOpcionDelDia`.

Solo puede haber **máximo 3 almuerzos** y **1 `esOpcionDelDia: true`**.

## Para conectar WhatsApp Business real

En `/app/checkout/page.js` y `/app/confirmacion/page.js`, reemplaza:
```
https://wa.me/573001234567
```
con el número real de WhatsApp Business del negocio.

## Para conectar pagos reales (Wompi)

Reemplaza el `setTimeout` en `checkout/page.js` con la integración del widget de Wompi:
```html
<script src="https://checkout.wompi.co/widget.js"></script>
```
Ver docs: https://docs.wompi.co/

---

## Métricas a medir desde el día 1

1. ¿Alguien pagó? (conversión)
2. ¿Volvió la semana siguiente? (retención 7 días)
3. Tiempo desde landing hasta pago (meta: < 3 min)
4. NPS tras el primer almuerzo

---

*Desarrollado como MVP para validación de hipótesis. Universidad Francisco de Paula Santander — Cúcuta 2026.*

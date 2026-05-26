// Catálogo del día — máximo 3 almuerzos
export const ALMUERZOS_HOY = [
  {
    id: "bandeja-paisa",
    nombre: "Bandeja Paisa Ligera",
    descripcion: "Ingredientes frescos, receta paso a paso incluida",
    precio: 22000,
    tiempo: 25,
    porciones: 1,
    badge: "⭐ Opción del día",
    esOpcionDelDia: true,
    emoji: "🍳",
    color: "from-amber-500 to-orange-600",
    ingredientes: [
      "Fríjoles rojos (150g, pre-cocidos)",
      "Arroz blanco (80g)",
      "Chicharrón de cerdo (60g)",
      "Chorizo (1 unidad)",
      "Huevo (1 unidad)",
      "Aguacate (½ unidad)",
      "Hogao casero (30g)",
    ],
    receta: [
      "Calienta el hogao en sartén a fuego medio (3 min)",
      "Agrega los fríjoles y revuelve bien (5 min)",
      "Cocina el arroz en la proporción indicada (12 min)",
      "Fríe el chorizo y chicharrón en otra sartén (5 min)",
      "Fríe el huevo al gusto (3 min)",
      "Sirve todo junto con el aguacate en rodajas",
    ],
  },
  {
    id: "pollo-limon",
    nombre: "Pollo al Limón con Arroz",
    descripcion: "Liviano, rápido y lleno de sabor",
    precio: 19500,
    tiempo: 20,
    porciones: 1,
    badge: null,
    esOpcionDelDia: false,
    emoji: "🍋",
    color: "from-yellow-400 to-lime-500",
    ingredientes: [
      "Pechuga de pollo (180g, fileteada)",
      "Arroz blanco (80g)",
      "Limón (1 unidad)",
      "Ajo (2 dientes)",
      "Aceite de oliva (1 cda)",
      "Orégano y sal (ya medidos)",
    ],
    receta: [
      "Marina el pollo con limón, ajo y orégano (5 min)",
      "Pon el arroz a cocinar (12 min)",
      "Sella el pollo en sartén caliente con aceite (4 min por lado)",
      "Baja el fuego y tapa por 5 minutos más",
      "Exprime el resto del limón al final",
      "Sirve sobre el arroz",
    ],
  },
  {
    id: "sopa-lentejas",
    nombre: "Sopa de Lentejas Colombiana",
    descripcion: "Reconfortante y lista más rápido de lo que crees",
    precio: 16000,
    tiempo: 28,
    porciones: 1,
    badge: "💚 Más saludable",
    esOpcionDelDia: false,
    emoji: "🥘",
    color: "from-green-500 to-teal-600",
    ingredientes: [
      "Lentejas verdes (100g, remojadas)",
      "Tomate (1 unidad)",
      "Cebolla cabezona (½)",
      "Zanahoria (1 unidad)",
      "Cilantro (1 atado pequeño)",
      "Caldo de pollo (1 cubito)",
      "Sal y comino (ya medidos)",
    ],
    receta: [
      "Sofríe cebolla y tomate picado en olla (4 min)",
      "Agrega las lentejas y la zanahoria en cubos",
      "Vierte 2 tazas de agua + el cubito de caldo",
      "Hierve a fuego alto y luego baja a medio (18 min)",
      "Ajusta sal y comino al gusto",
      "Sirve con cilantro fresco picado",
    ],
  },
];

export function formatCOP(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(valor);
}

export function generarNumeroOrden() {
  return "MR-" + Math.random().toString(36).substring(2, 7).toUpperCase();
}

export function generarMensajeWhatsApp({ nombre, almuerzo, direccion, orden }) {
  const msg = `✅ *¡Pedido confirmado, ${nombre}!*\n\n🍽️ *${almuerzo.nombre}*\n⏱️ Lista en ${almuerzo.tiempo} min\n\n📦 Kit incluye:\n${almuerzo.ingredientes.map((i) => `• ${i}`).join("\n")}\n\n📍 Entrega en: ${direccion}\n🔖 Orden: ${orden}\n\n_Te avisamos cuando el kit salga a tu dirección. ¡A cocinar!_ 🎉`;
  return encodeURIComponent(msg);
}

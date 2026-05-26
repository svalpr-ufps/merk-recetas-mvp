import "./globals.css";

export const metadata = {
  title: "MercaRecetas — Tu almuerzo de hoy, sin pensar",
  description:
    "Ingredientes exactos + receta paso a paso para preparar tu almuerzo casero en menos de 30 minutos. Solo en Cúcuta.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#FFF8F0]">{children}</body>
    </html>
  );
}

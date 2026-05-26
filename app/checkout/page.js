"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import { ALMUERZOS_HOY, formatCOP, generarNumeroOrden, generarMensajeWhatsApp } from "../../lib/data";

function CheckoutContent() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const almuerzo = ALMUERZOS_HOY.find((a) => a.id === id) || ALMUERZOS_HOY[0];

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [pago, setPago] = useState("nequi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const DOMICILIO = 3500;
  const total = almuerzo.precio + DOMICILIO;

  function validar() {
    if (!nombre.trim()) return "Por favor ingresa tu nombre";
    if (!telefono.trim() || telefono.length < 10) return "Ingresa un teléfono válido";
    if (!direccion.trim()) return "Ingresa tu dirección de entrega";
    return null;
  }

  function confirmar() {
    const err = validar();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);

    const orden = generarNumeroOrden();
    // Simulate short processing delay
    setTimeout(() => {
      const msg = generarMensajeWhatsApp({ nombre, almuerzo, direccion, orden });
      // Store order data in sessionStorage for confirmation page
      sessionStorage.setItem(
        "orden",
        JSON.stringify({ nombre, almuerzo, direccion, pago, orden, total })
      );
      // Open WhatsApp in new tab
      window.open(`https://wa.me/573001234567?text=${msg}`, "_blank");
      router.push("/confirmacion");
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Header />

      <main className="max-w-md mx-auto px-4 pb-12 pt-6">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-gray-400 font-body mb-5 hover:text-gray-600 transition-colors"
        >
          ← Cambiar almuerzo
        </button>

        {/* Order summary */}
        <div className={`rounded-2xl overflow-hidden mb-6 shadow-md`}>
          <div className={`bg-gradient-to-r ${almuerzo.color} p-4 flex items-center gap-3`}>
            <span className="text-4xl">{almuerzo.emoji}</span>
            <div>
              <p className="text-white/70 text-xs font-body font-medium uppercase tracking-wide">
                Tu almuerzo de hoy
              </p>
              <h2 className="text-white font-display font-bold text-xl leading-tight">
                {almuerzo.nombre}
              </h2>
              <p className="text-white/80 text-xs font-body mt-0.5">
                ⏱️ {almuerzo.tiempo} min de preparación
              </p>
            </div>
          </div>
          <div className="bg-white px-4 py-3 flex justify-between items-center text-sm font-body">
            <span className="text-gray-500">Kit almuerzo × 1</span>
            <span className="font-semibold text-[#6B3F1A]">{formatCOP(almuerzo.precio)}</span>
          </div>
          <div className="bg-white px-4 py-2 flex justify-between items-center text-sm font-body border-t border-gray-100">
            <span className="text-gray-500">Domicilio</span>
            <span className="font-semibold text-[#6B3F1A]">{formatCOP(DOMICILIO)}</span>
          </div>
          <div className="bg-orange-50 px-4 py-3 flex justify-between items-center border-t border-orange-100">
            <span className="font-body font-bold text-[#6B3F1A]">Total</span>
            <span className="font-display font-bold text-[#FF6B2B] text-xl">{formatCOP(total)}</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-5 shadow-md space-y-4">
          <h3 className="font-display font-bold text-[#6B3F1A] text-lg">
            ¿Dónde entregamos?
          </h3>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-sm text-red-600 font-body">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="text-xs font-body font-semibold text-gray-500 uppercase tracking-wide block mb-1">
              Tu nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Rosa Luna"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#FF6B2B] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-body font-semibold text-gray-500 uppercase tracking-wide block mb-1">
              Teléfono (WhatsApp)
            </label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="3001234567"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#FF6B2B] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-body font-semibold text-gray-500 uppercase tracking-wide block mb-1">
              Dirección de entrega — Cúcuta
            </label>
            <textarea
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Ej: Av. 4E #12-34, Barrio La Playa"
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#FF6B2B] transition-colors resize-none"
            />
          </div>

          {/* Payment method */}
          <div>
            <label className="text-xs font-body font-semibold text-gray-500 uppercase tracking-wide block mb-2">
              Método de pago
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "nequi", label: "Nequi", icon: "💜" },
                { id: "pse", label: "PSE", icon: "🏦" },
                { id: "tarjeta", label: "Tarjeta", icon: "💳" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPago(m.id)}
                  className={`py-3 rounded-xl text-sm font-body font-medium border-2 transition-all ${
                    pago === m.id
                      ? "border-[#FF6B2B] bg-orange-50 text-[#FF6B2B]"
                      : "border-gray-200 text-gray-500 hover:border-orange-200"
                  }`}
                >
                  <span className="block text-lg">{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 font-body mt-2">
              💡 Pago seguro vía Wompi — procesamos al confirmar
            </p>
          </div>
        </div>

        {/* Confirm button */}
        <button
          onClick={confirmar}
          disabled={loading}
          className="w-full mt-5 py-4 rounded-2xl bg-[#FF6B2B] text-white font-body font-bold text-base shadow-lg shadow-orange-300 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 transition-all duration-200"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Confirmando pedido...
            </span>
          ) : (
            `✓ Confirmar pedido · ${formatCOP(total)}`
          )}
        </button>

        <p className="text-center text-xs text-gray-400 font-body mt-3">
          Al confirmar, recibirás un mensaje de WhatsApp con los detalles
        </p>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center"><p className="font-body text-gray-400">Cargando...</p></div>}>
      <CheckoutContent />
    </Suspense>
  );
}

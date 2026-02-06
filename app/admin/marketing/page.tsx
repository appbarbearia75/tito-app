"use client"

import { useRouter } from "next/navigation"
import { MoveLeft, QrCode, Share2, Printer, Download } from "lucide-react"

export default function MarketingPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans pb-32">
            {/* Header */}
            <header className="p-6 pt-12 pb-6">
                <div className="flex items-center gap-4 mb-2">
                    <button
                        onClick={() => router.push('/admin')}
                        className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center text-white hover:bg-zinc-800 transition-colors border border-zinc-700"
                    >
                        <MoveLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            Marketing <Share2 className="w-6 h-6 text-[#DBC278]" />
                        </h1>
                        <p className="text-zinc-500 text-xs">Divulgação e Materiais</p>
                    </div>
                </div>
            </header>

            <main className="px-6 space-y-6">

                {/* QR Code Action Card */}
                <div
                    onClick={() => router.push('/admin/marketing/qrcode')}
                    className="bg-[#1c1c1c] p-6 rounded-3xl border border-zinc-800 cursor-pointer group hover:border-[#DBC278]/50 transition-all"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#DBC278]/10 flex items-center justify-center text-[#DBC278] border border-[#DBC278]/20 group-hover:bg-[#DBC278] group-hover:text-black transition-colors">
                            <QrCode className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-bold text-white text-lg">QR Code de Balcão</h2>
                            <p className="text-zinc-500 text-xs">Para clientes escanearem na loja</p>
                        </div>
                    </div>

                    <div className="bg-black/50 rounded-xl p-4 flex items-center justify-between border border-white/5">
                        <span className="text-zinc-400 text-xs font-medium">Material Pronto para Impressão</span>
                        <div className="flex gap-2">
                            <Printer className="w-4 h-4 text-zinc-500" />
                            <Download className="w-4 h-4 text-zinc-500" />
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

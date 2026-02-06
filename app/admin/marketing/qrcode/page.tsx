"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { MoveLeft, Printer, Download, Copy, Share2, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QRCodeSVG } from "qrcode.react"

export default function QrCodePage() {
    const router = useRouter()

    // In a real scenario, this would be the deployed URL or dynamically determined
    // For now we use the demo URL structure
    const APP_URL = "https://tito-barber-app.vercel.app/"

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans pb-32 print:bg-white print:p-0 print:pb-0">

            {/* Header (Hidden on Print) */}
            <header className="p-6 pt-12 pb-6 print:hidden">
                <div className="flex items-center gap-4 mb-2">
                    <button
                        onClick={() => router.push('/admin/marketing')}
                        className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center text-white hover:bg-zinc-800 transition-colors border border-zinc-700"
                    >
                        <MoveLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            QR Code <QrCodeIcon className="w-6 h-6 text-[#DBC278]" />
                        </h1>
                        <p className="text-zinc-500 text-xs">Plaquinha de Balcão</p>
                    </div>
                </div>
            </header>

            <main className="px-6 space-y-8 print:px-0 print:space-y-0 print:w-full print:h-screen print:flex print:items-center print:justify-center">

                {/* Controls (Hidden on Print) */}
                <section className="print:hidden space-y-4">
                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                        <h4 className="text-blue-400 font-bold text-sm mb-1">Como usar?</h4>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                            Imprima esta página ou salve o PDF. Recorte na linha pontilhada e coloque em um display de acrílico no balcão.
                        </p>
                    </div>

                    <Button
                        onClick={handlePrint}
                        className="w-full bg-[#DBC278] text-black font-bold h-12 rounded-xl hover:bg-[#c4ad6b]"
                    >
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimir Plaquinha
                    </Button>
                </section>

                {/* THE PRINTABLE CARD */}
                <div className="relative mx-auto w-full max-w-[350px] aspect-[1/1.4] bg-zinc-950 border-4 border-[#DBC278] rounded-[30px] p-8 flex flex-col items-center justify-between text-center shadow-2xl print:shadow-none print:border-8 print:w-[10cm] print:h-[15cm] print:max-w-none">

                    {/* Brand Header */}
                    <div className="space-y-2">
                        <div className="text-[#DBC278] text-xs font-bold tracking-[0.3em] uppercase">Tito Barber</div>
                        <h2 className="text-3xl font-black text-white leading-tight">
                            Agende seu<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DBC278] to-[#FCE59F] print:text-[#DBC278]">horário agora</span>
                        </h2>
                    </div>

                    {/* QR Code Container */}
                    <div className="bg-white p-4 rounded-3xl shadow-[0_0_40px_rgba(219,194,120,0.2)]">
                        <QRCodeSVG
                            value={APP_URL}
                            size={180}
                            level="H"
                            bgColor="#ffffff"
                            fgColor="#000000"
                        />
                    </div>

                    {/* Footer / CTA */}
                    <div className="space-y-4">
                        <p className="text-zinc-400 text-sm font-medium w-2/3 mx-auto leading-relaxed">
                            Aponte a câmera do celular para começar
                        </p>
                        <div className="bg-[#1c1c1c] rounded-full px-4 py-2 border border-zinc-800 inline-flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Wifi Grátis após cadastro</span>
                        </div>
                    </div>

                    {/* Cut Lines for Print */}
                    <div className="absolute -inset-4 border-2 border-dashed border-zinc-800/50 rounded-[40px] pointer-events-none hidden print:block content-['Recorte_Aqui']"></div>
                </div>

            </main>
        </div>
    )
}

function QrCodeIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="5" height="5" x="3" y="3" rx="1" />
            <rect width="5" height="5" x="16" y="3" rx="1" />
            <rect width="5" height="5" x="3" y="16" rx="1" />
            <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
            <path d="M21 21v.01" />
            <path d="M12 7v3a2 2 0 0 1-2 2H7" />
            <path d="M3 12h.01" />
            <path d="M12 3h.01" />
            <path d="M12 16v.01" />
            <path d="M16 12h1" />
            <path d="M21 12v.01" />
            <path d="M12 21v-1" />
        </svg>
    )
}

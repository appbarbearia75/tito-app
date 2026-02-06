"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { addDays, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from "lucide-react"
import { useState } from "react"
import { createPortal } from "react-dom"

interface DateSelectorProps {
    selectedDate: Date
    onSelect: (date: Date) => void
}

export function DateSelector({ selectedDate, onSelect }: DateSelectorProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    // Horizontal list (next 14 days)
    const horizontalDates = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i))

    return (
        <>
            <div className="flex items-center justify-between px-6 mb-2">
                <button
                    onClick={() => setIsExpanded(true)}
                    className="text-xs font-bold text-[#FFD84D] hover:underline flex items-center gap-1"
                >
                    <CalendarIcon className="w-3 h-3" />
                    VER CALENDÁRIO COMPLETO
                </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-4 px-6 scrollbar-hide">
                {horizontalDates.map((date) => {
                    const isSelected = date.toDateString() === selectedDate.toDateString()
                    const dayName = format(date, "EEE", { locale: ptBR }).toUpperCase().replace('.', '')
                    const dayNumber = format(date, "d")

                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => onSelect(date)}
                            className={cn(
                                "flex flex-col items-center justify-center min-w-[56px] h-[64px] rounded-xl transition-all border border-transparent",
                                isSelected
                                    ? "bg-[#FFD84D] text-black scale-105 shadow-lg shadow-[#FFD84D]/20"
                                    : "bg-[#1c1c1c] text-gray-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                            )}
                        >
                            <span className="text-[10px] font-bold mb-0.5 opacity-80">{dayName}</span>
                            <span className="text-lg font-bold leading-none">{dayNumber}</span>
                        </button>
                    )
                })}
            </div>

            {/* Modal / Expanded View */}
            {isExpanded && <FullCalendarModal selectedDate={selectedDate} onSelect={(d) => { onSelect(d); setIsExpanded(false) }} onClose={() => setIsExpanded(false)} />}
        </>
    )
}

function FullCalendarModal({ selectedDate, onSelect, onClose }: { selectedDate: Date, onSelect: (d: Date) => void, onClose: () => void }) {
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    })

    // Fillers for start of grid
    const startDay = days[0].getDay() // 0 = Sunday
    const emptyStart = Array.from({ length: startDay })

    return createPortal(
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1c1c1c] w-full max-w-sm rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden animate-slide-up">
                <div className="p-4 flex items-center justify-between border-b border-zinc-800">
                    <h3 className="font-bold text-lg capitalize text-white">
                        {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
                    </h3>
                    <div className="flex gap-2">
                        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 hover:bg-white/10 rounded"><ChevronLeft className="w-5 h-5 text-white" /></button>
                        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 hover:bg-white/10 rounded"><ChevronRight className="w-5 h-5 text-white" /></button>
                        <button onClick={onClose} className="p-1 hover:bg-red-500/20 hover:text-red-500 rounded ml-2"><X className="w-5 h-5 text-white" /></button>
                    </div>
                </div>

                <div className="p-4">
                    <div className="grid grid-cols-7 mb-2 text-center">
                        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                            <span key={i} className="text-xs font-bold text-zinc-500">{d}</span>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {emptyStart.map((_, i) => <div key={`empty-${i}`} />)}
                        {days.map((date) => {
                            const isSelected = isSameDay(date, selectedDate)
                            return (
                                <button
                                    key={date.toISOString()}
                                    onClick={() => onSelect(date)}
                                    className={cn(
                                        "h-10 rounded-lg text-sm font-bold transition-all",
                                        isSelected
                                            ? "bg-[#FFD84D] text-black"
                                            : "text-white hover:bg-white/10"
                                    )}
                                >
                                    {format(date, 'd')}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

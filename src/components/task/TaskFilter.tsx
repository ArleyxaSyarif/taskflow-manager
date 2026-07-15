import { useTaskFilterStore } from "../../store/taskFilterStore";

export default function TaskFilter() {
    const {
        filter,
        keyword,
        setFilter,
        setKeyword
    } = useTaskFilterStore();

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input
                    type="text"
                    className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm bg-slate-50/50 focus:bg-white"
                    placeholder="Cari tugas..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {keyword && (
                    <button
                        onClick={() => setKeyword("")}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
                        title="Bersihkan pencarian"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200/60 rounded-xl w-full md:w-auto overflow-x-auto shrink-0">
                <button
                    onClick={() => setFilter("all")}
                    className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 whitespace-nowrap active:scale-[0.98] ${filter === "all"
                        ? "bg-white text-orange-600 shadow-sm border border-slate-200/30"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                        }`}
                >
                    Semua
                </button>

                <button
                    onClick={() => setFilter("completed")}
                    className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 whitespace-nowrap active:scale-[0.98] ${filter === "completed"
                        ? "bg-white text-orange-600 shadow-sm border border-slate-200/30"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                        }`}
                >
                    Selesai
                </button>

                <button
                    onClick={() => setFilter("active")}
                    className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 whitespace-nowrap active:scale-[0.98] ${filter === "active"
                        ? "bg-white text-orange-600 shadow-sm border border-slate-200/30"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                        }`}
                >
                    Belum Selesai
                </button>
            </div>

        </div>
    );
}
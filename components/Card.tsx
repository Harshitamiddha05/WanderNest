interface CardProps {
  title: string;
  description: string;
  icon?: string;
}

export default function Card({
  title,
  description,
  icon,
}: CardProps) {
  return (
    <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col gap-4">

      {icon && (
        <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-emerald-500/10 border border-green-100 dark:border-emerald-500/20 flex items-center justify-center text-2xl">
          {icon}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
          {title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-2">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-emerald-400 hover:text-green-700 dark:hover:text-emerald-300 cursor-pointer transition-colors">
          Learn more

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
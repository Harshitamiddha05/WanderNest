interface CardProps {
  title: string;
  description: string;
  icon?: string;
}

export default function Card({ title, description, icon }: CardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6 flex flex-col gap-4">
      {/* Icon */}
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-2xl">
          {icon}
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-gray-900 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Learn more link */}
      <div className="mt-auto pt-2">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-700 cursor-pointer">
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
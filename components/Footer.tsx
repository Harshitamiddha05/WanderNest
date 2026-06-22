export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#050B18] border-t border-gray-100 dark:border-slate-800 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>

            <span className="text-sm font-semibold text-green-700 dark:text-emerald-400">
              WanderNest
            </span>

            <span className="text-sm text-gray-400 dark:text-slate-500 ml-1">
              © {currentYear} All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>

            <a
              href="/about"
              className="text-sm text-gray-400 hover:text-green-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
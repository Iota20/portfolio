function Footer() {
  return (
    <footer className="bottom-footer border-t border-gray-700 bg-gray-950 px-6 py-16 text-center text-slate-300 shadow-[0_-6px_18px_rgba(0,0,0,0.3)]">
      <div className="bottom-footer__content mx-auto flex max-w-6xl flex-col items-center gap-3">
        <span className="bottom-footer__copy text-base font-bold">© 2026 Ezaiah</span>

        <span className="bottom-footer__brand text-base text-slate-400">Built with:</span>
        <span className="text-base text-slate-400">React · Tailwind CSS · Apache</span>
      </div>
    </footer>
  )
}

export default Footer
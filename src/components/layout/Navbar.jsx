import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SterlingLogo from "../../assets/SterlingLogoNew.svg";

const directLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Pricing", path: "/pricing" },
  { name: "Payment", path: "/payment" },
  { name: "Contact", path: "/contact-us" },
];

const servicesMenu = [
  { name: "SUPER CASH PACK", path: "/services/super-cash-pack" },
  { name: "SUPER INDEX OPTION PACK", path: "/services/super-index-option-pack" },
  { name: "SUPER FUTURE PACK", path: "/services/super-future-pack" },
  { name: "SUPER MCX PACK", path: "/services/super-mcx-pack" },
  { name: "SUPER OPTION PACK", path: "/services/super-option-pack" },
  { name: "SUPREME POWER PACK", path: "/services/supreme-power-pack" },
];

const pricingMenu = [
  { name: "SUPER CASH PACK", path: "/services/super-cash-pack", monthly: "12499/-", quarterly: "34999/-", tagline: "Pure intraday NSE cash calls" },
  { name: "SUPER INDEX OPTION PACK", path: "/services/super-index-option-pack", monthly: "12499/-", quarterly: "34999/-", tagline: "Nifty, Bank Nifty, Sensex options" },
  { name: "SUPER FUTURE PACK", path: "/services/super-future-pack", monthly: "12499/-", quarterly: "34999/-", tagline: "Intraday and positional futures" },
  { name: "SUPER MCX PACK", path: "/services/super-mcx-pack", monthly: "12499/-", quarterly: "34999/-", tagline: "Commodity F&O opportunities" },
  { name: "SUPER OPTION PACK", path: "/services/super-option-pack", monthly: "12499/-", quarterly: "34999/-", tagline: "Stock option setups" },
  { name: "SUPREME POWER PACK", path: "/services/supreme-power-pack", monthly: "-", quarterly: "149999/-", tagline: "Premium F&O high-conviction desk" },
];

const moreMenu = [
  { name: "Accessibility Feedback", path: "/accessibility-feedback" },
  { name: "Accessibility Media", path: "/accessibility-media" },
  { name: "Accessibility Statement", path: "/accessibility-statement" },
];

const complianceMenu = [
  { name: "Research Reports", path: "/research-reports" },
  { name: "Disclosure", path: "/disclosure" },
  { name: "Disclaimer", path: "/disclaimer" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Term & Conditions", path: "/terms-conditions" },
  { name: "Refund Policy", path: "/refund-policy" },
  { name: "Investor Charter", path: "/investor-charter" },
  { name: "Grievance Redressal", path: "/grievance-redressal" },
  { name: "Complaint Board", path: "/complaint-board" },
  { name: "Complaint Status", path: "/complaint-data" },
  { name: "Anti-Money Laundering", path: "/anti-money-laundering" },
  { name: "Acceptance Form", path: "/esign-consent" },
];

/* ---------- Desktop Dropdown ---------- */
const Dropdown = ({ title, items, activePath, widthClass = "w-64", showPricing = false, align = "center" }) => {
  const active = items.some((i) => !i.external && i.path === activePath);
  const dropdownPositionClass =
    align === "right" ? "right-0 top-full pt-4" : "left-1/2 -translate-x-1/2 top-full pt-4";

  return (
    <div className="relative group">
      <button
        className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors ${
          active ? "text-[#d4920a]" : "text-slate-800 hover:text-[#d4920a]"
        }`}
      >
        {title}
        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
      </button>
      <div className={`absolute ${dropdownPositionClass} hidden group-hover:block z-50`}>
        <div className={`${widthClass} rounded-xl border border-slate-200 bg-white shadow-xl p-2`}>
          {items.map((item) =>
            item.external ? (
              <a
                key={item.name}
                href={item.path}
                target="_blank"
                rel="noreferrer"
                className="block px-3 py-2.5 rounded-lg text-sm leading-snug whitespace-normal text-slate-700 hover:bg-slate-50 hover:text-[#b45309]"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={`${item.path}-${item.name}`}
                to={item.path}
                className={`block px-3 py-2.5 rounded-lg text-sm leading-snug whitespace-normal transition-colors ${
                  activePath === item.path
                    ? "bg-amber-50 text-[#b45309]"
                    : "text-slate-700 hover:bg-slate-50 hover:text-[#b45309]"
                }`}
              >
                {showPricing ? (
                  <div>
                    <p className="font-semibold text-[13px]">{item.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.tagline}</p>
                    <div className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-bold">
                      <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5">M: {item.monthly}</span>
                      <span className="rounded-full bg-amber-50 text-amber-700 px-2 py-0.5">Q: {item.quarterly}</span>
                    </div>
                  </div>
                ) : (
                  item.name
                )}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------- Mobile Accordion Group ---------- */
const MobileGroup = ({ title, items, current, onClose, defaultOpen = false, showPricing = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-slate-100 bg-white/70">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        <span className="inline-flex items-center gap-2">
          {title}
          <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
            {items.length}
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-2 space-y-1">
              {items.map((item) =>
                item.external ? (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noreferrer"
                    className="block px-3 py-2.5 rounded-lg text-sm leading-snug whitespace-normal text-slate-600 hover:bg-slate-50 hover:text-[#b45309]"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={`${item.path}-${item.name}`}
                    to={item.path}
                    onClick={onClose}
                    className={`block px-3 py-2.5 rounded-lg text-sm leading-snug whitespace-normal transition-colors ${
                      current === item.path
                        ? "bg-amber-50 text-[#b45309] font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#b45309]"
                    }`}
                  >
                    {showPricing ? (
                      <div>
                        <p className="font-semibold text-[13px]">{item.name}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.tagline}</p>
                        <div className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-bold">
                          <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5">M: {item.monthly}</span>
                          <span className="rounded-full bg-amber-50 text-amber-700 px-2 py-0.5">Q: {item.quarterly}</span>
                        </div>
                      </div>
                    ) : (
                      item.name
                    )}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------- Main Navbar ---------- */
const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isCompact, setIsCompact] = useState(false);

  const current = location.pathname === "/contact" ? "/contact-us" : location.pathname;

  useEffect(() => {
    const onScroll = () => setIsAtTop(window.scrollY < 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => { setIsCompact(mq.matches); if (!mq.matches) setIsOpen(false); };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-nav-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-nav-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-nav-open");
    };
  }, [isOpen]);

  const floating = isAtTop && !isCompact;

  const warningMessage = "We are SEBI Registered Research Analyst (SEBI No. - INH000027751) | Investment in securities market is subject to market risks. Read all related documents carefully before investing.";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Running Warning Bar */}
      <div className="pointer-events-auto bg-[#1e5631] text-white overflow-hidden h-8 flex items-center" aria-label="Risk disclaimer ticker">
        <motion.div
          className="flex w-max items-center whitespace-nowrap text-xs sm:text-sm font-bold"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 26 }}
        >
          {[0, 1].map((idx) => (
            <span key={idx} className="px-6">
              {warningMessage}
            </span>
          ))}
        </motion.div>
      </div>

        <motion.nav
          initial={false}
          animate={{
            width: floating ? "min(1240px, calc(100% - 1.25rem))" : "100%",
            marginTop: floating ? 12 : 0,
            borderRadius: floating ? 999 : 0,
            boxShadow: floating ? "0 18px 45px rgba(2,6,23,0.20)" : "0 4px 14px rgba(2,6,23,0.08)",
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="pointer-events-auto mx-auto bg-white/95 backdrop-blur-md border border-slate-200"
        >
          <div className="px-3 sm:px-5 lg:px-8 h-16 sm:h-[72px] lg:h-20 flex items-center justify-between gap-2">
            <Link to="/" className="flex items-center shrink-0">
              <img src={SterlingLogo} alt="Sterling Research" className="h-10 sm:h-12 lg:h-[46px] w-auto object-contain" />
            </Link>

            <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-5 min-w-0 flex-1 px-2">
              {directLinks.map((link) => (
                <Link key={link.path} to={link.path}
                  className={`text-sm font-semibold transition-colors whitespace-nowrap ${
                    current === link.path ? "text-[#d4920a]" : "text-slate-800 hover:text-[#d4920a]"
                  }`}>
                  {link.name}
                </Link>
              ))}
              <Dropdown title="Services" items={servicesMenu} activePath={current} widthClass="w-80" />
              <Dropdown title="Compliance" items={complianceMenu} activePath={current} widthClass="w-72" />
              <Dropdown title="Accessibility" items={moreMenu} activePath={current} align="right" />
            </div>

            <div className="hidden xl:flex items-center gap-2.5 shrink-0 xl:ml-4">
              <Link to="/esign-consent"
                className="inline-flex items-center px-4 2xl:px-5 py-2 2xl:py-2.5 rounded-lg bg-[#1e5631] text-white text-xs 2xl:text-sm font-semibold hover:bg-[#1a6635] transition-colors whitespace-nowrap">
                Acceptance Form
              </Link>
              <Link to="/payment"
                className="inline-flex items-center px-4 2xl:px-5 py-2 2xl:py-2.5 rounded-lg bg-gradient-to-r from-[#f0a500] to-[#d4920a] text-white text-xs 2xl:text-sm font-bold hover:from-[#f0b429] hover:to-[#f0a500] transition-colors whitespace-nowrap">
                Pay Now
              </Link>
            </div>

            <button onClick={() => setIsOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 pointer-events-auto z-10"
              aria-label="Toggle menu">
              <AnimatePresence mode="wait" initial={false}>
                {isOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                      <X className="w-6 h-6" />
                    </motion.span>
                  : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                      <Menu className="w-6 h-6" />
                    </motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* ---------- Mobile Full-Screen Drawer ---------- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-slate-900/55 backdrop-blur-[3px]"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel - slides in from right */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 z-50 h-full w-[94vw] max-w-[390px] bg-gradient-to-b from-[#fffdf8] via-white to-[#fffaf0] shadow-2xl flex flex-col border-l border-amber-100"
            >
              {/* Drawer Header */}
              <div className="shrink-0 px-5 pt-5 pb-4 border-b border-amber-100 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <img src={SterlingLogo} alt="Sterling Research" className="h-9 w-auto object-contain" style={{ maxWidth: "185px" }} />
                  <button onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-3 rounded-xl border border-[#eadfc8] bg-[#fff7e7] px-3 py-2">
                  <p className="text-[11px] font-semibold tracking-wide text-[#8f1038] uppercase">Mobile Navigation</p>
                  <p className="text-xs text-slate-600 mt-0.5">Fast access to services, compliance and key actions.</p>
                </div>
              </div>

              {/* Scrollable Menu */}
              <div className="flex-1 overflow-y-auto py-3 px-3.5">
                {/* Direct links */}
                <div className="space-y-1.5 mb-4">
                  {directLinks.map((link) => (
                    <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold leading-snug whitespace-normal transition-all ${
                        current === link.path
                          ? "bg-amber-50 text-[#b45309] border border-amber-200"
                          : "text-slate-700 border border-transparent hover:bg-slate-50 hover:border-slate-200"
                      }`}>
                      <span>{link.name}</span>
                      <ChevronRight className={`w-4 h-4 ${current === link.path ? "text-amber-600" : "text-slate-400"}`} />
                    </Link>
                  ))}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4" />

                {/* Accordion groups */}
                <MobileGroup title="Services" items={servicesMenu} current={current} onClose={() => setIsOpen(false)} defaultOpen />
                <MobileGroup title="Compliance" items={complianceMenu} current={current} onClose={() => setIsOpen(false)} />
                <MobileGroup title="Accessibility" items={moreMenu} current={current} onClose={() => setIsOpen(false)} />
              </div>

              {/* Drawer Footer CTAs */}
              <div className="shrink-0 px-4 py-4 border-t border-amber-100 bg-white/90 backdrop-blur-sm space-y-3">
                <Link to="/esign-consent" onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-xl bg-[#1e5631] text-white font-semibold text-sm hover:bg-[#1a6635] transition-colors shadow-[0_8px_24px_rgba(30,86,49,0.28)]">
                  Acceptance Form
                </Link>
                <Link to="/payment" onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-xl bg-gradient-to-r from-[#f0a500] to-[#d4920a] text-white font-bold text-sm hover:from-[#f0b429] hover:to-[#f0a500] transition-colors shadow-[0_8px_24px_rgba(240,165,0,0.32)]">
                  Pay Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

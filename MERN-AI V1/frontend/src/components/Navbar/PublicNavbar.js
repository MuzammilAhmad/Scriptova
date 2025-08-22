import {
  useState,
  useEffect,
} from "react";
import {
  Dialog,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Link,
  useLocation,
} from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Features",
    href: "/features",
  },
  { name: "Pricing", href: "/plans" },
  { name: "About", href: "/about" },
];

export default function PublicNavbar() {
  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);
  const [scrolled, setScrolled] =
    useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled =
        window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );
    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-lg border-b border-white/10 shadow-lg"
            : "bg-transparent"
        }`}>
        <nav
          className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto"
          aria-label="Global">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link
              to="/"
              className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-slate-700 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-slate-400 bg-clip-text text-transparent hidden sm:block">
                Scriptova
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="group -m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
              onClick={() =>
                setMobileMenuOpen(true)
              }>
              <span className="sr-only">
                Open main menu
              </span>
              <Bars3Icon
                className="h-6 w-6 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => {
              const isActive =
                location.pathname ===
                item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-xl group ${
                    isActive
                      ? "text-white bg-white/10 shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}>
                  <span className="relative z-10">
                    {item.name}
                  </span>
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-slate-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isActive
                        ? "opacity-100"
                        : ""
                    }`}
                  />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-400 to-slate-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Login button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300">
              Sign up
            </Link>
            <Link
              to="/login"
              className="group relative px-6 py-2 bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Log in</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </nav>
        {/* Mobile menu */}
        <Transition
          show={mobileMenuOpen}>
          <Dialog
            as="div"
            className="lg:hidden"
            onClose={setMobileMenuOpen}>
            <Transition.Child
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
            </Transition.Child>

            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full">
              <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-900/95 backdrop-blur-lg px-6 py-6 sm:max-w-sm border-l border-white/10">
                {/* Mobile header */}
                <div className="flex items-center justify-between mb-8">
                  <Link
                    to="/"
                    className="flex items-center space-x-2"
                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-slate-700 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={
                            2
                          }
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-slate-400 bg-clip-text text-transparent">
                      Scriptova
                    </span>
                  </Link>
                  <button
                    type="button"
                    className="group -m-2.5 rounded-xl p-2.5 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }>
                    <span className="sr-only">
                      Close menu
                    </span>
                    <XMarkIcon
                      className="h-6 w-6 group-hover:scale-110 transition-transform duration-300"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* Mobile navigation */}
                <div className="space-y-4">
                  {navigation.map(
                    (item) => {
                      const isActive =
                        location.pathname ===
                        item.href;
                      return (
                        <Link
                          key={
                            item.name
                          }
                          to={item.href}
                          onClick={() =>
                            setMobileMenuOpen(
                              false
                            )
                          }
                          className={`group relative block px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 ${
                            isActive
                              ? "text-white bg-white/10 shadow-lg"
                              : "text-gray-300 hover:text-white hover:bg-white/5"
                          }`}>
                          <span className="relative z-10 flex items-center justify-between">
                            {item.name}
                            <svg
                              className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={
                                  2
                                }
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                          <div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-slate-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              isActive
                                ? "opacity-100"
                                : ""
                            }`}
                          />
                        </Link>
                      );
                    }
                  )}
                </div>

                {/* Mobile auth buttons */}
                <div className="mt-8 space-y-4">
                  <Link
                    to="/register"
                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }
                    className="block w-full px-4 py-3 text-center text-base font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300">
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }
                    className="group block w-full px-4 py-3 text-center text-base font-semibold bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white rounded-xl transition-all duration-300 transform hover:scale-105">
                    <span className="flex items-center justify-center space-x-2">
                      <span>
                        Log in
                      </span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={
                            2
                          }
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      </header>
    </>
  );
}

import {
  Fragment,
  useState,
  useEffect,
} from "react";
import {
  Disclosure,
  // Menu,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { FiLogOut } from "react-icons/fi";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAPI } from "../../apis/user/userAPI";
import { useAuth } from "../../AuthContext/AuthContext";


const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Pricing",
    href: "/plans",
  },
  {
    name: "Features",
    href: "/features",
  },
  {
    name: "About",
    href: "/about",
  },
];

export default function PrivateNavbar() {
  const [scrolled, setScrolled] =
    useState(false);
  const [showGeneratePopup, setShowGeneratePopup] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showGeneratePopup && !event.target.closest('.generate-dropdown')) {
        setShowGeneratePopup(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showGeneratePopup]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuth();

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

  //Mutation
  const mutation = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      // Invalidate auth-related queries
      queryClient.invalidateQueries({ queryKey: ['checkAuth'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      // Update auth state
      logout();
      // Navigate to login
      navigate('/login');
    },
  });

  //Handle logout
  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <Disclosure
      as="nav"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-lg border-b border-white/10 shadow-lg"
          : "bg-slate-900/90 backdrop-blur-sm"
      }`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Left side - Logo and Navigation */}
              <div className="flex items-center">
                {/* Mobile menu button */}
                <div className="md:hidden mr-4">
                  <Disclosure.Button className="group inline-flex items-center justify-center rounded-xl p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">
                    <span className="sr-only">
                      Open main menu
                    </span>
                    {open ? (
                      <XMarkIcon
                        className="block h-6 w-6 group-hover:scale-110 transition-transform duration-300"
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon
                        className="block h-6 w-6 group-hover:scale-110 transition-transform duration-300"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Logo */}
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

                {/* Desktop Navigation */}
                <div className="hidden md:ml-8 md:flex md:items-center md:space-x-4">
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
                    }
                  )}
                </div>
              </div>

              {/* Right side - Actions */}
              <div className="flex items-center space-x-4">
                {/* Generate Dropdown */}
                <div className="relative generate-dropdown">
                  <button
                    onClick={() => setShowGeneratePopup(!showGeneratePopup)}
                    className="group relative bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 animate-pulse">
                    <span className="relative z-10 flex items-center space-x-2">
                      <PlusIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">Generate</span>
                    </span>
                  </button>
                  {showGeneratePopup && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
                      <Link to="/generate-code" onClick={() => setShowGeneratePopup(false)} className="relative flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-t-2xl transition-all duration-300 group">
                        <span className="mr-3 text-blue-400 group-hover:scale-110 transition-transform duration-300">{'</>'}</span>
                        <span className="font-medium">Generate Code</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-slate-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
                      </Link>
                      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <Link to="/generate-content" onClick={() => setShowGeneratePopup(false)} className="relative flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-b-2xl transition-all duration-300 group">
                        <span className="mr-3 text-slate-400 group-hover:scale-110 transition-transform duration-300">📝</span>
                        <span className="font-medium whitespace-nowrap">Generate Content</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="group relative bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 font-semibold p-2 rounded-xl transition-all duration-300 transform hover:scale-105">
                  <FiLogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1">
            <Disclosure.Panel className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-white/10">
              <div className="px-4 py-4 space-y-2">
                {navigation.map(
                  (item) => {
                    const isActive =
                      location.pathname ===
                      item.href;
                    return (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        to={item.href}
                        className={`group relative block w-full px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 ${
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
                      </Disclosure.Button>
                    );
                  }
                )}
              </div>

              {/* Mobile Actions */}
              <div className="px-4 py-4 border-t border-white/10 space-y-3">
                <Link
                  to="/generate-content"
                  className="group block w-full px-4 py-3 text-center text-base font-semibold bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white rounded-xl transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center justify-center space-x-2">
                    <PlusIcon className="w-5 h-5" />
                    <span>
                      Generate Content
                    </span>
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="group block w-full px-4 py-3 text-center text-base font-semibold bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300">
                  <span className="flex items-center justify-center space-x-2">
                    <FiLogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span>
                      Sign Out
                    </span>
                  </span>
                </button>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}

    </Disclosure>
  );
}

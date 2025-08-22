import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import FloatingParticles from '../FloatingParticles';

const features = [
  {
    name: "Push to deploy",
    description:
      "Deploy your content instantly and securely with Scriptiova's robust cloud infrastructure.",
    icon: CloudArrowUpIcon,
    gradient: "from-blue-600 to-slate-700",
  },
  {
    name: "SSL certificates",
    description:
      "Your data and content are protected with industry-leading SSL encryption.",
    icon: LockClosedIcon,
    gradient: "from-green-500 to-blue-500",
  },
  {
    name: "Simple queues",
    description:
      "Effortlessly manage and scale your content generation tasks with our intuitive queue system.",
    icon: ArrowPathIcon,
    gradient: "from-slate-500 to-cyan-500",
  },
];

export default function AppFeatures() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden py-24 px-4 sm:py-32">
      {/* Floating Particles */}
      <FloatingParticles />
      {/* Blurred Gradient Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-slate-600/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-slate-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse z-0" style={{ animationDelay: "1s" }} />
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 to-slate-400 bg-clip-text text-transparent mb-4">
            Scriptiova Features
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Discover the powerful features that make Scriptiova the ultimate platform for AI-driven content creation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center group h-full"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-slate-400 bg-clip-text text-transparent">
                {feature.name}
              </h3>
              <p className="text-gray-300 text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

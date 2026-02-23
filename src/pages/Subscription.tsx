import { Button } from "@/components/ui/button";
import { Check, X, Zap, Star, Crown, ArrowRight, Users, Video, MessageSquare, DollarSign } from "lucide-react";
import subscriptionHero from "@/assets/subscription-hero.jpg";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "View Access",
    price: "Free",
    period: "",
    description: "Perfect for curious learners",
    icon: Star,
    gradient: "from-slate-700 to-slate-800",
    iconBg: "bg-slate-500/20",
    iconColor: "text-slate-300",
    accentColor: "slate",
    features: [
      { text: "Watch live sessions", included: true },
      { text: "Observe discussions", included: true },
      { text: "Browse all content", included: true },
      { text: "Speak in discussions", included: false },
      { text: "Create sessions", included: false },
      { text: "Post freelance tasks", included: false },
      { text: "Earn from content", included: false },
    ],
    popular: false,
    cta: "Start Free",
  },
  {
    name: "Talk Access",
    price: "$9.99",
    period: "/month",
    description: "Dive into the conversation",
    icon: Zap,
    gradient: "from-orange-600 to-amber-600",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    accentColor: "orange",
    features: [
      { text: "Everything in View", included: true },
      { text: "Join live sessions", included: true },
      { text: "Speak in discussions", included: true },
      { text: "Participate actively", included: true },
      { text: "Create sessions", included: false },
      { text: "Post freelance tasks", included: false },
      { text: "Earn from content", included: false },
    ],
    popular: false,
    cta: "Get Talk Access",
  },
  {
    name: "Create & Earn",
    price: "$19.99",
    period: "/month",
    description: "Full creator & earner access",
    icon: Crown,
    gradient: "from-pink-600 to-orange-500",
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-400",
    accentColor: "pink",
    features: [
      { text: "Everything in Talk", included: true },
      { text: "Create live sessions", included: true },
      { text: "Create discussion rooms", included: true },
      { text: "Post freelance tasks", included: true },
      { text: "Earn money from content", included: true },
      { text: "Priority support", included: true },
      { text: "Creator dashboard", included: true },
    ],
    popular: true,
    cta: "Start Creating",
  },
];

const stats = [
  { icon: Users, value: "12K+", label: "Active Members" },
  { icon: Video, value: "500+", label: "Live Sessions" },
  { icon: MessageSquare, value: "200+", label: "Discussion Rooms" },
  { icon: DollarSign, value: "$2M+", label: "Earned by Creators" },
];

export default function Subscription() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050B2E] overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative h-[60vh] min-h-[480px] overflow-hidden">
        <img src={subscriptionHero} alt="Lyfex Plans" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B2E]/60 via-[#050B2E]/50 to-[#050B2E]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050B2E]/80 via-transparent to-[#050B2E]/80" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-orange-300 text-sm font-semibold tracking-wider uppercase">Simple, Honest Pricing</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-5">
            Choose Your<br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
              Access Level
            </span>
          </h1>

          <p className="text-white/60 text-lg sm:text-xl max-w-xl mx-auto mb-8">
            Start completely free. Upgrade when you're ready. No hidden fees, ever.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2 backdrop-blur-sm bg-white/8 border border-white/15 rounded-full px-5 py-2">
                <Icon className="w-4 h-4 text-orange-400" />
                <span className="text-white font-bold text-sm">{value}</span>
                <span className="text-white/50 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="relative px-4 pb-24">
        <div className="max-w-6xl mx-auto -mt-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                    plan.popular
                      ? "ring-2 ring-pink-500/50 shadow-2xl shadow-pink-500/20"
                      : "ring-1 ring-white/10 hover:ring-white/20"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Card background */}
                  <div className="absolute inset-0 bg-[#0A0F2D]" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-10`} />

                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-orange-400" />
                  )}

                  <div className="relative z-10 p-8">
                    {plan.popular && (
                      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-500/30 rounded-full px-3 py-1 mb-5">
                        <Crown className="w-3 h-3 text-pink-400" />
                        <span className="text-pink-300 text-xs font-bold uppercase tracking-wider">Most Popular</span>
                      </div>
                    )}

                    {/* Plan header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className={`w-12 h-12 rounded-2xl ${plan.iconBg} flex items-center justify-center mb-3`}>
                          <Icon className={`w-6 h-6 ${plan.iconColor}`} />
                        </div>
                        <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                        <p className="text-white/50 text-sm mt-1">{plan.description}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-7 pb-7 border-b border-white/8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black text-white">{plan.price}</span>
                        {plan.period && <span className="text-white/40 text-base">{plan.period}</span>}
                      </div>
                      {plan.period && (
                        <p className="text-white/30 text-xs mt-1">Billed monthly · Cancel anytime</p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            feature.included ? "bg-orange-500/20" : "bg-white/5"
                          }`}>
                            {feature.included
                              ? <Check className="w-3 h-3 text-orange-400" />
                              : <X className="w-3 h-3 text-white/20" />
                            }
                          </div>
                          <span className={`text-sm ${feature.included ? "text-white/85" : "text-white/25 line-through"}`}>
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button
                      onClick={() => navigate('/register')}
                      className={`w-full h-12 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                        plan.popular
                          ? "bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50"
                          : "bg-white/8 hover:bg-white/15 text-white border border-white/10 hover:border-white/20"
                      }`}
                    >
                      {plan.cta} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom note */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-8 backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl px-8 py-5">
              {["30-day money back", "No credit card for free plan", "Cancel anytime", "24/7 support"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span className="text-white/60 text-sm whitespace-nowrap">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

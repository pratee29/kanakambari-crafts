import { ArrowLeft, TrendingUp, DollarSign, Clock, Wallet, BarChart3, Zap, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { motion } from "framer-motion";

const stats = [
  { label: "Total Earned", value: "₹12,450", icon: TrendingUp, color: "text-green-400", bg: "from-green-500/20 to-emerald-500/10", border: "border-green-500/30", change: "+18%" },
  { label: "This Month", value: "₹3,200", icon: DollarSign, color: "text-orange-400", bg: "from-orange-500/20 to-amber-500/10", border: "border-orange-500/30", change: "+12%" },
  { label: "Pending", value: "₹1,800", icon: Clock, color: "text-yellow-400", bg: "from-yellow-500/20 to-amber-500/10", border: "border-yellow-500/30", change: "Pending" },
  { label: "Withdrawn", value: "₹7,450", icon: Wallet, color: "text-blue-400", bg: "from-blue-500/20 to-indigo-500/10", border: "border-blue-500/30", change: "Settled" },
];

const breakdown = [
  { source: "Live Sessions", amount: "₹4,200", count: 12, icon: "🎙️", gradient: "from-orange-400 to-pink-500", pct: 34 },
  { source: "Discussions", amount: "₹2,800", count: 8, icon: "💬", gradient: "from-violet-400 to-purple-500", pct: 22 },
  { source: "Support Work", amount: "₹3,650", count: 5, icon: "💼", gradient: "from-emerald-400 to-teal-500", pct: 29 },
  { source: "Pause Content", amount: "₹1,800", count: 15, icon: "🎵", gradient: "from-indigo-400 to-blue-500", pct: 15 },
];

export default function EarningsPage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  if (userProfile?.role !== "CREATE") {
    return (
      <div className="min-h-screen bg-[#070B24] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1600&auto=format" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B24]/60 to-[#070B24]" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10 p-8"
        >
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-white text-2xl font-bold mb-2">Earnings for Creators Only</h2>
          <p className="text-white/50 mb-6">Upgrade to CREATE plan to unlock earnings features</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/subscription")}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold shadow-lg shadow-orange-500/30"
          >
            Upgrade Now →
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B24] overflow-x-hidden">
      <Header />

      {/* HERO */}
      <div className="relative pt-24 pb-10 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1600&auto=format" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B24]/60 via-[#070B24]/80 to-[#070B24]" />
        </div>
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-32 right-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-6 relative"
        >
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/homepage")} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold">
                  <Zap size={11} /> Creator Earnings
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                💰 Earnings <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-white/50 mt-2 text-base">Track your revenue and withdraw earnings</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* STATS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`relative rounded-2xl p-6 bg-gradient-to-br ${s.bg} border ${s.border} overflow-hidden group`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${s.bg} rounded-full blur-2xl opacity-50 translate-x-8 -translate-y-8`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/10">
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-green-400 flex items-center gap-1">
                    <ArrowUpRight size={12} /> {s.change}
                  </span>
                </div>
                <p className="text-3xl font-black text-white mb-1">{s.value}</p>
                <p className="text-white/50 text-sm">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BREAKDOWN + CHART */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* BREAKDOWN */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-orange-400" />
              <h2 className="text-xl font-bold text-white">Earnings Breakdown</h2>
            </div>
            <div className="space-y-5">
              {breakdown.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{b.icon}</span>
                      <div>
                        <p className="text-white font-medium text-sm">{b.source}</p>
                        <p className="text-white/40 text-xs">{b.count} activities</p>
                      </div>
                    </div>
                    <span className="text-orange-400 font-bold">{b.amount}</span>
                  </div>
                  {/* PROGRESS BAR */}
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${b.pct}%` }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${b.gradient}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* QUICK STATS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* TOTAL CARD */}
            <div className="relative rounded-3xl overflow-hidden h-[200px]">
              <img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/50 to-pink-600/50" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="text-white/70 text-sm mb-1">Total Lifetime Earnings</p>
                <p className="text-white text-5xl font-black">₹12,450</p>
                <p className="text-green-400 text-sm mt-2 flex items-center gap-1"><ArrowUpRight size={14} /> 18% growth this month</p>
              </div>
            </div>

            {/* WITHDRAW CARD */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-lg">Ready to Withdraw</p>
                <p className="text-orange-400 text-2xl font-black mt-1">₹3,200</p>
                <p className="text-white/40 text-sm mt-1">Available balance</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-orange-500/30"
              >
                💸 Withdraw
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* WITHDRAW BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-lg shadow-lg shadow-orange-500/30 hover:opacity-90 transition"
        >
          💸 Withdraw All Earnings
        </motion.button>
      </div>
    </div>
  );
}

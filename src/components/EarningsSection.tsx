import { DollarSign, TrendingUp, Wallet, ArrowUpRight } from "lucide-react";

export default function EarningsSection() {
  return (
    <section className="py-24 bg-[#070B24] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#142A14] border border-green-400/30 text-green-400 font-semibold">
              💰 EARNINGS
            </span>
            <p className="text-white/70 mt-6 text-lg">
              Track your income & withdraw anytime
            </p>
          </div>
          <button className="px-7 py-2.5 rounded-full bg-green-500 text-black font-medium hover:bg-green-400 transition">
            Withdraw
          </button>
        </div>

        {/* STATS GRID */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Earned", value: "₹12,450", icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "This Month", value: "₹3,200", icon: TrendingUp, color: "text-orange-400", bg: "bg-orange-500/10" },
            { label: "Pending", value: "₹1,800", icon: Wallet, color: "text-yellow-400", bg: "bg-yellow-500/10" },
            { label: "Withdrawn", value: "₹7,450", icon: ArrowUpRight, color: "text-blue-400", bg: "bg-blue-500/10" },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <p className="text-white/60 text-sm">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* EARNING BREAKDOWN */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-6">Earning Breakdown</h3>
          <div className="space-y-4">
            {[
              { source: "Live Sessions", amount: "₹5,200", sessions: 12 },
              { source: "Discussion Rooms", amount: "₹3,100", sessions: 8 },
              { source: "Support Work", amount: "₹2,800", sessions: 5 },
              { source: "Pause Content", amount: "₹1,350", sessions: 15 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-white font-medium">{item.source}</p>
                  <p className="text-white/50 text-sm">{item.sessions} items</p>
                </div>
                <span className="text-green-400 font-bold text-lg">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowLeft, TrendingUp, DollarSign, Clock, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

const bannerImages = [
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format",
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&auto=format",
  "https://images.unsplash.com/photo-1553729459-afe8f2e2ed65?w=1200&auto=format",
];

const stats = [
  { label: "Total Earned", value: "₹12,450", icon: TrendingUp, color: "text-primary" },
  { label: "This Month", value: "₹3,200", icon: DollarSign, color: "text-accent" },
  { label: "Pending", value: "₹1,800", icon: Clock, color: "text-primary" },
  { label: "Withdrawn", value: "₹7,450", icon: Wallet, color: "text-accent" },
];

const breakdown = [
  { source: "Live Sessions", amount: "₹4,200", count: 12 },
  { source: "Discussions", amount: "₹2,800", count: 8 },
  { source: "Support Work", amount: "₹3,650", count: 5 },
  { source: "Pause Content", amount: "₹1,800", count: 15 },
];

export default function EarningsPage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  if (userProfile?.role !== "CREATE") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground text-xl mb-4">🔒 Earnings are available for CREATE plan only</p>
          <button onClick={() => navigate("/subscription")} className="px-6 py-3 rounded-full gradient-orange text-primary-foreground font-semibold">Upgrade Now</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO BANNER */}
      <PageBanner
        title="💰 Earnings"
        titleHighlight="Dashboard"
        subtitle="Track your revenue and withdraw earnings"
        badge={{ icon: <TrendingUp size={11} />, text: "Your Revenue" }}
        images={bannerImages}
      />

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4, scale: 1.02 }} className="card-glass rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-secondary border border-border"><s.icon className={`w-5 h-5 ${s.color}`} /></div>
                <span className="text-muted-foreground text-sm">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-glass rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Earnings Breakdown</h2>
          <div className="space-y-4">
            {breakdown.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-secondary/30 px-3 rounded-lg transition">
                <div><p className="text-foreground font-medium">{b.source}</p><p className="text-muted-foreground text-sm">{b.count} activities</p></div>
                <span className="text-primary font-bold text-lg">{b.amount}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 rounded-full gradient-orange text-primary-foreground font-semibold hover:opacity-90 transition glow-orange">
          💸 Withdraw Earnings
        </motion.button>
      </div>

      <Footer />
    </div>
  );
}

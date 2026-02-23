import { ArrowLeft, TrendingUp, DollarSign, Clock, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";

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
          <button onClick={() => navigate("/subscription")} className="px-6 py-3 rounded-full gradient-orange text-primary-foreground font-semibold">
            Upgrade Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={() => navigate("/homepage")} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">💰 Earnings Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track your revenue and withdraw earnings</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <div key={i} className="card-glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-secondary border border-border">
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <span className="text-muted-foreground text-sm">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Breakdown */}
        <div className="card-glass rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Earnings Breakdown</h2>
          <div className="space-y-4">
            {breakdown.map((b, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-foreground font-medium">{b.source}</p>
                  <p className="text-muted-foreground text-sm">{b.count} activities</p>
                </div>
                <span className="text-primary font-bold text-lg">{b.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="px-8 py-3 rounded-full gradient-orange text-primary-foreground font-semibold hover:opacity-90 transition glow-orange">
          💸 Withdraw Earnings
        </button>
      </div>
    </div>
  );
}

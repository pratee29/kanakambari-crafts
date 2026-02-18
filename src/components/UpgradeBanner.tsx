import { Lock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UpgradeBannerProps {
  feature: string;
  requiredPlan: string;
}

export default function UpgradeBanner({ feature, requiredPlan }: UpgradeBannerProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-400/20 backdrop-blur-sm">
      <div className="bg-orange-500/20 p-3 rounded-full">
        <Lock size={20} className="text-orange-400" />
      </div>
      <div className="flex-1">
        <p className="text-white font-semibold">{feature} requires {requiredPlan} plan</p>
        <p className="text-white/50 text-sm">Upgrade your subscription to unlock this feature</p>
      </div>
      <button
        onClick={() => navigate('/subscription')}
        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition whitespace-nowrap"
      >
        <Zap size={16} /> Upgrade Now
      </button>
    </div>
  );
}

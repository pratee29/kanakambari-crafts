import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader, Check, Eye, EyeOff, ArrowRight, ArrowLeft, Zap, Star, Crown } from 'lucide-react';
import authHero from '@/assets/auth-hero.jpg';

type SubscriptionPlan = 'VIEW' | 'TALK' | 'CREATE';

const plans = [
  {
    id: 'VIEW' as const,
    name: 'View Access',
    price: 'Free',
    period: '',
    description: 'Observe & learn',
    icon: Star,
    iconColor: 'text-slate-400',
    gradient: 'from-slate-500/20 to-slate-600/20',
    border: 'border-slate-500/30',
    activeBorder: 'border-slate-400',
    features: ['Watch live sessions', 'Observe discussions', 'Browse content'],
  },
  {
    id: 'TALK' as const,
    name: 'Talk Access',
    price: '$9.99',
    period: '/mo',
    description: 'Join the conversation',
    icon: Zap,
    iconColor: 'text-orange-400',
    gradient: 'from-orange-500/20 to-amber-500/20',
    border: 'border-orange-500/30',
    activeBorder: 'border-orange-400',
    features: ['Everything in View', 'Join live sessions', 'Speak in discussions', 'Participate actively'],
  },
  {
    id: 'CREATE' as const,
    name: 'Create & Earn',
    price: '$19.99',
    period: '/mo',
    description: 'Full creator access',
    icon: Crown,
    iconColor: 'text-pink-400',
    gradient: 'from-pink-500/20 to-orange-500/20',
    border: 'border-pink-500/30',
    activeBorder: 'border-pink-400',
    popular: true,
    features: ['Everything in Talk', 'Create live sessions', 'Create discussion rooms', 'Post freelance tasks', 'Earn from content'],
  },
];

export default function Register() {
  const navigate = useNavigate();
  const { registerWithEmail, error, clearError } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('VIEW');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
    phone: '', address: '', interest: '',
  });

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isStep1Valid =
    formData.fullName.trim() && validateEmail(formData.email) &&
    formData.password.length >= 6 && formData.password === formData.confirmPassword &&
    formData.phone.trim() && formData.address.trim() && formData.interest.trim();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError();
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStep1Valid) setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      setLoading(true);
      await registerWithEmail(formData.email, formData.password, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        interest: formData.interest,
        subscriptionPlan: selectedPlan,
        role: selectedPlan,
      });
      navigate('/homepage');
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden flex-col">
        <img src={authHero} alt="Lyfex Community" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#050B2E]/85 via-[#0A0F2D]/70 to-pink-900/40" />

        <div className="relative z-10 p-10 flex flex-col h-full">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">LYFEX</h2>
            <p className="text-orange-400 text-xs font-medium tracking-widest uppercase mt-1">Learn. Connect. Grow.</p>
          </div>

          {/* Middle content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-3 py-1 mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-orange-300 text-xs font-semibold">Join 12,000+ Learners</span>
              </div>
              <h3 className="text-4xl font-black text-white leading-tight mb-4">
                Your journey<br />starts here.
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Create your account and become part of the most vibrant live learning community on the internet.
              </p>
            </div>

            {/* Testimonial */}
            <div className="backdrop-blur-md bg-white/8 border border-white/15 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="text-orange-400 text-sm">★</span>
                  ))}
                </div>
                <span className="text-white/50 text-xs">5.0 rating</span>
              </div>
              <p className="text-white/80 text-sm italic leading-relaxed mb-3">
                "Lyfex completely transformed how I learn. The live sessions are incredible and the community is so supportive."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">S</div>
                <div>
                  <p className="text-white text-xs font-semibold">Sarah K.</p>
                  <p className="text-white/40 text-xs">Create & Contribute member</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step >= s ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/40'
                }`}>{step > s ? <Check className="w-4 h-4" /> : s}</div>
                {s < 2 && <div className={`w-12 h-0.5 transition-all duration-300 ${step >= 2 ? 'bg-orange-500' : 'bg-white/10'}`} />}
              </div>
            ))}
            <span className="text-white/40 text-xs ml-2">Step {step} of 2</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-3/5 bg-[#050B2E] overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center px-8 py-12 relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/5 rounded-full blur-[60px]" />

          <div className="relative z-10 w-full max-w-xl">
            {/* Mobile brand */}
            <div className="lg:hidden mb-8 text-center">
              <h2 className="text-2xl font-black text-white">LYFEX</h2>
              <p className="text-orange-400 text-xs tracking-widest uppercase">Learn. Connect. Grow.</p>
              {/* Mobile step indicator */}
              <div className="flex items-center justify-center gap-3 mt-4">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/40'}`}>
                      {step > s ? <Check className="w-3 h-3" /> : s}
                    </div>
                    {s < 2 && <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-orange-500' : 'bg-white/10'}`} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <Alert className="mb-5 bg-red-500/10 border border-red-500/30 rounded-xl">
                <AlertDescription className="text-red-400 text-sm">{error}</AlertDescription>
              </Alert>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-4">
                    <span className="text-orange-400 text-xs font-semibold tracking-wider uppercase">Step 1 — Your Details</span>
                  </div>
                  <h1 className="text-4xl font-black text-white leading-tight mb-2">
                    Create your<br />
                    <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">free account</span>
                  </h1>
                  <p className="text-white/50 text-sm">Fill in your info — takes less than 2 minutes.</p>
                </div>

                <form onSubmit={handleNextStep} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Full Name</label>
                      <Input name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleInputChange}
                        className="bg-white/5 border-white/10 hover:border-white/20 focus:border-orange-500/50 text-white placeholder:text-white/25 rounded-xl h-11" required />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Phone</label>
                      <Input type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInputChange}
                        className="bg-white/5 border-white/10 hover:border-white/20 focus:border-orange-500/50 text-white placeholder:text-white/25 rounded-xl h-11" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Email Address</label>
                    <Input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleInputChange}
                      className="bg-white/5 border-white/10 hover:border-white/20 focus:border-orange-500/50 text-white placeholder:text-white/25 rounded-xl h-11" required />
                    {formData.email && !validateEmail(formData.email) && (
                      <p className="text-red-400 text-xs mt-1">Invalid email format</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Address</label>
                    <Input name="address" placeholder="123 Main St, City, State" value={formData.address} onChange={handleInputChange}
                      className="bg-white/5 border-white/10 hover:border-white/20 focus:border-orange-500/50 text-white placeholder:text-white/25 rounded-xl h-11" required />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Interest / Expertise</label>
                    <Input name="interest" placeholder="e.g. Design, Tech, Business" value={formData.interest} onChange={handleInputChange}
                      className="bg-white/5 border-white/10 hover:border-white/20 focus:border-orange-500/50 text-white placeholder:text-white/25 rounded-xl h-11" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Password</label>
                      <div className="relative">
                        <Input type={showPassword ? 'text' : 'password'} name="password" placeholder="••••••••" value={formData.password} onChange={handleInputChange}
                          className="bg-white/5 border-white/10 hover:border-white/20 focus:border-orange-500/50 text-white placeholder:text-white/25 rounded-xl h-11 pr-10" required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {formData.password && formData.password.length < 6 && (
                        <p className="text-red-400 text-xs mt-1">Min 6 characters</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Confirm</label>
                      <div className="relative">
                        <Input type={showConfirm ? 'text' : 'password'} name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleInputChange}
                          className="bg-white/5 border-white/10 hover:border-white/20 focus:border-orange-500/50 text-white placeholder:text-white/25 rounded-xl h-11 pr-10" required />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                          {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-red-400 text-xs mt-1">Passwords don't match</p>
                      )}
                    </div>
                  </div>

                  <Button type="submit" disabled={!isStep1Valid}
                    className="w-full h-12 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-40 text-base shadow-lg shadow-orange-500/20 mt-2 flex items-center justify-center gap-2">
                    Continue to Plans <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>

                <p className="text-center text-white/40 text-sm mt-5">
                  Already have an account?{' '}
                  <Link to="/login" className="text-orange-400 hover:text-orange-300 font-semibold">Sign in</Link>
                </p>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 mb-4">
                    <span className="text-pink-400 text-xs font-semibold tracking-wider uppercase">Step 2 — Choose Plan</span>
                  </div>
                  <h1 className="text-4xl font-black text-white leading-tight mb-2">
                    Pick your<br />
                    <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">access level</span>
                  </h1>
                  <p className="text-white/50 text-sm">Start free. Upgrade anytime.</p>
                </div>

                <div className="space-y-4 mb-6">
                  {plans.map((plan) => {
                    const Icon = plan.icon;
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                          isSelected
                            ? `bg-gradient-to-r ${plan.gradient} ${plan.activeBorder} shadow-lg`
                            : `bg-white/3 ${plan.border} hover:bg-white/5`
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 right-5 px-3 py-0.5 bg-gradient-to-r from-orange-400 to-pink-500 text-black text-[10px] font-black rounded-full uppercase tracking-wider">
                            Most Popular
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 ${plan.iconColor}`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-white font-bold text-base">{plan.name}</h3>
                              </div>
                              <p className="text-white/50 text-xs">{plan.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-black text-xl">{plan.price}</div>
                            {plan.period && <div className="text-white/40 text-xs">{plan.period}</div>}
                          </div>
                        </div>

                        {isSelected && (
                          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
                            {plan.features.map((f, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Check className="w-3 h-3 text-orange-400 flex-shrink-0" />
                                <span className="text-white/70 text-xs">{f}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => setStep(1)} disabled={loading}
                    className="flex-1 h-12 bg-white/8 hover:bg-white/15 text-white font-bold rounded-xl border border-white/10 flex items-center justify-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button onClick={handleRegister} disabled={loading}
                    className="flex-2 h-12 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 flex-1 flex items-center justify-center gap-2 transition-all duration-300">
                    {loading ? <><Loader className="w-4 h-4 animate-spin" />Creating...</> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader, Eye, EyeOff, Sparkles, Users, Video, MessageSquare } from 'lucide-react';
import authHero from '@/assets/auth-hero.jpg';

export default function Login() {
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGoogle, error, clearError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = validateEmail(formData.email) && formData.password.length >= 6;

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (!isFormValid) return;
    try {
      setLoading(true);
      await loginWithEmail(formData.email, formData.password);
      navigate('/homepage');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    clearError();
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/homepage');
    } catch (err) {
      console.error('Google login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError();
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* LEFT PANEL — IMAGE SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={authHero} alt="Lyfex Community" className="absolute inset-0 w-full h-full object-cover" />
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050B2E]/80 via-[#0A0F2D]/60 to-orange-900/40" />

        {/* floating stats */}
        <div className="absolute bottom-16 left-8 right-8 flex flex-col gap-4 z-10">
          <div className="flex gap-4">
            {[
              { icon: Users, label: '12K+ Learners', color: 'from-orange-400 to-orange-500' },
              { icon: Video, label: '500+ Live Sessions', color: 'from-pink-400 to-pink-500' },
              { icon: MessageSquare, label: '200+ Discussions', color: 'from-purple-400 to-purple-500' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex-1 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 flex flex-col items-center gap-2">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-xs font-semibold text-center">{label}</span>
              </div>
            ))}
          </div>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span className="text-white font-bold">Why Lyfex?</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              The world's most immersive live learning community — connect, create, and earn from your expertise.
            </p>
          </div>
        </div>

        {/* Brand name */}
        <div className="absolute top-10 left-10 z-10">
          <h2 className="text-3xl font-black text-white tracking-tight">LYFEX</h2>
          <p className="text-orange-400 text-sm font-medium tracking-widest uppercase">Learn. Connect. Grow.</p>
        </div>
      </div>

      {/* RIGHT PANEL — FORM SIDE */}
      <div className="w-full lg:w-1/2 bg-[#050B2E] flex items-center justify-center px-8 py-12 relative overflow-hidden">
        {/* subtle bg glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/5 rounded-full blur-[80px]" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile brand */}
          <div className="lg:hidden mb-8 text-center">
            <h2 className="text-2xl font-black text-white">LYFEX</h2>
            <p className="text-orange-400 text-xs tracking-widest uppercase">Learn. Connect. Grow.</p>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-orange-400 text-xs font-semibold tracking-wider uppercase">Welcome Back</span>
            </div>
            <h1 className="text-4xl font-black text-white leading-tight mb-2">
              Sign in to<br />
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">your world</span>
            </h1>
            <p className="text-white/50 text-sm">Your community is waiting for you.</p>
          </div>

          {/* Error */}
          {error && (
            <Alert className="mb-5 bg-red-500/10 border border-red-500/30 rounded-xl">
              <AlertDescription className="text-red-400 text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 mb-6 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">or sign in with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Email Address</label>
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                className="bg-white/5 border-white/10 hover:border-white/20 focus:border-orange-500/50 text-white placeholder:text-white/30 rounded-xl h-12 transition-colors"
              />
              {formData.email && !validateEmail(formData.email) && (
                <p className="text-red-400 text-xs mt-1">Invalid email format</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="bg-white/5 border-white/10 hover:border-white/20 focus:border-orange-500/50 text-white placeholder:text-white/30 rounded-xl h-12 pr-12 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full h-12 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-40 text-base shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
            >
              {loading ? (
                <><Loader className="w-4 h-4 animate-spin" /> Signing in...</>
              ) : 'Sign In →'}
            </Button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

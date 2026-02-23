import { useState } from "react";
import { Menu, X, LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
      setIsMenuOpen(false);
      setIsProfileOpen(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const initials = userProfile?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img
            src={logo}
            alt="Lyfex Logo"
            className="h-[2.5rem] w-[7rem] object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5">
          {user ? (
            <>
              <Link to="/live-sessions" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Live</Link>
              <Link to="/discuss" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Discuss</Link>
              <Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Support</Link>
              <Link to="/pause" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Pause</Link>
              {userProfile?.role === 'CREATE' && (
                <Link to="/earnings" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Earnings</Link>
              )}
            </>
          ) : (
            <>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Explore</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Live</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Community</a>
            </>
          )}
        </nav>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {user && userProfile ? (
            <>
              {/* Dashboard Link */}
              <Link to="/homepage">
                <Button className="gradient-orange text-primary-foreground hover:opacity-90 rounded-full px-6 flex items-center gap-2">
                  <LayoutDashboard size={16} />
                  Dashboard
                </Button>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <Avatar className="w-10 h-10 border-2 border-orange-400/30 cursor-pointer">
                    <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-lg shadow-lg z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-white font-semibold text-sm">{userProfile.fullName}</p>
                      <p className="text-white/60 text-xs">{userProfile.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm"
                    >
                      <UserIcon size={16} />
                      My Profile
                    </Link>
                    <Link
                      to="/homepage"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm border-t border-white/10"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/register">
                <Button className="gradient-orange text-primary-foreground hover:opacity-90 rounded-full px-6">
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button className="gradient-orange text-primary-foreground hover:opacity-90 rounded-full px-6">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/50 py-4 px-4 animate-fade-in">
          <nav className="flex flex-col gap-4 mb-4">
            {user ? (
              <>
                <Link to="/live-sessions" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">Live</Link>
                <Link to="/discuss" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">Discuss</Link>
                <Link to="/support" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">Support</Link>
                <Link to="/pause" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">Pause</Link>
                {userProfile?.role === 'CREATE' && (
                  <Link to="/earnings" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">Earnings</Link>
                )}
              </>
            ) : (
              <>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Explore</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Live</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community</a>
              </>
            )}
          </nav>

          <div className="border-t border-white/10 pt-4">
            {user && userProfile ? (
              <>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                  <Avatar className="w-12 h-12 border-2 border-orange-400/30">
                    <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-semibold text-sm">{userProfile.fullName}</p>
                    <p className="text-white/60 text-xs">{userProfile.email}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-2">
                      <UserIcon size={16} />
                      My Profile
                    </Button>
                  </Link>
                  <Link to="/homepage" onClick={() => setIsMenuOpen(false)}>
                    <Button className="gradient-orange text-primary-foreground hover:opacity-90 w-full flex items-center justify-center gap-2">
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="gradient-orange text-primary-foreground hover:opacity-90 w-full rounded-full">
                    Register
                  </Button>
                </Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="gradient-orange text-primary-foreground hover:opacity-90 w-full rounded-full">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close profile dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
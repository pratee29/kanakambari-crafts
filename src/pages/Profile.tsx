import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const initials = userProfile.fullName
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase();

  const subscriptionDetailsMap: Record<string, { name: string; price: string; description: string; color: string }> = {
    VIEW: {
      name: 'View Access',
      price: 'Free',
      description: 'Perfect for learners who want to observe',
      color: 'from-slate-500 to-slate-600',
    },
    TALK: {
      name: 'Talk Access',
      price: '$9.99/month',
      description: 'Join the conversation and participate',
      color: 'from-orange-400 to-orange-500',
    },
    CREATE: {
      name: 'Create & Contribute',
      price: '$19.99/month',
      description: 'Full access to create and earn',
      color: 'from-pink-500 to-orange-500',
    },
  };

  const subscription = subscriptionDetailsMap[userProfile.subscriptionPlan];

  const profileFields = [
    { label: 'Full Name', value: userProfile.fullName, icon: '👤' },
    { label: 'Email Address', value: userProfile.email, icon: '📧' },
    { label: 'Phone Number', value: userProfile.phone, icon: '📱' },
    { label: 'Address', value: userProfile.address, icon: '📍' },
    { label: 'Interest/Expertise', value: userProfile.interest, icon: '⭐' },
    { label: 'User ID (UID)', value: userProfile.uid, icon: '🔑' },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-hidden py-20 px-4">
      {/* BACKGROUND GRADIENTS */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050B2E] via-[#0f172a] to-[#1a1230]" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-white">Profile</h1>
              <p className="text-white/60 text-sm">View and manage your account details</p>
            </div>
          </div>
        </div>

        {/* PROFILE HEADER CARD */}
        <Card className="backdrop-blur-xl bg-gradient-to-r from-orange-500/10 to-pink-500/10 border-white/10 p-8 mb-8">
          <div className="flex items-end gap-6">
            <Avatar className="w-24 h-24 border-4 border-orange-400/50">
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-1">{userProfile.fullName}</h2>
              <p className="text-white/60 mb-3">{userProfile.email}</p>
              <div className="flex flex-wrap gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${subscription.color} text-white`}>
                  {subscription.name}
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-500/20 text-green-300">
                  Active ✓
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* SUBSCRIPTION DETAILS */}
        <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">Subscription Details</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <p className="text-white/60 text-sm mb-2">Plan</p>
              <p className="text-2xl font-bold text-white">{subscription.name}</p>
              <p className="text-white/60 text-xs mt-2">{subscription.description}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <p className="text-white/60 text-sm mb-2">Price</p>
              <p className="text-2xl font-bold text-orange-400">{subscription.price}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <p className="text-white/60 text-sm mb-2">Status</p>
              <p className="text-2xl font-bold text-green-400">Active</p>
            </div>
          </div>
        </Card>

        {/* ACCOUNT DETAILS */}
        <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-8">
          <h3 className="text-xl font-bold text-white mb-6">Account Details</h3>
          <div className="space-y-4">
            {profileFields.map((field, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{field.icon}</span>
                  <div>
                    <p className="text-white/60 text-sm">{field.label}</p>
                    <p className="text-white font-medium break-all">{field.value}</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleCopy(field.value, field.label)}
                  size="sm"
                  className="bg-white/10 hover:bg-white/20 text-white transition-all ml-4 flex-shrink-0"
                >
                  {copiedField === field.label ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* MEMBER SINCE */}
        <div className="mt-8 text-center text-white/60 text-sm">
          <p>
            Member since{' '}
            {new Date(userProfile.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

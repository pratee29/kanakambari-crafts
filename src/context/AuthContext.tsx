import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  interest: string;
  subscriptionPlan: 'VIEW' | 'TALK' | 'CREATE';
  role: 'VIEW' | 'TALK' | 'CREATE';
  createdAt: string;
}

export interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  
  // Auth functions
  registerWithEmail: (
    email: string,
    password: string,
    userData: Omit<UserProfile, 'uid' | 'createdAt'>
  ) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUserProfile(docSnap.data() as UserProfile);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        await fetchUserProfile(currentUser.uid);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Register with email and password
  const registerWithEmail = async (
    email: string,
    password: string,
    userData: Omit<UserProfile, 'uid' | 'createdAt'>
  ) => {
    try {
      setError(null);
      
      // Validate password
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Create user document in Firestore
      const userDocData: UserProfile = {
        uid: newUser.uid,
        ...userData,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', newUser.uid), userDocData);
      setUserProfile(userDocData);
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    }
  };

  // Sign in with email and password
  const loginWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;
      
      // Fetch user profile
      await fetchUserProfile(currentUser.uid);
    } catch (err: any) {
      const errorMessage = err.code === 'auth/user-not-found'
        ? 'User not found'
        : err.code === 'auth/wrong-password'
        ? 'Incorrect password'
        : err.message || 'Login failed';
      
      setError(errorMessage);
      throw err;
    }
  };

  // Sign in with Google
  const loginWithGoogle = async () => {
    try {
      setError(null);
      
      const result = await signInWithPopup(auth, googleProvider);
      const newUser = result.user;

      // Check if user profile exists
      const docRef = doc(db, 'users', newUser.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Create new user profile for Google sign-in
        const userDocData: UserProfile = {
          uid: newUser.uid,
          fullName: newUser.displayName || 'User',
          email: newUser.email || '',
          phone: '',
          address: '',
          interest: '',
          subscriptionPlan: 'VIEW',
          role: 'VIEW',
          createdAt: new Date().toISOString(),
        };

        await setDoc(docRef, userDocData);
        setUserProfile(userDocData);
      } else {
        setUserProfile(docSnap.data() as UserProfile);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Google login failed';
      setError(errorMessage);
      throw err;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (err: any) {
      const errorMessage = err.message || 'Logout failed';
      setError(errorMessage);
      throw err;
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    error,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

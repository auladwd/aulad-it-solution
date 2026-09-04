'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const token = await firebaseUser.getIdToken();
          const res = await axios.post('/api/auth/login', {
            token,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            image: firebaseUser.photoURL,
            firebaseUid: firebaseUser.uid,
          });
          setDbUser(res.data.user);
        } catch (err) {
          console.error('Error syncing user:', err);
        }
      } else {
        setUser(null);
        setDbUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setDbUser(null);
    } catch (error) {
      throw error;
    }
  };

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'auladdevops@gmail.com';
  const isAdmin = user?.email === ADMIN_EMAIL && dbUser?.role === 'admin' || user?.email === 'auladdevops@gmail.com';

  return (
    <AuthContext.Provider value={{ user, dbUser, loading, loginWithGoogle, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string, username?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has a stored session
    const storedSession = localStorage.getItem('auth_session');
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession);
        setSession(parsed.session);
        setUser(parsed.user);
      } catch (e) {
        console.error('Error parsing stored session:', e);
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName?: string, username?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('external-auth', {
        body: { action: 'signup', email, password, fullName, username },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      const { user, session } = data;
      setUser(user);
      setSession(session);
      localStorage.setItem('auth_session', JSON.stringify({ user, session }));

      toast({
        title: 'Account created!',
        description: 'Welcome to inlingua Dortmund',
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Signup failed',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('external-auth', {
        body: { action: 'login', email, password },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      const { user, session } = data;
      setUser(user);
      setSession(session);
      localStorage.setItem('auth_session', JSON.stringify({ user, session }));

      toast({
        title: 'Welcome back!',
        description: 'Successfully signed in',
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.functions.invoke('external-auth', {
        body: { action: 'logout' },
      });

      if (error) throw error;

      setUser(null);
      setSession(null);
      localStorage.removeItem('auth_session');

      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

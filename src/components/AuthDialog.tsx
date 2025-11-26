import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (isLogin) {
      const { error } = await signIn(email, password);
      if (!error) {
        onOpenChange(false);
        resetForm();
        toast.success('Erfolgreich angemeldet!');
      } else {
        toast.error(error.message || 'Anmeldung fehlgeschlagen');
      }
    } else {
      const { error } = await signUp(email, password, fullName, username);
      if (!error) {
        onOpenChange(false);
        resetForm();
        toast.success('Konto erfolgreich erstellt!');
      } else {
        toast.error(error.message || 'Registrierung fehlgeschlagen');
      }
    }
    setLoading(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setUsername('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] animate-slide-in-up">
        <DialogHeader>
          <DialogTitle className="transition-all duration-300">
            {isLogin ? 'Anmelden' : 'Konto erstellen'}
          </DialogTitle>
        </DialogHeader>
        <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(v) => setIsLogin(v === 'login')} className="transition-all duration-300">
          <TabsList className="grid w-full grid-cols-2 transition-all duration-300">
            <TabsTrigger value="login" className="transition-all duration-200 data-[state=active]:shadow-md">Anmelden</TabsTrigger>
            <TabsTrigger value="signup" className="transition-all duration-200 data-[state=active]:shadow-md">Registrieren</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: '50ms' }}>
                <Label htmlFor="login-email" className="transition-colors duration-200">E-Mail</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="ihre@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  required
                />
              </div>
              <div className="space-y-2 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
                <Label htmlFor="login-password" className="transition-colors duration-200">Passwort</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full transition-all duration-200 gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin-slow" />
                    Wird geladen...
                  </>
                ) : (
                  'Anmelden'
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: '50ms' }}>
                <Label htmlFor="signup-name" className="transition-colors duration-200">Vollständiger Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Max Mustermann"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  required
                />
              </div>
              <div className="space-y-2 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
                <Label htmlFor="signup-username" className="transition-colors duration-200">Benutzername</Label>
                <Input
                  id="signup-username"
                  type="text"
                  placeholder="maxmuster"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  required
                />
              </div>
              <div className="space-y-2 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: '150ms' }}>
                <Label htmlFor="signup-email" className="transition-colors duration-200">E-Mail</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="ihre@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  required
                />
              </div>
              <div className="space-y-2 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
                <Label htmlFor="signup-password" className="transition-colors duration-200">Passwort</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full transition-all duration-200 gap-2 animate-slide-in-up"
                style={{ animationDelay: '250ms' }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin-slow" />
                    Wird geladen...
                  </>
                ) : (
                  'Konto erstellen'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;

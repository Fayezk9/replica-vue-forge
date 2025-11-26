import { useState } from "react";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/AuthDialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { user, signOut } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  
  return (
    <header className="bg-card border-b border-border sticky top-0 z-[100] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {isHomePage ? (
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                <span className="text-background font-bold text-xl">i</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">inlingua</span>
                <span className="text-sm text-muted-foreground">Dortmund</span>
              </div>
            </div>
          ) : (
            <a href="/" className="flex items-center gap-2 cursor-pointer group transition-all duration-300">
              <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                <span className="text-background font-bold text-xl">i</span>
              </div>
              <div className="flex flex-col transition-all duration-300 group-hover:-translate-y-0.5">
                <span className="font-bold text-xl">inlingua</span>
                <span className="text-sm text-muted-foreground">Dortmund</span>
              </div>
            </a>
          )}

          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 transition-colors duration-200">
                  Deutschkurse
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover z-50">
                  <ul className="grid w-[300px] gap-0 p-0">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block px-4 py-3 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground border-b border-border"
                          href="/kurse"
                        >
                          📚 Alle Kurse ansehen
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block px-4 py-3 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground border-b border-border"
                          href="/kurse/a1"
                        >
                          A1 Deutsch-Intensivkurs
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block px-4 py-3 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground border-b border-border"
                          href="/kurse/a2"
                        >
                          A2 Deutsch-Intensivkurs
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block px-4 py-3 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground border-b border-border"
                          href="/kurse/b1"
                        >
                          B1 Deutsch-Intensivkurs
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block px-4 py-3 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground border-b border-border"
                          href="/kurse/b2"
                        >
                          B2 Deutsch-Intensivkurs
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block px-4 py-3 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground"
                          href="/kurse/c1"
                        >
                          C1 Deutsch-Intensivkurs
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 transition-colors duration-200">
                  Prüfungsvorbereitungen
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover z-50 animate-slide-in-down">
                  <ul className="grid w-[300px] gap-0 p-0">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block px-4 py-3 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground border-b border-border"
                          href="/telc-b1"
                        >
                          telc Deutsch B1
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block px-4 py-3 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground border-b border-border"
                          href="/telc-b2"
                        >
                          telc Deutsch B2
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block px-4 py-3 text-sm leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground"
                          href="/telc-c1"
                        >
                          telc Deutsch C1 Hochschule
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 transition-colors duration-200">
                  Integrationskurse
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover animate-slide-in-down">
                  <ul className="grid w-[500px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground"
                          href="#integration"
                        >
                          <div className="text-sm font-medium leading-none">Integrationskurse</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Für EU-Bürger, Neuzuwanderer und mehr
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  href="#kontakt"
                >
                  Kontakt
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 transition-colors duration-200">
                  Über uns
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover z-50 animate-slide-in-down">
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground"
                          href="#ueber"
                        >
                          <div className="text-sm font-medium leading-none">Über uns</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Mehr über inlingua Dortmund
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  href="#warenkorb"
                >
                  🛒 0 Artikel
                </NavigationMenuLink>
              </NavigationMenuItem>

              {user ? (
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Abmelden
                  </Button>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setAuthDialogOpen(true)}
                    className="gap-2"
                  >
                    <User className="w-4 h-4" />
                    Anmelden
                  </Button>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </header>
  );
};

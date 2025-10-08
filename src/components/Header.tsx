import { ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-[100] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
              <span className="text-background font-bold text-xl">i</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl">inlingua</span>
              <span className="text-sm text-muted-foreground">Dortmund</span>
            </div>
          </a>

          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Intensivkurse A1-C1
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover">
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#termine"
                        >
                          <div className="text-sm font-medium leading-none">Termine und Preise</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Schnell und einfach anmelden
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  telc Prüfungen
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover">
                  <ul className="grid w-[300px] gap-0 p-0">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block px-4 py-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground border-b border-border"
                          href="/telc-b1"
                        >
                          telc B1 Prüfung (allgemein)
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block px-4 py-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground border-b border-border"
                          href="/telc-b2"
                        >
                          telc B2 Prüfung (allgemein)
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block px-4 py-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/telc-c1"
                        >
                          telc C1 Hochschule Prüfung
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Integrationskurse
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover">
                  <ul className="grid w-[500px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent">
                  Über uns
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover z-50">
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

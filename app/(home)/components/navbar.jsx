import { NavOptions } from './navoptions';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function NavBar() {
  return (
    <>
      <nav className="w-full title border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/Logo.png"
                width={80}
                height={80}
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <div className="flex flex-row justify-between w-auto gap-2">
              <div className="hidden md:block">
                <NavOptions />
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="default">Inicia Sesion</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Registrate</Button>
                </Link>
              </div>
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only text-white">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-6 pt-6">
                    <div className="flex flex-col gap-3">
                      <NavOptions className="flex flex-col items-start gap-4" />
                    </div>
                    <div className="flex flex-col gap-2 mt-auto">
                      <Link href="/login">
                        <Button
                          variant="default"
                          className="w-full justify-start"
                        >
                          Inicia Sesion
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button
                          variant="default"
                          className="w-full justify-start"
                        >
                          Registrate
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

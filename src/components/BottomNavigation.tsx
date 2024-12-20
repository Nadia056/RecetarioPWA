import { Home, Search, Trophy, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full border-t bg-background z-10">
      <div className="flex justify-around p-2">
        <a href='/home'>
          <Button variant="ghost" className="flex flex-col h-auto py-2 bg-white">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">Inicio</span>
          </Button>
        </a>
        <a href='/explorar'>
          <Button variant="ghost" className="flex flex-col h-auto py-2 bg-white">
            <Search className="h-5 w-5 mb-1" />
            <span className="text-xs">Explorar</span>
          </Button>
        </a>
        <a href='/top'>
          <Button variant="ghost" className="flex flex-col h-auto py-2 bg-white">
            <Trophy className="h-5 w-5 mb-1" />
            <span className="text-xs">Top</span>
          </Button>
        </a>
        <a href='/perfil'>
          <Button variant="ghost" className="flex flex-col h-auto py-2 bg-white">
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Perfil</span>
          </Button>
        </a>
      </div>
    </nav>
  );
}

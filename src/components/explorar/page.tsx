import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import CategoryButton from "../CategoryButton";
import BottomNav from "../BottomNavigation";
import imagen from "../../images/chef_icon.png";

export default function ExplorePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Explorar Recetas</h1>
      </header>

      <main className="flex-1 overflow-auto pb-16">
        {/* Se añadió padding-bottom para evitar que el contenido quede detrás del BottomNav */}
        <div className="p-4 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar recetas" className="pl-9" />
          </div>

          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 p-1">
              <CategoryButton icon="plate" label="Todas" />
              <CategoryButton icon="search" label="Cocina" />
              <CategoryButton icon="cake" label="Repostería" />
              <CategoryButton icon="cocktail" label="Cócteles" />
              <CategoryButton icon="salad" label="Saludable" />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <section>
            <h2 className="text-xl font-semibold mb-4">Todas las Recetas</h2>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="border-none">
                  <CardContent className="p-0">
                    <img
                      src={imagen}
                      alt={`Receta ${i + 1}`}
                      width={200}
                      height={200}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <h3 className="font-medium mt-2 px-2">Receta {i + 1}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* BottomNav fijo al final de la pantalla */}
      <BottomNav />
    </div>
  );
}

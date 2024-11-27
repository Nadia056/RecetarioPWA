import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import CategoryButton from "@/components/CategoryButton"
import BottomNav from "@/components/BottomNavigation"
import imagen from "../images/chef_icon.png"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b ">
        <h1 className="text-xl font-bold">RecetApp</h1>
        <Button variant="ghost" size="icon" className='bg-white'>+</Button>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar recetas" className="pl-9" />
          </div>

          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 p-1">
              <CategoryButton icon="plate" label="Todas" />
              <CategoryButton icon="search" label="Cocina" />
              <CategoryButton icon="cake" label="Reposteria" />
              <CategoryButton icon="cocktail" label="Cócteles" />
              <CategoryButton icon="salad" label="Saludable" />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <section>
            <h2 className="text-xl font-semibold mb-4">Recetas Destacadas</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-none">
                <CardContent className="p-0">
                  <img 
                  src={imagen}
                  width={200}
                  height={200}
                  className="w-full aspect-square object-cover rounded-lg"
                  />
                 
                  <h3 className="font-medium mt-2 px-2">Pasta Carbonara</h3>
                </CardContent>
              </Card>
              <Card className="border-none">
                <CardContent className="p-0">
                <img 
                  src={imagen}
                  width={200}
                  height={200}
                  className="w-full aspect-square object-cover rounded-lg"
                  />
                  <h3 className="font-medium mt-2 px-2">Tarta de Manzana</h3>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}


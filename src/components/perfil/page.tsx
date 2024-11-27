import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BottomNav from "../BottomNavigation"
import imagen from "../../images/chef_icon.png";
import { Settings, BookOpen } from 'lucide-react'

export default function PerfilPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Mi Perfil</h1>
        <a href="/perfil/update">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        </a>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={imagen}
              alt="Foto de perfil"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">Nombre de Usuario</h2>
              <p className="text-sm text-muted-foreground">@usuario</p>
            </div>
          </div>

          <Tabs defaultValue="mis-recetas">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mis-recetas">Mis Recetas</TabsTrigger>
              <TabsTrigger value="guardadas">Guardadas</TabsTrigger>
            </TabsList>
            <TabsContent value="mis-recetas">
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="border-none">
                    <CardContent className="p-0">
                      <img
                        src={imagen}
                        alt={`Mi Receta ${i + 1}`}
                        width={200}
                        height={200}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <h3 className="font-medium mt-2 px-2">Mi Receta {i + 1}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="guardadas">
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="border-none">
                    <CardContent className="p-0">
                      <img
                        src={imagen}
                        alt={`Receta Guardada ${i + 1}`}
                        width={200}
                        height={200}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <h3 className="font-medium mt-2 px-2">Receta Guardada {i + 1}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Button className="w-full flex items-center justify-center" variant="outline">
            <BookOpen className="mr-2 h-4 w-4" />
            Ver Libro de Recetas
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}


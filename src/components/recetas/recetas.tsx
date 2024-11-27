
import { ArrowLeft, Clock, Users, Bookmark, Star, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function RecetaDetalle() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="relative">
        <img
          src="/placeholder.svg"
          alt="Imagen de la receta"
          width={500}
          height={300}
          className="w-full h-64 object-cover"
        />
        <a href="/home" className="absolute top-4 left-4">
          <Button variant="ghost" size="icon" className="bg-background/50 backdrop-blur-sm">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </a>
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm">
          <Bookmark className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-2">Nombre de la Receta</h1>
        
        <div className="flex items-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-sm text-muted-foreground">(4.8 - 120 reseñas)</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">30 min</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">4 porciones</span>
          </div>
        </div>

        <Tabs defaultValue="ingredientes" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ingredientes">Ingredientes</TabsTrigger>
            <TabsTrigger value="preparacion">Preparación</TabsTrigger>
            <TabsTrigger value="comentarios">Comentarios</TabsTrigger>
          </TabsList>
          <TabsContent value="ingredientes">
            <Card>
              <CardContent className="p-4">
                <ul className="list-disc list-inside space-y-1">
                  <li>Ingrediente 1</li>
                  <li>Ingrediente 2</li>
                  <li>Ingrediente 3</li>
                  <li>Ingrediente 4</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preparacion">
            <Card>
              <CardContent className="p-4">
                <ol className="list-decimal list-inside space-y-2">
                  <li>Paso 1 de la preparación</li>
                  <li>Paso 2 de la preparación</li>
                  <li>Paso 3 de la preparación</li>
                  <li>Paso 4 de la preparación</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comentarios">
            <Card>
              <CardContent className="p-4 space-y-4">
                {[1, 2, 3].map((comment) => (
                  <div key={comment} className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${comment}`} />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Usuario {comment}</p>
                      <p className="text-sm text-muted-foreground">¡Excelente receta! La preparé para mi familia y les encantó.</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button className="w-full">
          <MessageCircle className="mr-2 h-4 w-4" /> Añadir Comentario
        </Button>
      </main>
    </div>
  )
}


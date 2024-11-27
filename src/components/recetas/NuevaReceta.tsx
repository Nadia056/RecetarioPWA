import { ArrowLeft, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function NuevaReceta() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <a href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </a>
        <h1 className="text-xl font-bold">Nueva Receta</h1>
        <Button>Publicar</Button>
      </header>

      <main className="flex-1 p-6">
        <form className="space-y-6">
          <div>
            <label htmlFor="imagen" className="block text-sm font-medium mb-2">
              Imagen de la Receta
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Input id="imagen" type="file" accept="image/*" className="hidden" />
              <label htmlFor="imagen" className="cursor-pointer">
                <Plus className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Añadir imagen de la receta
                </span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="nombre" className="block text-sm font-medium mb-2">
              Nombre de la Receta
            </label>
            <Input id="nombre" placeholder="Ej: Pasta Carbonara" />
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium mb-2">
              Descripción
            </label>
            <Textarea id="descripcion" placeholder="Breve descripción de la receta" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="tiempo" className="block text-sm font-medium mb-2">
                Tiempo de Preparación
              </label>
              <div className="flex items-center">
                <Input id="tiempo" type="number" placeholder="30" className="mr-2" />
                <Select defaultValue="minutos">
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutos">minutos</SelectItem>
                    <SelectItem value="horas">horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
           
          </div>
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium mb-2">
              Categoría
            </label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desayuno">Desayuno</SelectItem>
                <SelectItem value="almuerzo">Almuerzo</SelectItem>
                <SelectItem value="cena">Cena</SelectItem>
                <SelectItem value="postre">Postre</SelectItem>
                <SelectItem value="bebida">Bebida</SelectItem>
              </SelectContent>
            </Select>
          </div>

          
        </form>
      </main>
    </div>
  )
}


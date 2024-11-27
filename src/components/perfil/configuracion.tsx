import { ArrowLeft, Camera } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import imagen from "../../images/chef_icon.png";
export default function EditarPerfil() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <a href="/perfil">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </a>
        <h1 className="text-xl font-bold">Editar Perfil</h1>
   
      </header>

      <main className="flex-1 p-6">
        <form className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={imagen}
                alt="Foto de perfil"
                width={100}
                height={100}
                className="rounded-full"
              />
              <Button size="icon" className="absolute bottom-0 right-0 rounded-full">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <label htmlFor="nombre" className="block text-sm font-medium mb-2">
              Nombre
            </label>
            <Input id="nombre" placeholder="Tu nombre" />
          </div>

          <div>
            <label htmlFor="usuario" className="block text-sm font-medium mb-2">
              Nombre de Usuario
            </label>
            <Input id="usuario" placeholder="@usuario" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Correo Electrónico
            </label>
            <Input id="email" type="email" placeholder="tu@email.com" />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-2">
              Biografía
            </label>
            <Textarea id="bio" placeholder="Cuéntanos sobre ti..." />
          </div>
          <Button>Guardar</Button>
        </form>
      </main>
    </div>
  )
}


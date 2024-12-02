import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BottomNav from "../BottomNavigation"
import imagen from "../../images/chef_icon.png"
import { Settings } from "lucide-react"

interface Receta {
  id: number
  titulo: string
  descripcion: string
  imagen?: string
  puntuacionMedia: number
}

interface User {
  id: number
  nombre: string
  email: string
  biografia: string | null
  imagen: string | null
}

export default function PerfilPage() {
  const [recetasGuardadas, setRecetasGuardadas] = useState<Receta[]>([])
  const [misRecetas, setMisRecetas] = useState<Receta[]>([])
  const [user, setUser] = useState<User | null>(null)  // Added state for user info
  const apiUrl = import.meta.env.VITE_API_URL
  const token = localStorage.getItem("authToken")

  // Obtener las recetas guardadas y los datos del usuario desde la API
  useEffect(() => {
    const fetchRecetasGuardadas = async () => {
      try {
        const response = await fetch(`${apiUrl}/recetas/liked`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        const result = await response.json()

        if (response.ok && result.status === 200) {
          setRecetasGuardadas(result.data.recetas)
        } else {
          console.error("Error al obtener las recetas guardadas:", result.msg)
        }
      } catch (error) {
        console.error("Error en la solicitud:", error)
      }
    }

    const fetchMisRecetas = async () => {
      try {
        const response = await fetch(`${apiUrl}/recetas/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        const result = await response.json()

        if (response.ok && result.status === 200) {
          setMisRecetas(result.data.recetas)
        } else {
          console.error("Error al obtener mis recetas:", result.msg)
        }
      } catch (error) {
        console.error("Error en la solicitud:", error)
      }
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/authUser`, {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        const result = await response.json()

        if (response.ok && result.status === 200) {
          setUser(result.data.user)
        } else {
          console.error("Error al obtener los datos del usuario:", result.msg)
        }
      } catch (error) {
        console.error("Error en la solicitud:", error)
      }
    }

    fetchRecetasGuardadas()
    fetchMisRecetas()
    fetchUserData()  // Fetch user data
  }, [apiUrl, token])

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
              <h2 className="text-xl font-semibold">{user?.nombre || "Nombre de Usuario"}</h2>
              <p className="text-sm text-muted-foreground">{user?.email || "@usuario"}</p>
              <p className="text-sm">{user?.biografia || "Biografía del usuario"}</p>
            </div>
          </div>

          <Tabs defaultValue="mis-recetas">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mis-recetas">Mis Recetas</TabsTrigger>
              <TabsTrigger value="guardadas">Guardadas</TabsTrigger>
            </TabsList>
            <TabsContent value="mis-recetas">
              <div className="grid grid-cols-2 gap-4 mt-4">
                {misRecetas.length > 0 ? (
                  misRecetas.map((receta) => (
                  <a href={`/editarReceta/${receta.id}`} key={receta.id}>  
                    <Card key={receta.id} className="border-none">
                      <CardContent className="p-0">
                        <img
                          src={`${import.meta.env.BASE_URL}images/${receta.imagen}`} 
                          alt={`Mi Receta ${receta.titulo}`}
                          width={200}
                          height={200}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <h3 className="font-medium mt-2 px-2">{receta.titulo}</h3>
                      </CardContent>
                    </Card>
                    </a>
                  ))
                ) : (
                  <p>No tienes recetas.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="guardadas">
              <div className="grid grid-cols-2 gap-4 mt-4">
                {recetasGuardadas.length > 0 ? (
                  recetasGuardadas.map((receta) => (
                    <Card key={receta.id} className="border-none">
                      <CardContent className="p-0">
                        <img
                          src={`${import.meta.env.BASE_URL}images/${receta.imagen}`} 
                          alt={`Receta Guardada ${receta.titulo}`}
                          width={200}
                          height={200}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <h3 className="font-medium mt-2 px-2">{receta.titulo}</h3>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No tienes recetas guardadas.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

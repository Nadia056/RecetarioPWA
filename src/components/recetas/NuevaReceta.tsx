import { useEffect, useState } from "react"
import { ArrowLeft, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Swal from "sweetalert2"

export default function NuevaReceta() {
  interface Categoria {
    id: number;
    nombre: string;
  }

  const [categorias, setCategorias] = useState<Categoria[]>([]) // Estado para las categorías
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [tiempo, setTiempo] = useState("")
  const [imagen, setImagen] = useState<File | null>(null)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
  const [dificultadSeleccionada, setDificultadSeleccionada] = useState("")
  const [usuarioId, setUsuarioId] = useState<number | null>(null) 
  const token = localStorage.getItem("authToken") // Obtener el token de autenticación
  const apiUrl = import.meta.env.VITE_API_URL

  // Cargar las categorías al montar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${apiUrl}/categorias`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()

        if (response.ok) {
          setCategorias(data.data.categorias) // Asignar las categorías obtenidas
        } else {
          console.error("Error al cargar las categorías:", data.msg)
        }
      } catch (error) {
        console.error("Error en la solicitud:", error)
      }
    }

    fetchCategorias()
    fetchUsuarioId()
  }, [apiUrl, token])

  // Manejar el cambio de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagen(file)
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  const fetchUsuarioId = async () => {
    try {
      const response = await fetch(`${apiUrl}/authUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()

      if (response.ok) {
        setUsuarioId(data.data.user.id) // Asignar el ID del usuario autenticado
      } else {
        console.error("Error al obtener el usuario:", data.msg)
      }
    } catch (error) {
      console.error("Error en la solicitud:", error)
    }
  }

// Subir la imagen y devolver el nombre del archivo
const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append("imagen", file)

  try {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    })
    const result = await response.json()

    if (response.ok) {
      // Retornar el `imageUrl` que contiene la URL del archivo subido
      return result.imageUrl; // Aquí se usa la URL de la imagen subida
    } else {
      console.error('Error al subir la imagen:', result.message);
      return null;
    }
  } catch (error) {
    console.error('Error en la carga de la imagen:', error);
    return null;
  }
}


// Enviar los datos del formulario
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  // Subir la imagen primero
  let imageName = null
  if (imagen) {
    imageName = await uploadImage(imagen)  // Obtener el nombre del archivo
  }

  const formData = new FormData()
  formData.append("titulo", titulo)
  formData.append("descripcion", descripcion)
  formData.append("tiempo_preparacion", tiempo)
  formData.append("categoria_id", categoriaSeleccionada)
  formData.append("dificultad", dificultadSeleccionada)
  if (usuarioId !== null) {
    formData.append("usuario_id", usuarioId.toString())
  } else {
    console.error("Usuario ID is null")
    return
  }
  formData.append("fecha_publicacion", new Date().toISOString().split('T')[0]) // Fecha de publicación de hoy
  if (imageName) {
    formData.append("imagen", imageName)
  }
  console.log("Datos del formulario:")
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  try {
    const response = await fetch(`${apiUrl}/recetas`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    const result = await response.json()

    if (response.ok && result.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Receta publicada",
        text: "Tu receta ha sido publicada correctamente",
        showConfirmButton: false,
        timer: 1500,
      })
      // Limpiar el formulario
      setTitulo("")
      setDescripcion("")
      setTiempo("")
      setCategoriaSeleccionada("")
      setDificultadSeleccionada("")
      setImagen(null)
      setPreviewUrl(null)

    } else {
      console.error("Error al publicar receta:", result.msg)
    }
  } catch (error) {
    console.error("Error en la solicitud:", error)
  }
}


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <a href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </a>
        <h1 className="text-xl font-bold">Nueva Receta</h1>
        <Button onClick={handleSubmit}>Publicar</Button>
      </header>

      <main className="flex-1 p-6">
        <form className="space-y-6">
          <div>
            <label htmlFor="imagen" className="block text-sm font-medium mb-2">
              Imagen de la Receta
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  className="mx-auto h-32 w-32 object-cover rounded-lg"
                />
              ) : (
                <>
                  <Input
                    id="imagen"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="imagen" className="cursor-pointer">
                    <Plus className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Añadir imagen de la receta
                    </span>
                  </label>
                </>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="nombre" className="block text-sm font-medium mb-2">
              Nombre de la Receta
            </label>
            <Input 
              id="nombre" 
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)} 
              placeholder="Ej: Pasta Carbonara" 
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium mb-2">
              Descripción
            </label>
            <Textarea 
              id="descripcion" 
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)} 
              placeholder="Breve descripción de la receta" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="tiempo" className="block text-sm font-medium mb-2">
                Tiempo de Preparación
              </label>
              <div className="flex items-center">
                <Input 
                  id="tiempo" 
                  type="number" 
                  value={tiempo} 
                  onChange={(e) => setTiempo(e.target.value)} 
                  placeholder="30" 
                  className="mr-2" 
                />
                <Select value="minutos">
                  <SelectTrigger>
                    <SelectValue>minutos</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutos">minutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="categoria" className="block text-sm font-medium mb-2">
                Categoría
              </label>
              <Select
                value={categoriaSeleccionada}
                onValueChange={setCategoriaSeleccionada}
              >
                <SelectTrigger>
                  <SelectValue>{categoriaSeleccionada || "Seleccionar"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categorias.map(categoria => (
                    <SelectItem key={categoria.id} value={categoria.id.toString()}>
                      {categoria.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label htmlFor="dificultad" className="block text-sm font-medium mb-2">
              Dificultad
            </label>
            <Select value={dificultadSeleccionada} onValueChange={setDificultadSeleccionada}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona la dificultad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facil">Fácil</SelectItem>
                <SelectItem value="medio">Medio</SelectItem>
                <SelectItem value="dificil">Difícil</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </main>
    </div>
  )
}

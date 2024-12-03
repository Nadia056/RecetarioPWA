import { useEffect, useState } from "react"
import { ArrowLeft, Camera } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function EditarPerfil() {
  const [user, setUser] = useState({
    nombre: "",
    biografia: "",
    imagen: "",
    email: "",
  })
  const [nombre, setNombre] = useState("")
  const [biografia, setBiografia] = useState("")
  const [imagen, setImagenPerfil] = useState<File | null>(null)
  const [imagenPreview, setImagenPreview] = useState<string | null>(null)

  const apiUrl = import.meta.env.VITE_API_URL
  const token = localStorage.getItem("authToken")

  // Cargar los datos del usuario al montar el componente
  useEffect(() => {
    const fetchUser = async () => {
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
          const userData = data.data.user
          setUser(userData)
          setNombre(userData.nombre)
          setBiografia(userData.biografia || "")
          setImagenPreview(userData.imagen ? `${apiUrl}/images/${userData.imagen}` : "/images/default_avatar.png")
        } else {
          console.error("Error al cargar los datos del usuario:", data.msg)
        }
      } catch (error) {
        console.error("Error en la solicitud:", error)
      }
    }

    fetchUser()
  }, [apiUrl, token])

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagenPerfil(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagenPreview(reader.result as string)  // Actualizar la vista previa de la imagen
      }
      reader.readAsDataURL(file)  // Leer el archivo de imagen y actualizar el estado
    }
  }

  const generateImageName = (file: File) => {
    const fileExtension = file.name.split(".").pop()
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExtension}`
    return uniqueName
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let imageName = null
    if (imagen) {
      imageName = await uploadImage(imagen)  // Obtener el nombre del archivo
    }

    const formData = new FormData()
    formData.append("nombre", nombre)
    formData.append("biografia", biografia)

    if (imagen) {
      const uniqueImageName = generateImageName(imagen)
      formData.append("imagen", imagen, uniqueImageName)
    }
    if (imageName) {
      formData.append("imagen", imageName)
    }
  
  console.log("Datos del formulario:")
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }



  try {
    const response = await fetch(`${apiUrl}/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    const result = await response.json()

    if (response.ok && result.status === 200) {
      setUser(result.data.user)
    } else {
      console.error("Error al actualizar usuario:", result.msg)
    }
  } catch (error) {
    console.error("Error en la solicitud:", error)
  }
}

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
      <form
        className="space-y-6 mx-auto w-full max-w-4xl sm:max-w-xl lg:max-w-2xl xl:max-w-4xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}public${user.imagen}` || imagenPreview || undefined}
              alt="Foto de perfil"
              width={100}
              height={100}
              className="rounded-full"
            />
            <Button size="icon" className="absolute bottom-0 right-0 rounded-full">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Camera className="h-4 w-4" />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </Button>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Correo Electrónico
          </label>
          <Input
            id="email"
            value={user.email}
            readOnly
            className="bg-gray-200"
          />
        </div>

        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-2">
            Nombre
          </label>
          <Input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-2">
            Biografía
          </label>
          <Textarea
            id="bio"
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
            placeholder="Cuéntanos sobre ti..."
          />
        </div>

        <Button type="submit">Guardar</Button>
      </form>
    </main>
  </div>
)
}

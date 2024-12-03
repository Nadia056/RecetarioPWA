import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function EditarReceta() {
  interface Categoria {
    id: number;
    nombre: string;
  }

  const { id } = useParams<{ id: string }>();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [imagen, setImagen] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [dificultadSeleccionada, setDificultadSeleccionada] = useState("");
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchReceta();
    fetchCategorias();
    fetchUsuarioId();
  }, [apiUrl, id, token]);

  const fetchReceta = async () => {
    try {
      const response = await fetch(`${apiUrl}/recetas/show/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        const receta = data.data.receta;
        setTitulo(receta.titulo);
        setDescripcion(receta.descripcion);
        setTiempo(receta.tiempo_preparacion.toString());
        setCategoriaSeleccionada(receta.categoria_id.toString());
        setDificultadSeleccionada(receta.dificultad);
        setUsuarioId(receta.usuario_id);
        setImagen(receta.imagen); // Asigna la imagen existente
        setPreviewUrl(receta.imagen ? `${apiUrl}/uploads/${receta.imagen}` : null); // Establece la URL de la imagen para la vista previa
      } else {
        console.error("Error al cargar receta:", data.msg);
      }
    } catch (error) {
      console.error("Error al obtener la receta:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${apiUrl}/categorias`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCategorias(data.data.categorias);
      } else {
        console.error("Error al cargar categorías:", data.msg);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
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
  };
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
    const file = e.target.files?.[0];
    if (file) {
      setImagen(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Subir la imagen primero
    let imageName = null
    if (imagen) {
      imageName = await uploadImage(imagen)  // Obtener el nombre del archivo
    }
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("tiempo_preparacion", parseInt(tiempo, 10).toString());
    formData.append("categoria_id", categoriaSeleccionada);
    formData.append("dificultad", dificultadSeleccionada);
    formData.append("fecha_publicacion", new Date().toISOString().split('T')[0]); // Fecha de publicación de hoy

    if (usuarioId !== null) {
      formData.append("usuario_id", usuarioId.toString());
    } else {
      console.error("Usuario ID is null");
      return;
    }
    if (imageName) {
      formData.append("imagen", imageName)
    }

    try {
      const response = await fetch(`${apiUrl}/recetas/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();

      if (response.ok && result.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Receta actualizada",
          text: "Tu receta ha sido actualizada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        
      } else {
        console.error("Error al actualizar receta:", result.msg);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <a href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </a>
        <h1 className="text-xl font-bold">Editar Receta</h1>
        <Button onClick={handleSubmit} className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2'>Actualizar</Button>
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
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hidden"
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
              placeholder="Descripción de la receta"
            />
          </div>

          <div>
            <label htmlFor="tiempo" className="block text-sm font-medium mb-2">
              Tiempo de preparación (minutos)
            </label>
            <Input
              id="tiempo"
              type="number"
              value={tiempo}
              onChange={(e) => setTiempo(e.target.value)}
              placeholder="Ej: 30"
            />
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
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria.id} value={categoria.id.toString()}>
                    {categoria.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="dificultad" className="block text-sm font-medium mb-2">
              Dificultad
            </label>
            <Select
              value={dificultadSeleccionada}
              onValueChange={setDificultadSeleccionada}
            >
              <SelectTrigger>
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
  );
}

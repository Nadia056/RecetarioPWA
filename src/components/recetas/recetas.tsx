import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Clock, Star, MessageCircle, Activity, ArrowRight, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Swal from "sweetalert2";

export default function RecetaDetalle() {
  const { id } = useParams(); // Obtiene el ID desde la URL
  interface Receta {
    imagen: string;
    titulo: string;
    puntuacionMedia: number;
    tiempoPreparacion: number;
    descripcion: string,

    dificultad: string;
    comentarios: {
      id: number;
      usuarioId: number;
      usuario: {
        nombre: string;
      };
      contenido: string;
    }[]

    ;
  }

  const [receta, setReceta] = useState<Receta | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [meGusta, setHasLiked] = useState<boolean>(false);
  const [comment, setComment] = useState("");

  const handleSendRating = async () => {
    if (selectedRating === 0) {
      alert("Por favor, selecciona una calificación antes de enviarla.");
      return;
    }

    const token = localStorage.getItem("authToken");
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}/valoraciones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receta_id: id, // ID de la receta desde useParams
          puntuacion: selectedRating,
        }),
      });

      const data = await response.json();

      if (response.ok) {

        Swal.fire({
          title: "Valoración enviada",
          text: "Tu valoración ha sido enviada exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

      } else {
        console.error(data.msg);
        Swal.fire({
          title: "Error",
          text: data.msg || "Error al enviar la valoración.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al enviar la valoración:", error);
      alert("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
      fetchReceta();
    }
  };


  const comentarioSubmit = async () => {
    const token = localStorage.getItem("authToken");
    const apiUrl = import.meta.env.VITE_API_URL;


    const response = await fetch(`${apiUrl}/comentarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        receta_id: id,
        contenido: comment,
      }),

    });

    if (response.ok) {
      Swal.fire({
        title: "Comentario enviado",
        text: "Tu comentario ha sido enviado exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

    }
    else {
      Swal.fire({
        title: "Error",
        text: "Error al enviar el comentario",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    setComment("");
    fetchReceta();
   
  };
  const handleLike = async () => {
    const token = localStorage.getItem("authToken");
    const apiUrl = import.meta.env.VITE_API_URL;


    try {
      setLoading(true);

      // Realiza la solicitud para alternar el "like"
      const response = await fetch(`${apiUrl}/recetas/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });


      if (response.status === 200) {
        const data = await response.json();

        setHasLiked(!meGusta);

        Swal.fire({
          title: data.msg || "Acción realizada",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        const errorData = await response.json();
        console.error(errorData.msg || "Error al procesar la acción");
        Swal.fire({
          title: "Error",
          text: errorData.msg || "No se pudo procesar tu acción.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      Swal.fire({
        title: "Error",
        text: "Error al conectar con el servidor.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };
  const formatTiempoPreparacion = (minutos: number) => {
    if (minutos >= 60) {
      const horas = Math.floor(minutos / 60);
      const minutosRestantes = minutos % 60;
      return `${horas}h ${minutosRestantes}min`;
    }
    return `${minutos} min`;
  };

  

  const fetchReceta = async () => {
    const token = localStorage.getItem("authToken");
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiUrl}/recetas/show/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        setHasLiked(data.data.meGusta);
        setReceta(data.data.receta);
      } else {
        console.error(data.msg);
      }
    } catch (error) {
      console.error("Error al obtener la receta:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  
    fetchReceta();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  if (!receta) {
    return <div className="flex items-center justify-center h-screen">Receta no encontrada</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="relative">
        <img
          src={`${import.meta.env.BASE_URL}public${receta.imagen}`}
          alt={`Imagen de la receta ${receta.titulo}`}
          width={500}
          height={300}
          className="w-full h-64 object-cover"
        />
        <a href="/home" className="absolute top-4 left-4">
          <Button variant="ghost" size="icon" className="bg-background/50 backdrop-blur-sm ">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </a>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm"
          onClick={handleLike}
          disabled={loading}
        >
          <Heart
            className={`h-6 w-6 transition-colors ${meGusta ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
          />
        </Button>


      </header>

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-2">{receta.titulo}</h1>

        <div className="flex items-center space-x-2 mb-4">
          {/* Renderizado de estrellas */}
          {[...Array(5)].map((_, index) => {
            const isFull = index < Math.floor(receta.puntuacionMedia); // Estrella llena
            const isHalf = !isFull && index < receta.puntuacionMedia;  // Media estrella

            return (
              <div key={index} className="relative inline-block h-5 w-5">
                {/* Estrella vacía */}
                <Star className="absolute top-0 left-0 h-5 w-5 text-gray-400" />
                {/* Estrella llena o parcial */}
                {isFull || isHalf ? (
                  <Star
                    className="absolute top-0 left-0 h-5 w-5 fill-yellow-400 text-yellow-400"
                    style={isHalf ? { clipPath: 'inset(0 50% 0 0)' } : undefined} // Para la media estrella
                  />
                ) : null}
              </div>
            );
          })}

          {/* Puntuación numérica */}
          <span className="text-sm text-muted-foreground">
            ({receta.puntuacionMedia ? receta.puntuacionMedia.toFixed(1) : "N/A"} / 5)
          </span>
        </div>



        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {formatTiempoPreparacion(receta.tiempoPreparacion)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground uppercase">{receta.dificultad}</span>
          </div>
        </div>

        <Tabs defaultValue="preparacion" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preparacion">Preparacion</TabsTrigger>
            <TabsTrigger value="comentarios">Comentarios</TabsTrigger>
            <TabsTrigger value="valorar">Valoracion</TabsTrigger>
          </TabsList>
          <TabsContent value="preparacion">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2">Descripcion</h2>
                <p>{receta.descripcion}</p>

              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comentarios">
            <Card>
              <CardContent className="p-4 space-y-4">
                {receta.comentarios && receta.comentarios.length > 0 ? (
                  receta.comentarios.map((comentario) => (
                    <div key={comentario.id} className="flex space-x-4">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${comentario.usuarioId}`} />
                        <AvatarFallback>UN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{comentario.usuario.nombre}</p>
                        <p className="text-sm text-muted-foreground">{comentario.contenido}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No hay comentarios disponibles.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="valorar">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2">Valorar</h2>

                <div className="flex items-center space-x-2">
                  {/* Renderizado de estrellas seleccionables */}
                  {[...Array(5)].map((_, index) => {
                    const isFull = index < selectedRating; // Estrella llena
                    return (
                      <div
                        key={index}
                        className="relative inline-block h-5 w-5 cursor-pointer"
                        onClick={() => setSelectedRating(index + 1)} // Actualizar calificación
                      >
                        {/* Estrella vacía */}
                        <Star className="absolute top-0 left-0 h-5 w-5 text-gray-400" />
                        {/* Estrella llena */}
                        {isFull && (
                          <Star className="absolute top-0 left-0 h-5 w-5 fill-yellow-400 text-yellow-400" />
                        )}
                      </div>
                    );
                  })}
                  {/* Botón para enviar calificación */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={handleSendRating}
                    disabled={loading}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>



        </Tabs>

        <form
           onSubmit={(e) => {
            e.preventDefault(); 
            comentarioSubmit(); 
          }}
          className="flex flex-col w-full max-w-md p-6 border rounded shadow-sm bg-white"
        >
          <textarea
            className="w-full p-2 mb-4 border rounded resize-none focus:outline-none focus:ring focus:border-blue-300 bg-gray-50"
            rows={6}
            placeholder="Escribe tu comentario aquí..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <Button type="submit" className="w-full">
            <MessageCircle className="mr-2 h-4 w-4" /> Enviar Comentario
          </Button>
        </form>
      </main>
    </div>
  );
}

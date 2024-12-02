import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BottomNav from "@/components/BottomNavigation";

export default function Home() {
  interface Receta {
    id: number;
    titulo: string;
    imagen?: string;
  }

  const [recetas, setRecetas] = useState<Receta[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Función para obtener recetas desde la API
  useEffect(() => {
    const fetchRecetas = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(`${apiUrl}/recetas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok && result.status === 200) {
          setRecetas(result.data.recetas); // Asegúrate de que la API retorna un campo `recetas`
          
        } else {
          console.error("Error al obtener recetas:", result.msg);
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    fetchRecetas();
  }, [apiUrl]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">RecetApp</h1>
        <a href="/recetaNueva">
          <Button variant="ghost" size="icon" className="bg-white">
            +
          </Button>
        </a>
      </header>

      <main className="flex-1 overflow-auto pb-16">
        {/* Se añadió padding-bottom para evitar que el contenido se oculte detrás del BottomNav */}
        <div className="p-4 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Recetas Destacadas</h2>
            <div className="grid grid-cols-2 gap-4">
              {recetas.length > 0 ? (
                recetas.map((receta) => (
                  <a key={receta.id} href={`/receta/${receta.id}`}>
                    <Card className="border-none">
                      <CardContent className="p-0">
                        <img
                          src={`${import.meta.env.BASE_URL}images/${receta.imagen}`} 
                          alt={receta.imagen}
                          width={200}
                          height={200}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <h3 className="font-medium mt-2 px-2">
                          {receta.titulo}
                        </h3>
                      </CardContent>
                    </Card>
                  </a>
                ))
              ) : (
                <p>No hay recetas disponibles.</p>
              )}
            </div>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

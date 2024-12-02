import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import BottomNav from "../BottomNavigation";
import imagen from "../../images/chef_icon.png"

interface Receta {
  id: number;
  titulo: string;
  descripcion: string;
  imagen?: string;
  puntuacionMedia: number;
}

export default function TopPage() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("authToken");

  // Obtener las recetas más populares desde la API
  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const response = await fetch(`${apiUrl}/recetas/top`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
       
        const result = await response.json();

        if (response.ok && result.status === 200) {
          setRecetas(result.data.recetas);
        } else {
          console.error("Error al obtener las recetas:", result.msg);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchRecetas();
  }, [apiUrl]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Top Recetas</h1>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Recetas Más Populares</h2>
            
            <div className="space-y-4">
              {recetas.length > 0 ? (
                recetas.map((receta, index) => (
                  <a key={receta.id} href={`/receta/${receta.id}`}>
                  <Card key={receta.id} className="flex items-center space-x-4 p-4">
                    <div className="flex-shrink-0">
                      <img
                        src={imagen} // Puedes actualizarlo a receta.imagen si la API lo proporciona
                        alt={`Top Receta ${index + 1}`}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{receta.titulo}</h3>
                      <p className="text-sm text-muted-foreground">
                        {receta.descripcion}
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-primary">#{index + 1}</div>
                  </Card>
                  </a>
                ))
              ) : (
                <p>No hay recetas populares disponibles.</p>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Ajuste para asegurar que BottomNav esté abajo */}
      <footer className="mt-auto">
        <BottomNav />
      </footer>
    </div>
  );
}

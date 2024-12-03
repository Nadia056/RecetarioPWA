import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import CategoryButton from "../CategoryButton";  // Importamos el botón de categoría
import BottomNav from "../BottomNavigation";

export default function ExplorePage() {
  interface Category {
    id: number;
    nombre: string;
  }

  interface Receta {
    id: number;
    titulo: string;
    imagen?: string;
  }

  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Obtener las categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(`${apiUrl}/categorias`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok && result.status === 200) {
          setCategories(result.data.categorias);
        } else {
          console.error("Error al obtener categorías:", result.msg);
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    fetchCategories();
  }, [apiUrl]);

  // Obtener recetas desde la API
  const fetchRecetas = async (categoriaId?: number) => {
    const token = localStorage.getItem("authToken");
    const url = categoriaId
      ? `${apiUrl}/recetas?categoria=${categoriaId}`
      : `${apiUrl}/recetas`;

    try {
      const response = await fetch(url, {
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
        console.error("Error al obtener recetas:", result.msg);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  // Llamada inicial para cargar todas las recetas
  useEffect(() => {
    fetchRecetas();
  }, []);

  // Manejar clic en una categoría
  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
    fetchRecetas(categoryId); // Filtra las recetas por categoría
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Explorar Recetas</h1>
      </header>

      <main className="flex-1 overflow-auto pb-16">
        <div className="p-4 space-y-6">
          {/* Categorías obtenidas dinámicamente */}
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 p-1">
              {categories.map((category) => (
                <CategoryButton
                  key={category.id}
                  label={category.nombre}
                  icon="plate"  // Usa el icono que necesites
                  onClick={() => handleCategoryClick(category.id)}  // Pasamos el onClick
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {selectedCategory
                ? `Recetas de la categoría ${categories.find((cat) => cat.id === selectedCategory)?.nombre}`
                : "Todas las Recetas"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recetas.length > 0 ? (
                recetas.map((receta) => (
                  <a key={receta.id} href={`/receta/${receta.id}`}>
                    <Card className="border-none">
                      <CardContent className="p-0">
                        <img
                          src={`${import.meta.env.BASE_URL}public${receta.imagen}`}
                          alt={receta.titulo}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <h3 className="font-medium mt-2 px-2 text-center sm:text-left">
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

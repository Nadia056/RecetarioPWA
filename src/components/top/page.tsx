import { Card } from "@/components/ui/card";
import BottomNav from "../BottomNavigation";
import imagen from "../../images/chef_icon.png"

export default function TopPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Top Recetas</h1>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Recetas Más Populares</h2>
            <a href="/receta">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="flex items-center space-x-4 p-4">
                  <div className="flex-shrink-0">
                    <img
                      src={imagen}
                      alt={`Top Receta ${i + 1}`}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">Top Receta {i + 1}</h3>
                    <p className="text-sm text-muted-foreground">
                      Descripción breve de la receta
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-primary">#{i + 1}</div>
                </Card>
              ))}
            </div>
            </a>
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

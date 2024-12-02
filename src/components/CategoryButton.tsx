import { Utensils, Search, Cake, Wine, Salad } from 'lucide-react'
import { Button } from "@/components/ui/button"

const icons = {
  plate: Utensils,
  search: Search,
  cake: Cake,
  cocktail: Wine,
  salad: Salad,
}

interface CategoryButtonProps {
  icon: keyof typeof icons
  label: string
  onClick: () => void // Agregado para manejar el clic
}

export default function CategoryButton({ icon, label, onClick }: CategoryButtonProps) {
  const Icon = icons[icon]

  return (
    <Button 
      variant="outline" 
      className="flex flex-col h-auto py-4 px-6" 
      onClick={onClick} // Asignamos la función de clic
    >
      <Icon className="h-6 w-6 mb-1" />
      <span className="text-sm">{label}</span>
    </Button>
  )
}

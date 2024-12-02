"use client"

import { useState } from 'react'
import { ArrowLeft, Plus, X, Camera } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"


export default function EditarReceta() {
  const [ingredientes, setIngredientes] = useState(['', '', ''])
  const [pasos, setPasos] = useState(['', '', ''])

  const agregarIngrediente = () => {
    setIngredientes([...ingredientes, ''])
  }

  const eliminarIngrediente = (index: number) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index))
  }

  const agregarPaso = () => {
    setPasos([...pasos, ''])
  }

  const eliminarPaso = (index: number) => {
    setPasos(pasos.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <a href="/perfil" >
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </a>
        <h1 className="text-xl font-bold">Editar Receta</h1>
        <Button>Guardar Cambios</Button>
      </header>

      <main className="flex-1 p-6 overflow-auto">
        <form className="space-y-6 max-w-2xl mx-auto">
          <div>
            <Label htmlFor="imagen" className="block text-sm font-medium mb-2">
              Imagen de la Receta
            </Label>
            <div className="relative aspect-video">
              <img
                src="/placeholder.svg"
                alt="Imagen actual de la receta"
                width={500}
                height={300}
                className="rounded-lg"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-2 right-2 rounded-full"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Cambiar imagen</span>
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="nombre" className="block text-sm font-medium mb-2">
              Nombre de la Receta
            </Label>
            <Input id="nombre" defaultValue="Pasta Carbonara" />
          </div>

          <div>
            <Label htmlFor="descripcion" className="block text-sm font-medium mb-2">
              Descripción
            </Label>
            <Textarea
              id="descripcion"
              defaultValue="Una deliciosa pasta carbonara tradicional italiana."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tiempo" className="block text-sm font-medium mb-2">
                Tiempo de Preparación
              </Label>
              <div className="flex items-center">
                <Input id="tiempo" type="number" defaultValue="30" className="mr-2" />
                <Select defaultValue="minutos">
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutos">minutos</SelectItem>
                    <SelectItem value="horas">horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="porciones" className="block text-sm font-medium mb-2">
                Porciones
              </Label>
              <Input id="porciones" type="number" defaultValue="4" />
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">Ingredientes</h2>
              <div className="space-y-2">
                {ingredientes.map((ingrediente, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder={`Ingrediente ${index + 1}`}
                      value={ingrediente}
                      onChange={(e) => {
                        const newIngredientes = [...ingredientes]
                        newIngredientes[index] = e.target.value
                        setIngredientes(newIngredientes)
                      }}
                      className="flex-grow"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => eliminarIngrediente(index)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Eliminar ingrediente</span>
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={agregarIngrediente}>
                  <Plus className="mr-2 h-4 w-4" /> Agregar Ingrediente
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">Pasos de Preparación</h2>
              <div className="space-y-2">
                {pasos.map((paso, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="font-medium mt-2">{index + 1}.</span>
                    <Textarea
                      placeholder={`Paso ${index + 1}`}
                      value={paso}
                      onChange={(e) => {
                        const newPasos = [...pasos]
                        newPasos[index] = e.target.value
                        setPasos(newPasos)
                      }}
                      className="flex-grow"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => eliminarPaso(index)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Eliminar paso</span>
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={agregarPaso}>
                  <Plus className="mr-2 h-4 w-4" /> Agregar Paso
                </Button>
              </div>
            </CardContent>
          </Card>

          <div>
            <Label htmlFor="categoria" className="block text-sm font-medium mb-2">
              Categoría
            </Label>
            <Select defaultValue="almuerzo">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desayuno">Desayuno</SelectItem>
                <SelectItem value="almuerzo">Almuerzo</SelectItem>
                <SelectItem value="cena">Cena</SelectItem>
                <SelectItem value="postre">Postre</SelectItem>
                <SelectItem value="bebida">Bebida</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="etiquetas" className="block text-sm font-medium mb-2">
              Etiquetas
            </Label>
            <Input
              id="etiquetas"
              defaultValue="pasta, italiana, rápido"
              placeholder="Ej: vegetariano, sin gluten, rápido"
            />
          </div>
        </form>
      </main>
    </div>
  )
}
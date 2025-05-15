"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GiftIcon, EyeIcon } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import type { Draw } from "@/types/draw"
import { ViewDrawDialog } from "./view-draw-dialog"

export function DrawList() {
  const { token, user } = useAuth()
  const [draws, setDraws] = useState<Draw[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedDraw, setSelectedDraw] = useState<Draw | null>(null)
  const [isViewDrawOpen, setIsViewDrawOpen] = useState(false)

  useEffect(() => {
    const fetchDraws = async () => {
      if (!token || !user) return

      try {
        setLoading(true)
        // Aqui precisaríamos de um endpoint para buscar os sorteios do usuário
        // Como não temos esse endpoint específico, vamos simular com dados vazios
        setDraws([])
      } catch (err) {
        console.error("Erro ao buscar sorteios:", err)
        setError("Não foi possível carregar os sorteios.")
      } finally {
        setLoading(false)
      }
    }

    fetchDraws()
  }, [token, user])

  const handleViewDraw = (draw: Draw) => {
    setSelectedDraw(draw)
    setIsViewDrawOpen(true)
  }

  if (loading) {
    return <div className="text-center py-8">Carregando sorteios...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-destructive">{error}</div>
  }

  if (draws.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {draws.map((draw) => (
        <Card key={draw.id}>
          <CardHeader>
            <CardTitle>{draw.group.name}</CardTitle>
            <CardDescription>
              Sorteio realizado em {new Date(draw.group.createdAt).toLocaleDateString("pt-BR")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <GiftIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Sorteio realizado</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleViewDraw(draw)}>
              <EyeIcon className="h-4 w-4 mr-2" />
              Ver meu amigo secreto
            </Button>
          </CardFooter>
        </Card>
      ))}

      {selectedDraw && <ViewDrawDialog open={isViewDrawOpen} onOpenChange={setIsViewDrawOpen} draw={selectedDraw} />}
    </div>
  )
}

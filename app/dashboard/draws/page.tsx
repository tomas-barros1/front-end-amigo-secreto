"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon, GiftIcon } from "lucide-react"
import Link from "next/link"
import { DrawList } from "@/components/draw-list"
import { apiService } from "@/services/api-service"

export default function DrawsPage() {
  const { user, token } = useAuth()
  const router = useRouter()
  const [drawsCount, setDrawsCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      router.push("/login")
    }
  }, [token, router])

  useEffect(() => {
    const fetchDrawsCount = async () => {
      if (!token) return

      try {
        setLoading(true)
        const count = await apiService.getParticipatingDrawsCount()
        setDrawsCount(count)
      } catch (err) {
        console.error("Erro ao buscar contagem de sorteios:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDrawsCount()
  }, [token])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2 text-white">
              <Link href="/dashboard">
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Meus Sorteios</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Sorteios</h2>
            <p className="text-muted-foreground">
              Você participa de {loading ? "..." : drawsCount !== null ? drawsCount : 0} sorteios
            </p>
          </div>
        </div>

        <DrawList />

        {!loading && drawsCount === 0 && (
          <div className="mt-8 text-center">
            <div className="py-12 flex flex-col items-center">
              <div className="bg-muted/50 rounded-full p-6 mb-4">
                <GiftIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">Nenhum sorteio encontrado</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Você ainda não participa de nenhum sorteio. Crie um grupo e realize um sorteio para começar.
              </p>
              <Button asChild>
                <Link href="/dashboard/groups">Ver Grupos</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

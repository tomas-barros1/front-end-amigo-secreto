"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { PlusIcon, ArrowLeftIcon, UsersIcon } from "lucide-react"
import Link from "next/link"
import { GroupList } from "@/components/group-list"
import { CreateGroupDialog } from "@/components/create-group-dialog"
import { apiService } from "@/services/api-service"

export default function GroupsPage() {
  const { user, token } = useAuth()
  const router = useRouter()
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [groupsCount, setGroupsCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      router.push("/login")
    }
  }, [token, router])

  useEffect(() => {
    const fetchGroupsCount = async () => {
      if (!token) return

      try {
        setLoading(true)
        const count = await apiService.getParticipatingGroupsCount()
        setGroupsCount(count)
      } catch (err) {
        console.error("Erro ao buscar contagem de grupos:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchGroupsCount()
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
            <h1 className="text-2xl font-bold">Meus Grupos</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Grupos</h2>
            <p className="text-muted-foreground">
              Você participa de {loading ? "..." : groupsCount !== null ? groupsCount : 0} grupos
            </p>
          </div>
          <Button onClick={() => setIsCreateGroupOpen(true)}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Criar Grupo
          </Button>
        </div>

        <GroupList />

        {!loading && groupsCount === 0 && (
          <div className="mt-8 text-center">
            <div className="py-12 flex flex-col items-center">
              <div className="bg-muted/50 rounded-full p-6 mb-4">
                <UsersIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">Nenhum grupo encontrado</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Você ainda não participa de nenhum grupo. Crie um novo grupo para começar.
              </p>
              <Button onClick={() => setIsCreateGroupOpen(true)}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Criar Grupo
              </Button>
            </div>
          </div>
        )}
      </main>

      <CreateGroupDialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen} />
    </div>
  )
}

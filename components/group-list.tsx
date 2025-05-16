"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UsersIcon, GiftIcon, PlusIcon } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { AddUserDialog } from "./add-user-dialog"
import { apiService } from "@/services/api-service"
import type { Group } from "@/types/group"
// Importar o novo componente ViewMyFriend
import { ViewMyFriend } from "./view-my-friend"

export function GroupList() {
  const { token } = useAuth()
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  useEffect(() => {
    const fetchGroups = async () => {
      if (!token) return

      try {
        setLoading(true)
        const fetchedGroups = await apiService.getGroups()
        setGroups(fetchedGroups)
      } catch (err) {
        console.error("Erro ao buscar grupos:", err)
        setError("Não foi possível carregar os grupos.")
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [token])

  const handleAddUser = (groupId: string) => {
    setSelectedGroupId(groupId)
    setIsAddUserOpen(true)
  }

  const handleCreateDraw = async (groupId: string) => {
    try {
      await apiService.createDraw(groupId)
      // Atualizar a lista de grupos após criar o sorteio
      const updatedGroups = await apiService.getGroups()
      setGroups(updatedGroups)
    } catch (err: any) {
      console.error("Erro ao criar sorteio:", err)

      // Verificar o tipo de erro baseado na resposta da API
      if (err.message.includes("403")) {
        setError("Apenas o dono do grupo pode criar o sorteio.")
      } else if (err.message.includes("409")) {
        setError("O sorteio já foi realizado ou o número de participantes é inválido (deve ser par).")
      } else {
        setError(
          "Não foi possível criar o sorteio. Verifique se você é o dono do grupo e se há participantes suficientes.",
        )
      }
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando grupos...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-destructive">{error}</div>
  }

  if (groups.length === 0) {
    return null
  }

  if (error) {
    return (
      <>
        <div className="text-center py-4 text-destructive">{error}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card key={group.id}>
              <CardHeader>
                <CardTitle>{group.name}</CardTitle>
                <CardDescription>{group.participants.length} participantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <UsersIcon className="h-5 w-5 mr-2 text-foreground/70" />
                    <span>{group.participants.length} membros</span>
                  </div>
                  <div className="flex items-center">
                    <GiftIcon className="h-5 w-5 mr-2 text-foreground/70" />
                    <span>{group.alreadyDrawn ? "Sorteado" : "Não sorteado"}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Participantes:</h4>
                  <ul className="text-sm text-foreground/70">
                    {group.participants.slice(0, 3).map((participant) => (
                      <li key={participant.id}>{participant.username}</li>
                    ))}
                    {group.participants.length > 3 && <li>+{group.participants.length - 3} mais</li>}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1" onClick={() => handleAddUser(group.id)}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={
                      group.alreadyDrawn || group.participants.length < 2 || group.participants.length % 2 !== 0
                    }
                    onClick={() => handleCreateDraw(group.id)}
                  >
                    <GiftIcon className="h-4 w-4 mr-2" />
                    {group.alreadyDrawn ? "Sorteado" : "Sortear"}
                  </Button>
                </div>

                {/* Adicionar o componente ViewMyFriend */}
                <ViewMyFriend group={group} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <Card key={group.id}>
          <CardHeader>
            <CardTitle>{group.name}</CardTitle>
            <CardDescription>{group.participants.length} participantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <UsersIcon className="h-5 w-5 mr-2 text-foreground/70" />
                <span>{group.participants.length} membros</span>
              </div>
              <div className="flex items-center">
                <GiftIcon className="h-5 w-5 mr-2 text-foreground/70" />
                <span>{group.alreadyDrawn ? "Sorteado" : "Não sorteado"}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Participantes:</h4>
              <ul className="text-sm text-foreground/70">
                {group.participants.slice(0, 3).map((participant) => (
                  <li key={participant.id}>{participant.username}</li>
                ))}
                {group.participants.length > 3 && <li>+{group.participants.length - 3} mais</li>}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1" onClick={() => handleAddUser(group.id)}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
              <Button
                className="flex-1"
                disabled={group.alreadyDrawn || group.participants.length < 2 || group.participants.length % 2 !== 0}
                onClick={() => handleCreateDraw(group.id)}
              >
                <GiftIcon className="h-4 w-4 mr-2" />
                {group.alreadyDrawn ? "Sorteado" : "Sortear"}
              </Button>
            </div>

            {/* Adicionar o componente ViewMyFriend */}
            <ViewMyFriend group={group} />
          </CardFooter>
        </Card>
      ))}

      <AddUserDialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen} groupId={selectedGroupId} />
    </div>
  )
}

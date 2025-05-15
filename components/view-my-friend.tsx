"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GiftIcon, UserIcon } from "lucide-react"
import { apiService } from "@/services/api-service"
import type { FriendDrawDTO } from "@/types/draw"
import type { Group } from "@/types/group"

interface ViewMyFriendProps {
  group: Group
}

export function ViewMyFriend({ group }: ViewMyFriendProps) {
  const [friend, setFriend] = useState<FriendDrawDTO | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showFriend, setShowFriend] = useState(false)

  const fetchFriend = async () => {
    if (!group.id || !group.alreadyDrawn) return

    try {
      setLoading(true)
      setError("")
      const friendData = await apiService.getMyFriend(group.id)
      setFriend(friendData)
    } catch (err) {
      console.error("Erro ao buscar amigo secreto:", err)
      setError("Não foi possível obter informações do seu amigo secreto.")
    } finally {
      setLoading(false)
    }
  }

  const handleViewFriend = () => {
    if (!friend) {
      fetchFriend()
    }
    setShowFriend(true)
  }

  if (!group.alreadyDrawn) {
    return null
  }

  return (
    <div className="mt-4">
      {!showFriend ? (
        <Button onClick={handleViewFriend} className="w-full">
          <GiftIcon className="h-4 w-4 mr-2" />
          Ver meu amigo secreto
        </Button>
      ) : (
        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Seu Amigo Secreto</CardTitle>
            <CardDescription>Grupo: {group.name}</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && <p className="text-center py-4">Carregando...</p>}

            {error && <p className="text-center py-4 text-destructive">{error}</p>}

            {friend && (
              <div className="flex flex-col items-center py-4">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <UserIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Você tirou:</h3>
                <p className="text-2xl font-bold mb-4">{friend.friendUsername}</p>

                {friend.wishItem && (
                  <div className="mt-4 text-center w-full">
                    <h4 className="text-sm font-medium mb-1">Item desejado:</h4>
                    <p className="text-muted-foreground bg-muted/30 p-3 rounded-md">{friend.wishItem}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setShowFriend(false)} className="w-full">
              Esconder
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

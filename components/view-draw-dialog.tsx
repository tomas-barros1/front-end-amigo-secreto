"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/contexts/auth-context"
import type { Draw } from "@/types/draw"
import { GiftIcon } from "lucide-react"

interface ViewDrawDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  draw: Draw
}

export function ViewDrawDialog({ open, onOpenChange, draw }: ViewDrawDialogProps) {
  const { user } = useAuth()

  // Encontrar quem o usuário atual tirou no sorteio
  const getSecretFriend = () => {
    if (!user || !draw.pairs) return null

    const friendId = draw.pairs[user.id]
    if (!friendId) return null

    // Encontrar o usuário correspondente ao ID
    const friend = draw.group.participants.find((p) => p.id === friendId)
    return friend
  }

  const secretFriend = getSecretFriend()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Seu Amigo Secreto</DialogTitle>
          <DialogDescription>Veja quem você tirou no sorteio do grupo {draw.group.name}.</DialogDescription>
        </DialogHeader>
        <div className="py-6 flex flex-col items-center">
          <div className="bg-primary/10 rounded-full p-6 mb-4">
            <GiftIcon className="h-12 w-12 text-primary" />
          </div>

          {secretFriend ? (
            <>
              <h3 className="text-xl font-medium mb-2">Você tirou:</h3>
              <p className="text-2xl font-bold mb-4">{secretFriend.username}</p>

              {secretFriend.wishItem && (
                <div className="mt-4 text-center">
                  <h4 className="text-sm font-medium mb-1">Item desejado:</h4>
                  <p className="text-muted-foreground">{secretFriend.wishItem}</p>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-muted-foreground">
              Não foi possível encontrar seu amigo secreto. Contate o administrador do grupo.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

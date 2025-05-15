"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { apiService } from "@/services/api-service"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { User } from "@/types/user"

interface AddUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groupId: string | null
}

export function AddUserDialog({ open, onOpenChange, groupId }: AddUserDialogProps) {
  const [selectedUserId, setSelectedUserId] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return

      try {
        const fetchedUsers = await apiService.getUsers()
        setUsers(fetchedUsers)
      } catch (err) {
        console.error("Erro ao buscar usuários:", err)
        setError("Não foi possível carregar os usuários.")
      }
    }

    if (open) {
      fetchUsers()
    }
  }, [open, token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!groupId) {
      setError("ID do grupo não fornecido")
      return
    }

    if (!selectedUserId) {
      setError("Selecione um usuário")
      return
    }

    setError("")
    setLoading(true)

    try {
      await apiService.addUserToGroup(groupId, selectedUserId)

      setSelectedUserId("")
      onOpenChange(false)
      router.refresh()
    } catch (err) {
      console.error("Erro ao adicionar usuário ao grupo:", err)
      setError("Não foi possível adicionar o usuário ao grupo. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Usuário ao Grupo</DialogTitle>
          <DialogDescription>Selecione um usuário para adicionar ao grupo.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="user">Usuário</Label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um usuário" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.username} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adicionando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

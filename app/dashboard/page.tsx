"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { PlusIcon, UsersIcon, GiftIcon, LogOut, Gift } from "lucide-react"
import Link from "next/link"
import { GroupList } from "@/components/group-list"
import { CreateGroupDialog } from "@/components/create-group-dialog"
import { apiService } from "@/services/api-service"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  const { user, token, logout } = useAuth()
  const router = useRouter()
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [groupsCount, setGroupsCount] = useState<number | null>(null)
  const [drawsCount, setDrawsCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) {
      router.push("/login")
    }
  }, [token, router])

  useEffect(() => {
    const fetchCounts = async () => {
      if (!token) return

      try {
        setLoading(true)
        setError("")

        // Usar os novos endpoints para obter as contagens
        const [groupsCountData, drawsCountData] = await Promise.all([
          apiService.getParticipatingGroupsCount(),
          apiService.getParticipatingDrawsCount(),
        ])

        setGroupsCount(groupsCountData)
        setDrawsCount(drawsCountData)
      } catch (err) {
        console.error("Erro ao buscar contagens:", err)
        setError("Não foi possível carregar as estatísticas.")
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [token])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  // Função para obter as iniciais do nome do usuário
  const getUserInitials = () => {
    return user.username
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar em preto e branco */}
      <header className="bg-primary text-primary-foreground py-3 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo e título */}
            <Link href="/dashboard" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
              <Gift className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Amigo Secreto</h1>
            </Link>

            {/* Menu do usuário */}
            <div className="flex items-center space-x-4">
              {/* Botão de toggle de tema */}
              <ThemeToggle />

              {/* Botões de navegação principais */}
              <Link href="/dashboard/groups" className="p-2 rounded-full hover:bg-accent/10" title="Meus Grupos">
                <UsersIcon className="h-5 w-5" />
              </Link>

              <Link href="/dashboard/draws" className="p-2 rounded-full hover:bg-accent/10" title="Meus Sorteios">
                <GiftIcon className="h-5 w-5" />
              </Link>

              {/* Avatar e dropdown do usuário */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-accent/10">
                    <Avatar className="h-9 w-9 border-2 border-accent/20">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Olá, {user.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-1">Dashboard</h2>
            <p className="text-foreground/80 text-lg">Acompanhe seus grupos e sorteios</p>
          </div>
          <Button
            onClick={() => setIsCreateGroupOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Criar Grupo
          </Button>
        </div>

        {error && <div className="text-destructive mb-6">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Meus Grupos</CardTitle>
              <CardDescription>Grupos que você participa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-4">
                <UsersIcon className="h-10 w-10 text-primary" />
                <span className="text-3xl font-bold ml-4">
                  {loading ? "..." : groupsCount !== null ? groupsCount : 0}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5" asChild>
                <Link href="/dashboard/groups">Gerenciar Grupos</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-l-4 border-l-primary shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Meus Sorteios</CardTitle>
              <CardDescription>Sorteios que você participa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-4">
                <GiftIcon className="h-10 w-10 text-primary" />
                <span className="text-3xl font-bold ml-4">
                  {loading ? "..." : drawsCount !== null ? drawsCount : 0}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5" asChild>
                <Link href="/dashboard/draws">Gerenciar Sorteios</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Grupos Recentes</h3>
            <Button variant="ghost" size="sm" asChild className="text-foreground hover:bg-primary/5">
              <Link href="/dashboard/groups">Ver todos</Link>
            </Button>
          </div>
          <GroupList />
        </div>
      </main>

      <CreateGroupDialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen} />
    </div>
  )
}

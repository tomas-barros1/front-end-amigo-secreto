import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { GiftIcon, UsersIcon, ShuffleIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Amigo Secreto</h1>
            <p className="text-primary-foreground mt-2">
              Organize seu sorteio de amigo secreto de forma fácil e divertida
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex gap-2">
              <Button
                asChild
                variant="outline"
                className="bg-primary-foreground text-primary border-primary hover:bg-primary-foreground/90"
              >
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/register">Cadastrar</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Bem-vindo ao Amigo Secreto</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crie grupos, convide amigos e realize sorteios de forma simples e segura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <UsersIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Crie Grupos</CardTitle>
              <CardDescription className="text-foreground/70">
                Crie grupos para diferentes ocasiões e convide seus amigos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Organize múltiplos grupos para diferentes eventos ou ocasiões. Adicione participantes facilmente.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShuffleIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Realize Sorteios</CardTitle>
              <CardDescription className="text-foreground/70">
                Sorteie os pares de forma aleatória e segura.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Nosso algoritmo garante que o sorteio seja justo e que ninguém saiba quem tirou quem, exceto a própria
                pessoa.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <GiftIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Lista de Desejos</CardTitle>
              <CardDescription className="text-foreground/70">Adicione itens à sua lista de desejos.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Facilite a vida de quem te tirou adicionando sugestões de presentes que você gostaria de receber.</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild size="lg" className="mr-4 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/login">Entrar</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-background text-primary border-primary hover:bg-background/90"
          >
            <Link href="/register">Cadastrar</Link>
          </Button>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">Amigo Secreto</h2>
              <p className="text-primary-foreground/70">© {new Date().getFullYear()} Todos os direitos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { GiftIcon, UsersIcon, ShuffleIcon } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Amigo Secreto</h1>
          <p className="text-white/90 mt-2">Organize seu sorteio de amigo secreto de forma fácil e divertida</p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          {/* Usando a cor #0A1E26 (secondary) para o título */}
          <h2 className="text-4xl font-bold mb-4 text-[#0A1E26]">Bem-vindo ao Amigo Secreto</h2>
          {/* Usando uma cor personalizada para o subtítulo - um tom médio que combina com a paleta */}
          <p className="text-lg text-[#3A4A51] max-w-2xl mx-auto">
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
              <CardDescription>Crie grupos para diferentes ocasiões e convide seus amigos.</CardDescription>
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
              <CardDescription>Sorteie os pares de forma aleatória e segura.</CardDescription>
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
              <CardDescription>Adicione itens à sua lista de desejos.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Facilite a vida de quem te tirou adicionando sugestões de presentes que você gostaria de receber.</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild size="lg" className="mr-4">
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/register">Cadastrar</Link>
          </Button>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">Amigo Secreto</h2>
              <p className="text-white/70">© {new Date().getFullYear()} Todos os direitos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

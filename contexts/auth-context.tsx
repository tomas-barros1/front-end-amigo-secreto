"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { apiService } from "@/services/api-service"
import type { User } from "@/types/user"

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string, wishItem: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há um token no localStorage
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      apiService.setToken(storedToken)
    }

    setLoading(false)
  }, [])

  // Modificar a função login
  const login = async (email: string, password: string) => {
    const response = await apiService.login({ email, password })

    setToken(response.token)

    // Usar o id retornado pela API
    const userData = {
      id: response.id,
      username: response.username,
      email: email,
      roles: response.roles,
      wishItem: "",
    }

    setUser(userData)

    // Salvar no localStorage
    localStorage.setItem("token", response.token)
    localStorage.setItem("user", JSON.stringify(userData))

    apiService.setToken(response.token)
  }

  // Modificar a função register
  const register = async (username: string, email: string, password: string, wishItem: string) => {
    const response = await apiService.register({ username, email, password, wishItem })

    setToken(response.token)

    // Usar o id retornado pela API
    const userData = {
      id: response.id,
      username: response.username,
      email: email,
      roles: response.roles,
      wishItem: wishItem,
    }

    setUser(userData)

    // Salvar no localStorage
    localStorage.setItem("token", response.token)
    localStorage.setItem("user", JSON.stringify(userData))

    apiService.setToken(response.token)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    apiService.setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>{!loading && children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

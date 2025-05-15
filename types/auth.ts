export interface LoginRequestDTO {
  email: string
  password: string
}

export interface LoginResponseDTO {
  id: string
  username: string
  token: string
  roles: string[]
}

export interface RegisterRequestDTO {
  username: string
  email: string
  password: string
  wishItem: string
}

import type { User } from "./user"
import type { Draw } from "./draw"

export interface Group {
  id: string
  name: string
  ownerId: string
  alreadyDrawn: boolean
  createdAt: string
  participants: User[]
  draw?: Draw
}

export interface GroupCreateRequestDTO {
  name: string
  ownerId: string
}

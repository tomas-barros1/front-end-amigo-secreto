import type { Group } from "./group"

export interface Draw {
  id: string
  group: Group
  pairs: Record<string, string>
}

export interface DrawResponseDTO {
  id: string
  group: Group
  pairs: Record<string, string>
}

// Adicionar a nova interface FriendDrawDTO
export interface FriendDrawDTO {
  friendId: string
  friendUsername: string
  wishItem: string
}

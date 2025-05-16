import type {
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
} from "@/types/auth";
import type { Draw, FriendDrawDTO } from "@/types/draw";
import type { Group, GroupCreateRequestDTO } from "@/types/group";
import type { User } from "@/types/user";

class ApiService {
  private baseUrl = "https://amigo-secreto-oi96.onrender.com";
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  private getHeaders() {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Erro ${response.status}: ${response.statusText}`
      );
    }
    return response.json();
  }

  // Autenticação
  async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<LoginResponseDTO>(response);
  }

  async register(data: RegisterRequestDTO): Promise<LoginResponseDTO> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<LoginResponseDTO>(response);
  }

  // Usuários
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/users`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<User[]>(response);
  }

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<User>(response);
  }

  // Novos métodos para contagens
  async getParticipatingGroupsCount(): Promise<number> {
    const response = await fetch(`${this.baseUrl}/users/participating-groups`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<number>(response);
  }

  async getParticipatingDrawsCount(): Promise<number> {
    const response = await fetch(`${this.baseUrl}/users/participating-draws`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<number>(response);
  }

  // Grupos
  async getGroups(): Promise<Group[]> {
    const response = await fetch(`${this.baseUrl}/groups`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Group[]>(response);
  }

  async getGroupById(id: string): Promise<Group> {
    const response = await fetch(`${this.baseUrl}/groups/${id}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Group>(response);
  }

  async createGroup(data: GroupCreateRequestDTO): Promise<Group> {
    const response = await fetch(`${this.baseUrl}/groups`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Group>(response);
  }

  async addUserToGroup(groupId: string, userId: string): Promise<Group> {
    const response = await fetch(
      `${this.baseUrl}/groups/${groupId}/add/${userId}`,
      {
        method: "POST",
        headers: this.getHeaders(),
      }
    );
    return this.handleResponse<Group>(response);
  }

  // Sorteios
  async createDraw(groupId: string): Promise<Draw> {
    const response = await fetch(
      `${this.baseUrl}/draws/create?groupId=${groupId}`,
      {
        method: "POST",
        headers: this.getHeaders(),
      }
    );
    return this.handleResponse<Draw>(response);
  }

  async getDrawById(id: string): Promise<Draw> {
    const response = await fetch(`${this.baseUrl}/draws/${id}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Draw>(response);
  }

  async getMyFriend(groupId: string): Promise<FriendDrawDTO> {
    const response = await fetch(
      `${this.baseUrl}/draws/my-friend?groupId=${groupId}`,
      {
        headers: this.getHeaders(),
      }
    );
    return this.handleResponse<FriendDrawDTO>(response);
  }
}

export const apiService = new ApiService();

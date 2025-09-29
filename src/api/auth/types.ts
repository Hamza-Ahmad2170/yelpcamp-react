interface Session {
  user: {
    _id: string;
    email: string;
    fullName: string;
  };
}

interface AuthResponse {
  accessToken: string;
}

export type { AuthResponse, Session };

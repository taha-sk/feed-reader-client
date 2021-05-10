export interface AuthenticationResponse {
    token: string;
    expirationMs: number;
    ip: string;
    admin: boolean;
}
// components/Header.tsx
import type { IUser } from "../types/user";
// 1. Importar componentes de Google
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';

interface HeaderProps {
    user: IUser | null;
    // 2. Actualizamos el tipo de la función onLogin
    onLoginSuccess: (credentialResponse: CredentialResponse) => void; 
    onLogout: () => void;
    isLoading?: boolean;
}

export function Header({ user, onLoginSuccess, onLogout, isLoading = false }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-xs h-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span>Logo Syncro chat</span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-sm">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">{user.name}</span>
                            <button
                                className="px-3 py-1 rounded-md border hover:bg-gray-100 cursor-pointer"
                                onClick={onLogout}
                            >
                                Salir
                            </button>
                        </div>
                    ) : (
                        // 3. Reemplazamos tu botón negro por el de Google
                        <div className="flex items-center gap-4">
                            {!isLoading ? (
                                <GoogleLogin
                                    onSuccess={onLoginSuccess}
                                    onError={() => console.log('Login Failed')}
                                    theme="filled_black"
                                    shape="pill"
                                    text="signin_with"
                                />
                            ) : (
                                <div className="text-sm text-gray-500">Autenticando...</div>
                            )}
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}
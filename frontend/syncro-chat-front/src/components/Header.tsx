import type { IUser } from "../types/user";

export function Header({ user, onLogin, onLogout }: { user: IUser | null; onLogin?: () => void; onLogout?: () => void }) {
    // onLogin / onLogout son opcionales: el componente los llamará si se pasan desde el padre
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
                                className="px-3 py-1 rounded-md border"
                                aria-label="Cerrar sesión"
                                onClick={onLogout}
                            >
                                Salir
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-[#1a1a1a] px-4 py-2 rounded-md text-white hover:bg-[#333333] transition"
                            onClick={onLogin}
                        >
                            Login
                        </button>
                    )}
                </nav>
            </div>

        </header>
    );
}
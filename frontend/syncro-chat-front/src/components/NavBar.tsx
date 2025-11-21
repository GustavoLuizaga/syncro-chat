

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-xs h-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span>Logo Syncro chat</span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                   <button className="">
                    Login
                   </button>
                </nav>
            </div>

        </header>
    )
}
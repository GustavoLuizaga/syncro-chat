import { MessageBubble } from "../components/MessageBubble";
export function ChatPage() {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="fixed inset-x-0 top-16 bottom-0 flex flex-col"> 
            
            <section className="flex-1 overflow-y-auto">
                <div className="max-w-7xl w-full mx-auto px-4 lg:px-8 py-4">
                    <p>historial de mensajes</p>
                    <MessageBubble
                    id_message="1"
                    id_user="123" 
                    user_name="Gustavo Pollo"
                    content="hola, este es un mensaje de prueba.hola, este es un mensaje de prueba.hola, este es un mensaje de prueba.hola, este es un mensaje de prueba."
                    timestamp={new Date()}
                    />
                </div>
            </section>

           
            <footer >
                <div className="max-w-7xl w-full mx-auto px-4 lg:px-8 py-4">
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Escribe un mensaje..." 
                            className="flex-1 border rounded-md px-2 py-1"
                        />
                        <button 
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-[#1a1a1a] text-white rounded-md"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}

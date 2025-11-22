import { useEffect, useState, useRef } from "react";
import { MessageBubble } from "../components/MessageBubble";
import { useSocket } from "../hooks/useSocket";
import { toast } from "sonner";

interface Message {
    id: number;
    content: string;
    userId: number;
    username: string;
    chatId: number;
    createdAt: string;
}

interface TypingData {
    userId: number;
    username: string;
    isTyping: boolean;
}

interface ErrorData {
    message: string;
}

export function ChatPage() {
    const token = localStorage.getItem('token') || '';
    const userStr = localStorage.getItem('user') || '';
    const currentUser = userStr ? JSON.parse(userStr) : null;
    const currentUserId = currentUser?.id || 0;
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState<Map<number, TypingData>>(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const chatId = 1; // Por ahora usamos un chat hardcodeado

    const {
        joinChat,
        leaveChat,
        sendMessage,
        setTyping,
        getMessages,
        onNewMessage,
        onMessagesLoaded,
        onUserTyping,
        onError,
        onUserConnected,
        onUserDisconnected,
        isConnected
    } = useSocket({ token });

    // Scroll automático
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Conectar al chat
    useEffect(() => {
        if (isConnected && chatId) {
            joinChat(chatId);
            getMessages(chatId);
        }

        return () => {
            if (chatId) {
                leaveChat(chatId);
            }
        };
    }, [isConnected, chatId, joinChat, leaveChat, getMessages]);

    // Listener para nuevos mensajes
    useEffect(() => {
        const unsubscribe = onNewMessage((message: Message) => {
            console.log("💬 Nuevo mensaje recibido:", message);
            setMessages(prev => [...prev, message]);
        });
        return unsubscribe;
    }, [onNewMessage]);

    // Listener para mensajes cargados
    useEffect(() => {
        const unsubscribe = onMessagesLoaded((loadedMessages: Message[]) => {
            console.log("📬 Mensajes cargados:", loadedMessages.length);
            setMessages(loadedMessages);
            setIsLoading(false);
        });
        return unsubscribe;
    }, [onMessagesLoaded]);

    // Listener para usuario escribiendo
    useEffect(() => {
        const unsubscribe = onUserTyping((data: TypingData) => {
            if (data.isTyping) {
                setTypingUsers(prev => new Map(prev).set(data.userId, data));
            } else {
                setTypingUsers(prev => {
                    const newMap = new Map(prev);
                    newMap.delete(data.userId);
                    return newMap;
                });
            }
        });
        return unsubscribe;
    }, [onUserTyping]);

    // Listener para errores
    useEffect(() => {
        const unsubscribe = onError((error: ErrorData) => {
            console.error("Error en chat:", error.message);
        });
        return unsubscribe;
    }, [onError]);

    // Listener para usuario conectado
    useEffect(() => {
        onUserConnected((data) => {
            toast.success(`${data.username} se unió al chat 👋`);
        });
    }, [onUserConnected]);

    // Listener para usuario desconectado
    useEffect(() => {
        onUserDisconnected((data) => {
            toast.info(`${data.username} salió del chat 👋`);
        });
    }, [onUserDisconnected]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageInput(e.target.value);

        // Indicador de escritura
        if (!isTyping) {
            setIsTyping(true);
            setTyping(chatId, true);
        }

        // Limpiar timeout anterior
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Establecer nuevo timeout para detener el indicador
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            setTyping(chatId, false);
        }, 1000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageInput.trim()) {
            sendMessage(chatId, messageInput);
            setMessageInput('');
            setIsTyping(false);
            setTyping(chatId, false);
        }
    };

    if (isLoading) {
        return (
            <div className="fixed inset-x-0 top-16 bottom-0 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-500">Cargando chat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-x-0 top-16 bottom-0 flex flex-col">
            {/* Header del Chat */}
            <div className="bg-white border-b px-4 py-3">
                <h2 className="font-semibold text-gray-800">Chat #{chatId}</h2>
                <p className="text-sm text-gray-500">
                    {isConnected ? "🟢 Conectado" : "🔴 Desconectado"}
                </p>
            </div>

            {/* Mensajes */}
            <section className="flex-1 overflow-y-auto">
                <div className="max-w-7xl w-full mx-auto px-4 lg:px-8 py-4">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            <p>No hay mensajes aún. ¡Sé el primero en escribir!</p>
                        </div>
                    ) : (
                        messages.map(msg => {
                            // Proteger contra valores undefined
                            if (!msg || !msg.id || !msg.username || !msg.content || !msg.createdAt) {
                                console.warn("Mensaje inválido:", msg);
                                return null;
                            }
                            const isOwnMessage = msg.userId === currentUserId;
                            return (
                                <div key={msg.id} className="mb-4">
                                    <MessageBubble
                                        id_message={msg.id.toString()}
                                        id_user={msg.userId.toString()}
                                        user_name={msg.username}
                                        content={msg.content}
                                        timestamp={new Date(msg.createdAt)}
                                        isOwnMessage={isOwnMessage}
                                    />
                                </div>
                            );
                        })
                    )}

                    {/* Indicador de escritura */}
                    {typingUsers.size > 0 && (
                        <div className="text-sm text-gray-500 italic py-2">
                            {Array.from(typingUsers.values())
                                .map(t => t.username)
                                .join(', ')} está escribiendo...
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </section>

            {/* Input de mensaje */}
            <footer className="bg-white border-t">
                <div className="max-w-7xl w-full mx-auto px-4 lg:px-8 py-4">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            value={messageInput}
                            onChange={handleInputChange}
                            className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <button
                            type="submit"
                            disabled={!messageInput.trim()}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </footer>
        </div>
    );
}

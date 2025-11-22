export function MessageBubble() {
    return (
        <div className="flex items-start gap-2.5">
            
            <img
                className="w-8 h-8 rounded-full"
                src="https://www.vecteezy.com/free-vector/default-profile-picture"
                alt="user-image"
            />

            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 bg-neutral-secondary-soft rounded-e-base rounded-es-base">
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-heading">Bonnie Green</span>
                    <span className="text-sm text-body">11:46</span>
                </div>

                <p className="text-sm py-2.5 text-body">
                    That's awesome. I think our users will really appreciate the improvements.
                </p>

                <span className="text-sm text-body">Delivered</span>
            </div>
        </div>
    );
}

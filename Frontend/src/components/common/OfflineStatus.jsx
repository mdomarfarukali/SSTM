import { useEffect, useRef, useState } from 'react';

export default function OfflineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showBackOnline, setShowBackOnline] = useState(false);

    const wasOffline = useRef(false);

    useEffect(() => {
        const handleOffline = () => {
            setIsOnline(false);
            setShowBackOnline(false);
            wasOffline.current = true;
        };

        const handleOnline = () => {
            setIsOnline(true);

            if (wasOffline.current) {
                setShowBackOnline(true);

                const timer = setTimeout(() => {
                    setShowBackOnline(false);
                }, 3000);

                wasOffline.current = false;

                return () => clearTimeout(timer);
            }
        };

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    // Nothing to show when online and there is no reconnect message
    if (isOnline && !showBackOnline) {
        return null;
    }

    return (
        <div
            className={`
        fixed
        bottom-4
        left-1/2
        -translate-x-1/2
        z-[9999]
        w-[calc(100%-2rem)]
        max-w-md
        rounded-2xl
        px-4
        py-3
        shadow-2xl
        backdrop-blur-md
        border
        transition-all
        duration-300
        ${!isOnline
                    ? 'bg-red-50/95 border-red-200 text-red-900'
                    : 'bg-green-50/95 border-green-200 text-green-900'
                }
      `}
            role="status"
            aria-live="polite"
        >
            <div className="flex items-center gap-3">
                <div
                    className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            text-lg
            ${!isOnline
                            ? 'bg-red-100'
                            : 'bg-green-100'
                        }
          `}
                >
                    {!isOnline ? '⚡' : '✓'}
                </div>

                <div className="min-w-0">
                    <p className="font-semibold">
                        {!isOnline
                            ? "You're offline"
                            : "You're back online"}
                    </p>

                    <p className="text-sm opacity-80">
                        {!isOnline
                            ? 'Showing cached content available on this device.'
                            : 'Your connection has been restored.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
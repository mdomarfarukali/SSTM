import { MessageCircle } from "lucide-react";

export default function ChatButton() {
  return (
    <button
      className="
        fixed bottom-6 right-6 
        bg-pink-600 hover:bg-pink-700 text-white 
        dark:bg-beige-200 dark:hover:bg-beige-300 dark:text-gray-900
        p-4 rounded-full shadow-lg transition flex items-center justify-center
      "
      onClick={() => alert("Chat support coming soon 💬")}
    >
      <MessageCircle size={26} />
    </button>
  );
}


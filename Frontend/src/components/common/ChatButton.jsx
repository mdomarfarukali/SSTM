import { MessageCircle } from "lucide-react";

export default function ChatButton() {
  return (
    <button
      className="
        fixed bottom-6 right-6 bg-brand-secondary hover:bg-brand-primary text-white p-4 rounded-full shadow-lg transition flex items-center justify-center"
      onClick={() => alert("Chat support coming soon 💬")}
    >
      <MessageCircle size={26} />
    </button>
  );
}


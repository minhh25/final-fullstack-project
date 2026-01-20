import { useEffect, useMemo, useRef, useState } from "react";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ChatWidget() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! Ask me about products, deals, or recommendations 🙂" },
  ]);

  const endRef = useRef(null);
  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = data?.message || "Server error.";
        setMessages((prev) => [...prev, { role: "ai", text: msg }]);
        return;
      }

      const answer = data?.reply || "Sorry, something went wrong.";
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: answer,
          matchedProducts: Array.isArray(data?.matchedProducts) ? data.matchedProducts : [],
        },
      ]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "ai", text: "Server error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[999]">
      {open && (
        <div className="mb-3 w-[360px] rounded-2xl border bg-white shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="font-semibold">AI Assistant</div>
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>

          <div className="h-[360px] overflow-auto px-4 py-3 space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-5 " +
                    (m.role === "user" ? "bg-black text-white" : "bg-gray-100 text-gray-900")
                  }
                >
                  <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>

                  {m.role === "ai" && Array.isArray(m.matchedProducts) && m.matchedProducts.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="text-xs text-gray-500">Suggestions:</div>
                      {m.matchedProducts.slice(0, 3).map((p) => (
                        <button
                          key={p._id}
                          className="w-full text-left text-xs rounded-lg border bg-white px-2 py-2 hover:bg-gray-50"
                          onClick={() => navigate(`/${p.department}/${p.category}/${p._id}`)}
                        >
                          <div className="font-medium line-clamp-1">{p.name}</div>
                          <div className="text-gray-500">
                            ${Number(p.discountPrice ?? p.price).toFixed(2)} • {p.department}/{p.category}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="border-t px-3 py-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products..."
                className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
              />
              <button
                onClick={send}
                disabled={!canSend}
                className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center disabled:opacity-50"
                aria-label="Send"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </div>
            {loading && <div className="mt-2 text-xs text-gray-500">Thinking…</div>}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="h-14 w-14 rounded-full bg-black text-white shadow-lg flex items-center justify-center hover:opacity-90"
        aria-label="Open chat"
      >
        <FaComments className="text-lg" />
      </button>
    </div>
  );
}

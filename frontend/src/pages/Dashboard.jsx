// src/pages/Dashboard.jsx
import { useEffect, useRef, useState } from "react";
import "../App.css";

const SUGGESTIONS = [
  "Explain binary search in simple words",
  "Give me 3 project ideas using AI",
  "Help me design a DB schema for a college app",
  "How to prepare for DSA interviews fast?",
  "Write a professional email to my professor",
];

let chatIdCounter = 1;

function makeNewChatTitle() {
  return `Chat ${chatIdCounter++}`;
}

function createInitialMessage(text = "New chat started. Tell me what you’re working on or choose a suggestion below!") {
  return {
    id: Date.now(),
    from: "bot",
    text,
  };
}

export default function Dashboard() {
  // All chats
  const [chats, setChats] = useState([
    {
      id: 1,
      title: makeNewChatTitle(),
      messages: [createInitialMessage()],
    },
  ]);

  // Which chat is currently open
  const [activeChatId, setActiveChatId] = useState(1);

  // Input + typing state
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
    // sidebar menu / rename state
  const [menuOpenId, setMenuOpenId] = useState(null);   // which chat's "..." menu is open
  const [renameChatId, setRenameChatId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const startRenameChat = (chat) => {
    setRenameChatId(chat.id);
    setRenameValue(chat.title);
    setMenuOpenId(null);
  };

  const handleRenameSubmit = () => {
    if (!renameChatId) return;
    setChats((prev) =>
      prev.map((c) =>
        c.id === renameChatId ? { ...c, title: renameValue || c.title } : c
      )
    );
    setRenameChatId(null);
    setRenameValue("");
  };

  const cancelRename = () => {
    setRenameChatId(null);
    setRenameValue("");
  };

  const handleDeleteChat = (id) => {
    const newChats = chats.filter((c) => c.id !== id);

    // if we deleted the last chat -> create a fresh one
    if (newChats.length === 0) {
      const first = {
        id: Date.now(),
        title: makeNewChatTitle(),
        messages: [createInitialMessage()],
      };
      setChats([first]);
      setActiveChatId(first.id);
    } else {
      setChats(newChats);
      // if we deleted the active chat, move focus to first remaining
      if (id === activeChatId) {
        setActiveChatId(newChats[0].id);
      }
    }

    if (menuOpenId === id) setMenuOpenId(null);
  };


  const messagesEndRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat?.messages, isThinking]);

  // ---- actions ----

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: makeNewChatTitle(),
      messages: [createInitialMessage()],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setInput("");
    setIsThinking(false);
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setInput("");
    setIsThinking(false);
  };

  const addMessageToActiveChat = (message) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  const updateActiveChatTitleFromFirstUserMessage = (userText) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== activeChatId) return chat;
        // If title is still "Chat X", update with something nicer
        if (chat.title.startsWith("Chat ")) {
          const short = userText.length > 24 ? userText.slice(0, 24) + "…" : userText;
          return { ...chat, title: short };
        }
        return chat;
      })
    );
  };

  const fakeBackendReply = async (userText) => {
    // 🧠 PLACE TO CALL REAL BACKEND
    // Example with real API (later):
    // const res = await fetch("http://localhost:5000/api/chat", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ message: userText, chatId: activeChatId }),
    // });
    // const data = await res.json();
    // return data.reply;

    // For now: simple demo answer
    return (
      "✨ Demo reply: In the real system, this response will come from your AI backend.\n\n" +
      `You asked: "${userText}".\n\n` +
      "Explain here what your model / system would do with this query."
    );
  };

  const handleSend = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || !activeChat) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      from: "user",
      text: trimmed,
    };
    addMessageToActiveChat(userMsg);
    updateActiveChatTitleFromFirstUserMessage(trimmed);
    setInput("");
    setIsThinking(true);

    // Get reply (fake or real backend)
    try {
      const replyText = await fakeBackendReply(trimmed);

      const botMsg = {
        id: Date.now() + 1,
        from: "bot",
        text: replyText,
      };
      addMessageToActiveChat(botMsg);
    } catch (err) {
      const errorMsg = {
        id: Date.now() + 2,
        from: "bot",
        text:
          "⚠️ Something went wrong while contacting the backend.\n" +
          "For the hackathon demo, you can explain here what should happen.",
      };
      addMessageToActiveChat(errorMsg);
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleSuggestionClick = (text) => {
    handleSend(text);
  };

  return (
    <div className="chat-root">
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <div>
          <div className="chat-logo-row">
            <div className="chat-logo-circle">A</div>
            <span className="chat-logo-text">Aurora Chat</span>
          </div>

          <nav className="chat-nav">
            <button
              className="chat-nav-btn chat-nav-btn-primary"
              onClick={handleNewChat}
            >
              + New chat
            </button>
            <div className="chat-history-label">History</div>
<div className="chat-history-list">
  {chats.map((chat) => {
    const isActive = chat.id === activeChatId;
    const isRenaming = renameChatId === chat.id;
    const isMenuOpen = menuOpenId === chat.id;

    return (
      <div
        key={chat.id}
        className={
          "chat-history-row" + (isActive ? " chat-history-row-active" : "")
        }
      >
        <button
          className="chat-history-item"
          onClick={() => handleSelectChat(chat.id)}
        >
          {isRenaming ? (
            <input
              className="chat-rename-input"
              value={renameValue}
              autoFocus
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameSubmit();
                if (e.key === "Escape") cancelRename();
              }}
            />
          ) : (
            chat.title
          )}
        </button>

        {/* three dots */}
        <button
          type="button"
          className="chat-history-menu-btn"
          onClick={() =>
            setMenuOpenId((prev) => (prev === chat.id ? null : chat.id))
          }
        >
          ⋮
        </button>

        {isMenuOpen && (
          <div className="chat-history-menu">
            <button type="button" onClick={() => startRenameChat(chat)}>
              Rename
            </button>
            <button type="button" onClick={() => handleDeleteChat(chat.id)}>
              Delete
            </button>
          </div>
        )}
      </div>
    );
  })}

  {chats.length === 0 && (
    <div className="chat-history-empty">No chats yet</div>
  )}
</div>

          </nav>
        </div>

        <div className="chat-sidebar-bottom">
          <button className="chat-small-link">Login with GitHub</button>
          <span className="chat-small-muted">Hackathon demo interface</span>
        </div>
      </aside>

      {/* Main area */}
      <main className="chat-main">
        {/* Top bar */}
        <header className="chat-topbar">
          <div className="chat-topbar-left">
            <span className="chat-topbar-label">Environment</span>
            <span className="chat-topbar-pill">Hackathon Demo</span>
          </div>
          <div className="chat-topbar-right">
            <button className="chat-icon-btn">🔍</button>
            <button className="chat-icon-btn">⚙️</button>
            <button className="chat-avatar">S</button>
          </div>
        </header>

        {/* Center content */}
        <section className="chat-center">
          <h1 className="chat-title">How can I help you today?</h1>

          {/* Chat window */}
          <div className="chat-window">
            <div className="chat-messages">
              {activeChat?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    "chat-message " +
                    (msg.from === "user"
                      ? "chat-message-user"
                      : "chat-message-bot")
                  }
                >
                  <div className="chat-message-bubble">
                    {msg.text.split("\n").map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="chat-message chat-message-bot">
                  <div className="chat-message-bubble chat-typing-bubble">
                    <span className="dot dot-1" />
                    <span className="dot dot-2" />
                    <span className="dot dot-3" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input card */}
          <div className="chat-input-card">
            <form onSubmit={handleSubmit} className="chat-input-row">
              <input
                className="chat-input"
                placeholder="Type a message…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="chat-send-btn"
                disabled={!input.trim() || isThinking}
              >
                ↑
              </button>
            </form>

            <div className="chat-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="chat-suggestion-chip"
                  onClick={() => handleSuggestionClick(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

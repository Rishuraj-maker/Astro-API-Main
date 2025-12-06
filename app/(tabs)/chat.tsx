import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { FAQ, ALL_QUESTIONS, ZODIAC_INFO } from "@/data/faq";
import { useAuth } from "@/context/AuthContext";

const BOT_AVATAR =
  "https://nsrisuhxacpwfnvkiogs.supabase.co/storage/v1/object/public/product-images/1-removebg-preview-1-2.png";

// ----------------------------------------------------
// 🔍 NLP FUZZY MATCHING SYSTEM
// ----------------------------------------------------

function getBestFAQMatch(message: string) {
  const input = message.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  Object.keys(FAQ).forEach((category) => {
    FAQ[category].forEach((item) => {
      let score = 0;

      item.q.split(" ").forEach((word) => {
        if (input.includes(word)) score += 1;
      });

      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    });
  });

  return bestScore > 0 ? bestMatch : null;
}

// ----------------------------------------------------
// 🔮 DETECT ZODIAC QUESTIONS
// ----------------------------------------------------

const zodiacKeywords = [
  "my zodiac",
  "my sign",
  "about my sign",
  "what is my sign",
  "zodiac personality",
  "tell me about myself",
  "my horoscope",
  "about my zodiac",
  "astro profile",
  "astrology about me",
];

// ----------------------------------------------------
// 🌙 COMPONENT
// ----------------------------------------------------

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      from: "bot",
      text: "Hello ✨ I'm AstroGuide Chatbot.\nAsk me anything about Astrology, Crystals, Numerology, Angel Numbers, Love, Career or your Zodiac Sign!",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const { user } = useAuth();

  // user sign for personalization
  const userSign = user?.zodiac_sign?.toLowerCase();

  // ----------------------------------------------------
  // ✨ CLEAR CHAT HISTORY
  // ----------------------------------------------------
  const clearChat = () => {
    setMessages([
      {
        id: "1",
        from: "bot",
        text: "Chat cleared 🧹\nAsk me anything again!",
      },
    ]);
  };

  // ----------------------------------------------------
  // ✨ SEND MESSAGE
  // ----------------------------------------------------

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      from: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    const userText = input.toLowerCase();
    setInput("");
    setTyping(true);

    setTimeout(() => {
      // ------------------------------------------
      // 🌟 1. PRIORITY: ZODIAC-AWARE RESPONSE
      // ------------------------------------------

      if (zodiacKeywords.some((k) => userText.includes(k))) {
        if (userSign && ZODIAC_INFO[userSign]) {
          const z = ZODIAC_INFO[userSign];

          const botMsg = {
            id: (Date.now() + 1).toString(),
            from: "bot",
            text:
              `✨About Your Zodiac Sign — ${userSign.toUpperCase()}✨\n\n` +
              `🥸Personality: ${z.traits}\n` +
              `💪Strengths: ${z.strengths}\n` +
              `😵Weaknesses: ${z.weaknesses}\n` +
              `💌Love: ${z.love}\n` +
              `👨‍🎓Career: ${z.career}\n\n` +
              `🤓Advice: ${z.advice}`,
          };

          setMessages((prev) => [...prev, botMsg]);
          setTyping(false);
          return;
        }
      }

      // ------------------------------------------
      // 🌟 2. FAQ MATCHING (FUZZY NLP)
      // ------------------------------------------

      const faqMatch = getBestFAQMatch(userText);

      if (faqMatch) {
        const suggestions = ALL_QUESTIONS.sort(() => 0.5 - Math.random()).slice(
          0,
          3
        );

        const botMsg = {
          id: (Date.now() + 1).toString(),
          from: "bot",
          text:
            faqMatch.a +
            "\n\nYou can also ask:\n• " +
            suggestions.join("\n• "),
        };

        setMessages((prev) => [...prev, botMsg]);
        setTyping(false);
        return;
      }

      // ------------------------------------------
      // 🌟 3. FALLBACK — UNKNOWN QUESTION
      // ------------------------------------------

      const fallbackSuggestions = ALL_QUESTIONS.slice(0, 6);

      const botMsg = {
        id: (Date.now() + 1).toString(),
        from: "bot",
        text:
          "Sorry, I have a limitation to my data.\n\nHere are some questions I *can* answer:\n• " +
          fallbackSuggestions.join("\n• "),
      };

      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 1200);
  };

  // ----------------------------------------------------
  // 🗨️ RENDER EACH MESSAGE
  // ----------------------------------------------------

  const renderMessage = ({ item }) => {
    const isBot = item.from === "bot";

    return (
      <View
        style={[
          styles.messageRow,
          isBot ? styles.botRow : styles.userRow,
        ]}
      >
        {isBot && (
          <Image source={{ uri: BOT_AVATAR }} style={styles.avatar} />
        )}

        <View
          style={[
            styles.bubble,
            isBot ? styles.botBubble : styles.userBubble,
          ]}
        >
          <Text style={styles.msgText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  // ----------------------------------------------------
  // 🌙 UI
  // ----------------------------------------------------

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Astro Chatbot ✨</Text>

        <Pressable style={styles.clearBtn} onPress={clearChat}>
          <Text style={{ color: "#fff" }}>Clear</Text>
        </Pressable>
      </View>

      {/* Quick zodiac button */}
      <View style={styles.quickRow}>
        <Pressable
          style={styles.quickBtn}
          onPress={() => {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                from: "user",
                text: "Tell me about my zodiac sign",
              },
            ]);
            setInput("Tell me about my zodiac sign");
            sendMessage();
          }}
        >
          <Text style={styles.quickText}>✨ About My Zodiac</Text>
        </Pressable>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Typing */}
      {typing && (
        <View style={styles.typingRow}>
          <ActivityIndicator size="small" color="#fff" />
          <Text style={styles.typingText}>AstroBot is typing...</Text>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask something..."
          placeholderTextColor="#999"
          style={styles.input}
        />

        <Pressable style={styles.sendBtn} onPress={sendMessage}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

// ----------------------------------------------------
// 🎨 STYLES
// ----------------------------------------------------

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },

  header: {
    padding: 16,
    backgroundColor: "#1e293b",
    borderBottomWidth: 1,
    borderColor: "#334155",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: { fontSize: 18, fontWeight: "700", color: "#fff" },

  clearBtn: {
    backgroundColor: "#ef4444",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  quickBtn: {
    backgroundColor: "#3b82f6",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  quickText: { color: "#fff", fontWeight: "600" },

  messageRow: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "flex-start",
  },
  botRow: { alignSelf: "flex-start" },
  userRow: { alignSelf: "flex-end" },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 5,
    marginRight: 8,
  },

  bubble: {
    padding: 12,
    borderRadius: 12,
    maxWidth: "80%",
  },
  botBubble: {
    backgroundColor: "#1e293b",
    borderWidth: 5,
    borderColor: "#334155",
  },
  userBubble: {
    backgroundColor: "#3b82f6",
  },

  msgText: { color: "#fff", fontSize: 15 },

  typingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    marginBottom: 8,
  },
  typingText: { color: "#ccc", marginLeft: 6 },

  inputRow: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#1e293b",
    borderTopWidth: 1,
    borderColor: "#334155",
  },
  input: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderRadius: 10,
    paddingHorizontal: 12,
    color: "#fff",
    height: 45,
  },
  sendBtn: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 18,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
});

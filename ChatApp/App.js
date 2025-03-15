// import React, { useState, useRef } from 'react';
// import { View, Text, TextInput, Button, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
// import axios from 'axios';

// export default function App() {
//   const [message, setMessage] = useState('');
//   const [conversation, setConversation] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const scrollViewRef = useRef();

//   // Use your machine's local IP address instead of localhost
//   const SERVER_URL = 'https://chat-app-api-eight.vercel.app/message';
//  // Change this to your actual local IP

//   const sendMessage = async () => {
//     if (!message.trim()) return; // Prevent sending empty messages

//     const newConversation = [...conversation, { role: "user", text: message }];
//     setConversation(newConversation);
//     setMessage('');
//     setLoading(true); // Show loading indicator

//     try {
//       const res = await axios.post(SERVER_URL, { message });
//       newConversation.push({ role: "bot", text: res.data.reply });
//     } catch (error) {
//       console.error("Error:", error.message);
//       newConversation.push({ role: "bot", text: "❌ Error fetching response. Check the server." });
//     } finally {
//       setConversation(newConversation);
//       setLoading(false);
//       scrollViewRef.current.scrollToEnd({ animated: true }); // Auto-scroll to latest message
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>🤖 AI Chatbot</Text>

//       {/* Chat messages area */}
//       <ScrollView 
//         style={styles.chatContainer} 
//         ref={scrollViewRef}
//         onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
//       >
//         {conversation.map((msg, index) => (
//           <View key={index} style={msg.role === "user" ? styles.userBubble : styles.botBubble}>
//             <Text style={styles.messageText}>{msg.text}</Text>
//           </View>
//         ))}

//         {/* Show typing indicator while bot is responding */}
//         {loading && (
//           <View style={styles.botBubble}>
//             <ActivityIndicator size="small" color="#FFF" />
//             <Text style={styles.messageText}>Bot is typing...</Text>
//           </View>
//         )}
//       </ScrollView>

//       {/* Input and Send Button */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Type a message..."
//         />
//         <Button title="Send" onPress={sendMessage} color="#007AFF" />
//       </View>
//     </View>
//   );
// }

// // 🌟 STYLES
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     padding: 20,
//     paddingTop: 50
//   },
//   header: {
//     textAlign: "center",
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 10
//   },
//   chatContainer: {
//     flex: 1,
//     marginBottom: 10
//   },
//   userBubble: {
//     alignSelf: "flex-end",
//     backgroundColor: "#007AFF",
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//     maxWidth: "80%",
//   },
//   botBubble: {
//     alignSelf: "flex-start",
//     backgroundColor: "#34C759",
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//     maxWidth: "80%",
//   },
//   messageText: {
//     color: "#FFF",
//     fontSize: 16
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#FFF",
//     borderRadius: 10,
//     elevation: 2,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#CCC",
//     padding: 10,
//     borderRadius: 5,
//     marginRight: 10
//   }
// });
import React, { useState, useRef } from 'react';
import { 
  View, Text, TextInput, Button, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity 
} from 'react-native';
import axios from 'axios';

export default function App() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const SERVER_URL = 'https://chat-app-api-eight.vercel.app/message'; // Update with actual server URL

  const sendMessage = async () => {
    if (!message.trim()) return; 

    const newConversation = [...conversation, { role: "user", text: message }];
    setConversation(newConversation);
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post(SERVER_URL, { message });
      newConversation.push({ role: "bot", text: res.data.reply });
    } catch (error) {
      console.error("Error:", error.message);
      newConversation.push({ role: "bot", text: "❌ Error fetching response. Check the server." });
    } finally {
      setConversation(newConversation);
      setLoading(false);
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const clearChat = () => {
    setConversation([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🤖 AI Chatbot</Text>

      {/* Chat messages area */}
      <ScrollView 
        style={styles.chatContainer} 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {conversation.map((msg, index) => (
          <View key={index} style={msg.role === "user" ? styles.userBubble : styles.botBubble}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}

        {/* Show typing indicator while bot is responding */}
        {loading && (
          <View style={styles.botBubble}>
            <ActivityIndicator size="small" color="#FFF" />
            <Text style={styles.messageText}>Bot is typing...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input and Buttons */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#777"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Clear Chat Button */}
      {conversation.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearChat}>
          <Text style={styles.clearButtonText}>Clear Chat</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// 🌟 Updated Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    paddingTop: 50
  },
  header: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333"
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: "75%",
    elevation: 2
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#34C759",
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: "75%",
    elevation: 2
  },
  messageText: {
    color: "#FFF",
    fontSize: 16
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 2,
    padding: 10,
    marginBottom: 10
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 10,
    borderRadius: 5,
    fontSize: 16
  },
  sendButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
    elevation: 2
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },
  clearButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    elevation: 2
  },
  clearButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});


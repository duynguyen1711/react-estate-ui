import { useContext, useEffect, useRef, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import './chat.scss';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';
import { format } from 'timeago.js';

const Chat = ({ item, refreshChatList }) => {
  const { currentUser } = useContext(AuthContext);
  const [chat, setChat] = useState(null);
  const [connection, setConnection] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  // Connect to SignalR Hub
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5246/chathub')
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        console.log('Connected to SignalR Hub');
        setConnection(newConnection);
      })
      .catch((err) => console.error('SignalR connection error:', err));

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection.on('ReceiveMessage', (message, time) => {
        console.log(time);
        setChat((prevChat) => {
          if (prevChat) {
            return {
              ...prevChat,
              messages: [
                ...prevChat.messages,
                {
                  text: message,
                  createdAt: time,
                },
              ],
            };
          }
          return prevChat;
        });
      });
    }
  }, [connection, currentUser.id]);

  // Open chat and fetch data from API
  const handleOpen = async (id) => {
    try {
      const res = await apiRequest.get(`/chats/${id}`);
      setChat(res.data);
      const test = await apiRequest.put(`/chats/read/${id}`);
      console.log(test);
      if (refreshChatList) {
        refreshChatList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Send chat message
  const handleSendChat = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get('text').trim();

    if (connection && text && chat) {
      try {
        // Check if `userIDs` exists
        if (chat.userIDs) {
          const receiverId = chat.userIDs.find((id) => id !== currentUser.id);

          if (receiverId) {
            // Send message via SignalR
            await connection.invoke('SendMessageAsync', chat.id, text);

            // Update UI immediately only if the message is sent
            setChat((prevChat) => ({
              ...prevChat,
              messages: [
                ...prevChat.messages,
                {
                  text,
                  userId: currentUser.id,
                },
              ],
            }));
          }
        }
      } catch (err) {
        console.error('Error sending message:', err);
      } finally {
        e.target.reset();
      }
    }
  };

  return (
    <div className='chat'>
      {/* Display chat list */}
      <div className='messages'>
        <h1>Messages</h1>
        {item &&
          item.map((i) => (
            <div
              key={i.id}
              className='message'
              onClick={() => handleOpen(i.id)}
              style={{
                backgroundColor:
                  i.seenBy.includes(currentUser.id) || chat?.id === i.id
                    ? 'white'
                    : '#fecd514e',
              }}
            >
              <img
                src={i.receiver[0].avatar || '/noavatar.png'}
                alt='i.receiver[0].username'
              />
              <span>{i.receiver[0].username}</span>
              <p>{i.lastMessage}</p>
            </div>
          ))}
      </div>

      {/* Chatbox */}
      {chat && (
        <div className='chatBox'>
          <div className='top'>
            <div className='user'>
              <img
                src={chat.receiver?.[0]?.avatar || '/noavatar.png'}
                alt={chat.receiver?.[0]?.username || 'User'}
              />
              {chat.receiver?.[0]?.username}
            </div>
            <span className='close' onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className='center'>
            {Array.isArray(chat.messages) && chat.messages.length > 0 ? (
              chat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`chatMessage ${
                    message.userId === currentUser.id ? 'own' : ''
                  }`}
                >
                  <p>{message.text}</p>
                  <span>{format(message.createdAt)}</span>
                </div>
              ))
            ) : (
              <p>No messages</p>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendChat} className='bottom'>
            <textarea name='text'></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;

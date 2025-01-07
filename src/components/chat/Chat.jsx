import { useContext, useEffect, useRef, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import './chat.scss';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';
import { format } from 'timeago.js';

const Chat = ({ item, refreshChatList }) => {
  const { currentUser } = useContext(AuthContext);
  const [chat, setChat] = useState(null);
  const [connection, setConnection] = useState(null); // Store SignalR connection
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]); // Run this whenever new messages are added

  // Connect to SignalR Hub
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5246/chathub') // Ensure the correct URL
      .build();

    newConnection
      .start()
      .then(() => {
        console.log('Connected to SignalR Hub');
        setConnection(newConnection);
      })
      .catch((err) => console.error('Error while connecting: ', err));

    // Listen for 'ReceiveMessage' event to receive messages
    newConnection.on('ReceiveMessage', (user, message, time) => {
      // Convert the received UTC time to local time
      console.log(time);
      setChat((prevChat) => {
        if (prevChat) {
          return {
            ...prevChat,
            messages: [
              ...prevChat.messages,
              {
                text: message,
                createdAt: time, // Use the local time here
              },
            ],
          };
        }
        return prevChat;
      });
    });
    connection.on('ReceiveMessage', (user, message, time) => {
      console.log('Message received:', { user, message, time });
    });

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []); // Only run on initial mount

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
    const text = formData.get('text');
    // Gửi tin nhắn qua SignalR
    if (connection && text.trim()) {
      try {
        // Gửi tin nhắn qua SignalR với thời gian
        await connection.invoke(
          'SendMessageAsync',
          currentUser.username,
          text.trim()
        );

        // Lưu tin nhắn vào cơ sở dữ liệu
        const res = await apiRequest.post(`/messages/add`, {
          text,
          chatId: chat.id,
        });

        if (res.data.status === 'success') {
          const updatedChat = {
            ...chat,
            messages: [...chat.messages, res.data.data],
          };
          setChat(updatedChat);
          if (refreshChatList) {
            refreshChatList();
          }
        }
      } catch (err) {
        console.error('Error sending message: ', err);
      } finally {
        e.target.reset(); // Reset form
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

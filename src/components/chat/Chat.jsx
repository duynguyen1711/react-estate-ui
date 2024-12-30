import { useContext, useEffect, useState } from 'react';
import './chat.scss';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';
import { format } from 'timeago.js';

const Chat = ({ item, refreshChatList }) => {
  const { currentUser } = useContext(AuthContext);
  const [chat, setChat] = useState(null);
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

  const handleSendChat = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get('text');
    try {
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
      console.log(err);
    } finally {
      e.target.reset();
    }
  };
  return (
    <div className='chat'>
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
      {chat && (
        <div className='chatBox'>
          <div className='top'>
            <div className='user'>
              <img
                src={
                  (chat.receiver && chat.receiver[0]?.avatar) || '/noavatar.png'
                }
                alt={(chat.receiver && chat.receiver[0]?.username) || 'User'}
              />
              {chat.receiver && chat.receiver[0]?.username}
            </div>
            <span className='close' onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className='center'>
            {Array.isArray(chat.messages) && chat.messages.length > 0 ? (
              chat.messages.map((message) => {
                return (
                  <div
                    key={message.id}
                    className={`chatMessage ${
                      message.userId === currentUser.id ? 'own' : ''
                    }`}
                  >
                    <p>{message.text}</p>
                    <span>{format(message.createdAt)}</span>
                  </div>
                );
              })
            ) : (
              <p>No messages</p> // Hiển thị khi không có tin nhắn
            )}
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

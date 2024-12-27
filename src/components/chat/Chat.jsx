import { useContext, useState } from 'react';
import './chat.scss';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

const Chat = ({ item }) => {
  console.log(item);
  const { currentUser } = useContext(AuthContext);
  const [chat, setChat] = useState(null);
  const handleOpen = async (id) => {
    try {
      const res = await apiRequest.get(`/chats/${id}`);
      setChat(res.data);
      console.log(res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get('text');
    const res = await apiRequest.post(`/messages/add`, {
      text,
      chatId: chat.id,
    });
    if (res.data.status === 'success') {
      setChat(res.data);
    }
    console.log(res.data);
    // setChat(res.data);
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
                src={chat.receiver[0].avatar || '/noavatar.png'}
                alt={chat.receiver[0].username}
              />
              {chat.receiver[0].username}
            </div>
            <span className='close' onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className='center'>
            {chat.messages.map((message) => (
              <div
                key={message.id}
                className={`chatMessage ${
                  message.userId === currentUser.id ? 'own' : ''
                }`}
              >
                <p>{message.text}</p>
                <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
              </div>
            ))}
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

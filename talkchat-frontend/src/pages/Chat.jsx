import React, {useEffect, useState, useRef} from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function Chat(){
  const { categoryId } = useParams();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const boxRef = useRef();

  const fetchMessages = async () => {
    try{
      const res = await api.get(`/messages/${categoryId}`);
      setMessages(res.data.messages);
    }catch(err){ console.error(err); }
  };

  const dataCategory = async () => {
    try{
      const res = await api.get(`/categories/${categoryId}`);
      setCategoryName(res.data.category.name);
    }catch(err){ 
      console.error(err);
      if (err.response?.status === 404) {
        setCategoryName('Category not found');
      }
    }
  };
  useEffect(()=>{
    dataCategory();
  },[categoryId,]);

  useEffect(()=>{
    fetchMessages();
    // you can poll or implement websockets later
    // eslint-disable-next-line
  },[categoryId]);

  useEffect(() => {
    // auto-scroll to bottom
    if(boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    if(!content.trim()) return;
    try{
      const user = JSON.parse(localStorage.getItem('user'));
      await api.post('/messages', { 
        category_id: categoryId, 
        content,
        user_id: user.id 
      });
      setContent('');
      await fetchMessages();
    }catch(err){ 
      console.error(err);
      if (err.response?.data?.errors) {
        // Display validation errors
        const errors = err.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(', ');
        alert(`Validation Error: ${errorMessages}`);
      } else {
        alert(err?.response?.data?.message || 'Failed to send message');
      }
    }
  };

  
  return (
    <div className="container">
    
      <h2>Chat Room - {categoryName}</h2>
      <div className="chat-box" ref={boxRef}>
        {messages.map((m, i) => {
          const user = JSON.parse(localStorage.getItem('user'));
          const currentDate = new Date(m.created_at).toDateString();
          // get the previous date check if it is the same as the current date or
          const prevDate = i > 0 ? new Date(messages[i-1].created_at).toDateString() : null;
          
          return (
            <div key={m.id}>
              {currentDate !== prevDate && <div style={{textAlign:'center',margin:'10px 0',color:'#666'}}>{currentDate}</div>}
              <div className={`message ${m.user_id === user.id ? 'own-message' : 'other-message'}`}>
                <strong>{m.user?.name || 'User'}:</strong> {m.content}
                <div style={{fontSize:12,color:'#666'}}>{new Date(m.created_at).toLocaleTimeString()}</div>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={send} style={{maxWidth:800, margin:'12px auto', display:'flex', gap:8}}>
        <input
          style={{flex:1}}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

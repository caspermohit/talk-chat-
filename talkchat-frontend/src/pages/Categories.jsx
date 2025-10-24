import React, {useEffect, useState} from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Categories(){
  const [cats,setCats] = useState([]);

  useEffect(()=>{
    const fetch = async () => {
      try{
        const res = await api.get('/categories');
        setCats(res.data.categories);
      }catch(err){
        console.error(err);
      }
    };
    fetch();
  },[]);

  return (
    <div className="container">
      <h2>Categories</h2>
      <div style={{display:'grid',gap:10}}>
        {cats.map(c => (
          <Link key={c.id} to={`/chat/${c.id}`} style={{padding:12, background:'#007bff', color:'#fff', borderRadius:8, textDecoration:'none'}}>{c.name}</Link>
        ))}
      </div>
    </div>
  );
}
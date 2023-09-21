import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function AdicionarEvento() {
  const Navigate = useNavigate();
  const colecaoDeEventosRef = collection(db, "eventos");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [local, setLocal] = useState(""); 
  const [horario, setHorario] = useState("");
  const [descricao, setDescricao] = useState("");

  const onSumbitEvent = async () => {
    try {
      await addDoc(colecaoDeEventosRef, {
        NomeEvento: eventName,
        dataDoEvento: eventDate,
        Local: local,
        Horário: horario,
        Descrição: descricao,
      });
    } catch (err) {
      console.error(err);
    }
    Navigate("/calendario-eventos");
  };

  return (
    <div className="Membros">
      <div>
        <h1>ADICIONAR EVENTO</h1>
      </div>
      <div>
        <div className="input-container">
          <input
            placeholder="Nome do evento"
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Data"
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Local"
            value={local}
            onChange={(e) => setLocal(e.target.value)} 
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Horário"
            value={horario}
            onChange={(e) => setHorario(e.target.value)} 
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)} 
          />
        </div>
        <button className="button" onClick={onSumbitEvent}>
          Cadastrar evento
        </button>
      </div>
    </div>
  );
}

export default AdicionarEvento;

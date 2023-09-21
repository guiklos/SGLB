import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import "./AdicionarMembro.css";
import { useNavigate } from "react-router-dom";

function AdicionarEventoEsportivo() {
  const colecaoDeEventosEsportivosRef = collection(db, "eventosEsportivos");

  // Data do novo evento esportivo
  const Navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const onSumbitEvent = async () => {
    try {
      await addDoc(colecaoDeEventosEsportivosRef, {
        NomeEventoEsportivo: eventName,
        dataEventoEsportivo: eventDate,
      });
    } catch (err) {
      console.error(err);
    }
    Navigate('/calendario-esportivo')
  }

  return (
    <div className="Membros">
      <div><h1>ADICIONAR EVENTO ESPORTIVO</h1></div>
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
          <input placeholder="Modalidade" />
        </div>
        <div className="input-container">
          <input placeholder="Adversário" />
        </div>
        <div className="input-container">
          <input placeholder="Arbitragem" />
        </div>
        <div className="input-container">
          <input placeholder="Coordenador" />
        </div>
        <button className="button" onClick={onSumbitEvent}>
          Cadastrar evento
        </button>
      </div>
    </div>
  );
}

export default AdicionarEventoEsportivo;

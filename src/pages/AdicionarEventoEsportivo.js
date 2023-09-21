
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
  const [modalidade, setModalidade] = useState("");
  const [adversario, setAdversario] = useState("");
  const [arbitragem, setArbitragem] = useState(""); 
  const [coordenador, setCoordenador] = useState("");
  const [dateError, setDateError] = useState("");

  const isDateValid = (date) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(date);
  };

  const onSumbitEvent = async () => {
    if (!isDateValid(eventDate)) {
      setDateError("Formato de data inválido. Use YYYY-MM-DD.");
      return;
    }

    try {
      await addDoc(colecaoDeEventosEsportivosRef, {
        NomeEventoEsportivo: eventName,
        dataEventoEsportivo: eventDate,
        Modalidade: modalidade,
        Adversario: adversario, 
        Arbitragem: arbitragem, 
        Coordenador: coordenador, 
      });
    } catch (err) {
      console.error(err);
    }
    Navigate('/calendario-esportivo');
  }

  return (
    <div className="Membros">
      <div>
        <h1>ADICIONAR EVENTO ESPORTIVO</h1>
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
            onChange={(e) => {
              setEventDate(e.target.value);
              setDateError(""); 
            }}
          />
          {dateError && <div className="error-message">{dateError}</div>}
        </div>
        <div className="input-container">
          <input
            placeholder="Modalidade"
            value={modalidade} 
            onChange={(e) => setModalidade(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Adversário"
            value={adversario} 
            onChange={(e) => setAdversario(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Arbitragem"
            value={arbitragem} 
            onChange={(e) => setArbitragem(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Coordenador"
            value={coordenador} 
            onChange={(e) => setCoordenador(e.target.value)}
          />
        </div>
        <button className="button" onClick={onSumbitEvent}>
          Cadastrar evento
        </button>
      </div>
    </div>
  );
}

export default AdicionarEventoEsportivo;

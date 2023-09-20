import React, { useEffect, useState } from "react";
import { Auth } from "../components/auth";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import NavBar from "../components/NavBar";
import "./AdicionarMembro.css"; // Importe seu arquivo CSS

function AdicionarMembro() {
  const [memberList, setMemberList] = useState([]);
  const colecaoDeMembrosRef = collection(db, "membro");

  // Data do novo usuário
  const [memberName, setMemberName] = useState("");
  const [memberModality, setMemberModality] = useState("");
  const [memberRG, setMemberRG] = useState(0);
  const [memberSex, setMemberSex] = useState("");
  const [memberContact, setMemberContact] = useState("");

  const onSumbitMember = async () => {
    try {
      await addDoc(colecaoDeMembrosRef, {
        Nome: memberName,
        Modalidade: memberModality,
        RG: memberRG,
        Sexo: memberSex,
        Contato: memberContact,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Membros">
      {/* <Auth /> */}
      <div>
        <div className="input-container">
          <input
            placeholder="Nome do membro"
            onChange={(e) => setMemberName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Modalidade"
            onChange={(e) => setMemberModality(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="RG"
            type="number"
            onChange={(e) => setMemberRG(Number(e.target.value))}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Sexo"
            onChange={(e) => setMemberSex(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Contato"
            onChange={(e) => setMemberContact(e.target.value)}
          />
        </div>
        <button className="button" onClick={onSumbitMember}>
          Cadastrar membro
        </button>
      </div>
      {/* <div>
        {memberList.map((membro) => (
          <div key={membro.id}>
            <h1>{membro.Nome}</h1>
            <p>Modalidade: {membro.Modalidade}</p>
            <p>RG: {membro.RG}</p>
            <p>Sexo: {membro.Sexo}</p>
            <p>Contato: {membro.Contato}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default AdicionarMembro;

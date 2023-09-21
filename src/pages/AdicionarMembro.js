import React, { useEffect, useState } from "react";
import { Auth } from "../components/auth";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import NavBar from "../components/NavBar";
import "./AdicionarMembro.css";
import { useNavigate } from "react-router-dom";

function AdicionarMembro() {
  const Navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);
  const colecaoDeMembrosRef = collection(db, "membro");

  // Data do novo usuário
  const [memberName, setMemberName] = useState("");
  const [memberModality, setMemberModality] = useState("");
  const [memberRG, setMemberRG] = useState(0);
  const [memberSex, setMemberSex] = useState("");
  const [memberContact, setMemberContact] = useState("");
  const [memberRA, setMemberRA] = useState(""); // RA
  const [memberCPF, setMemberCPF] = useState(""); // CPF
  const [memberCurso, setMemberCurso] = useState(""); // Curso
  const [memberCargo, setMemberCargo] = useState(""); // Cargo

  const onSumbitMember = async () => {
    try {
      await addDoc(colecaoDeMembrosRef, {
        Nome: memberName,
        Modalidade: memberModality,
        RG: memberRG,
        Sexo: memberSex,
        Contato: memberContact,
        RA: memberRA, // Add RA
        CPF: memberCPF, // Add CPF
        Curso: memberCurso, // Add Curso
        Cargo: memberCargo, // Add Cargo
      });
    } catch (err) {
      console.error(err);
    }
    Navigate('/gerenciar-membros')
  };

  return (
    <div className="Membros">
      {/* <Auth /> */}
      <div>
        <div className="input-container">
          <input
            placeholder="Nome completo"
            onChange={(e) => setMemberName(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            placeholder="RA"
            onChange={(e) => setMemberRA(e.target.value)} // RA
          />
        </div>

        <div className="input-container">
          <input
            placeholder="CPF"
            onChange={(e) => setMemberCPF(e.target.value)} // CPF
          />
        </div>

        <div className="input-container">
          <input
            placeholder="Curso"
            onChange={(e) => setMemberCurso(e.target.value)} // Curso
          />
        </div>

        <div className="input-container">
          <input
            placeholder="Cargo"
            onChange={(e) => setMemberCargo(e.target.value)} // Cargo
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

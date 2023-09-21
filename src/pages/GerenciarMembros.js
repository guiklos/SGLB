import React, { useEffect, useState } from "react";
import { Auth } from "../components/auth";
import { getDocs, collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import NavBar from "../components/NavBar";
import { Link, useLocation } from "react-router-dom";
import "./GerenciarMembros.css";
import { useNavigate } from "react-router-dom";

function GerenciarMembros() {

  const Navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const colecaoDeMembrosRef = collection(db, "membro");

  const [memberName] = useState("");
  const [memberModality] = useState("");
  const [memberRG] = useState(0);
  const [memberSex] = useState("");
  const [memberContact] = useState("");

  useEffect(() => {
    const getMemberList = async () => {
      try {
        const data = await getDocs(colecaoDeMembrosRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setMemberList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getMemberList();
  }, []);

  const [editingMemberId, setEditingMemberId] = useState(null);
const [updatedMemberData, setUpdatedMemberData] = useState({});

const handleDelete = async (memberId) => {
  try {
    await deleteDoc(doc(db, "membro", memberId));
    const updatedMemberList = memberList.filter((membro) => membro.id !== memberId);
    setMemberList(updatedMemberList);
  } catch (err) {
    console.error(err);
  }
};

const handleEdit = (memberId) => {
  setEditingMemberId(memberId);
  const memberToEdit = memberList.find((membro) => membro.id === memberId);
  setUpdatedMemberData({ ...memberToEdit });
};

const saveEdit = async () => {
  try {
    await updateDoc(doc(db, "membro", editingMemberId), updatedMemberData);
    setEditingMemberId(null);
    setUpdatedMemberData({});
  } catch (err) {
    console.error(err);
  }
  window.location.reload();
};



  const onSubmitMember = async () => {
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

  const sortMembers = (column) => {
    const order = sortOrder === "asc" ? 1 : -1;
    const sortedMembers = [...memberList].sort((a, b) => {
      if (a[column] < b[column]) return -1 * order;
      if (a[column] > b[column]) return 1 * order;
      return 0;
    });

    setMemberList(sortedMembers);
    setSortBy(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="Membros">

      <div className="container">
        <div>
          <Link to="/adicionar-membro">
            <button className="add-button">Adicionar Membro</button>
          </Link>
        </div>
        <div className="table-container">
          <table>
            <thead>
              {/* <th>Edit</th> */}
  <tr>
    <th onClick={() => sortMembers("Nome")}>
      Nome {sortBy === "Nome" && (
        <span className={`sort-indicator ${sortOrder === "asc" ? "asc" : "desc"}`}></span>
      )}
    </th>
    <th onClick={() => sortMembers("RA")}>
      RA {sortBy === "RA" && (
        <span className={`sort-indicator ${sortOrder === "asc" ? "asc" : "desc"}`}></span>
      )}
    </th>
    <th onClick={() => sortMembers("CPF")}>
      CPF {sortBy === "CPF" && (
        <span className={`sort-indicator ${sortOrder === "asc" ? "asc" : "desc"}`}></span>
      )}
    </th>
    <th onClick={() => sortMembers("Curso")}>
      Curso {sortBy === "Curso" && (
        <span className={`sort-indicator ${sortOrder === "asc" ? "asc" : "desc"}`}></span>
      )}
    </th>
    <th onClick={() => sortMembers("Cargo")}>
      Cargo {sortBy === "Cargo" && (
        <span className={`sort-indicator ${sortOrder === "asc" ? "asc" : "desc"}`}></span>
      )}
    </th>
    <th onClick={() => sortMembers("Modalidade")}>
      Modalidade {sortBy === "Modalidade" && (
        <span className={`sort-indicator ${sortOrder === "asc" ? "asc" : "desc"}`}></span>
      )}
    </th>
    <th onClick={() => sortMembers("RG")}>
      RG {sortBy === "RG" && (
        <span className={`sort-indicator ${sortOrder === "asc" ? "asc" : "desc"}`}></span>
      )}
    </th>
    <th onClick={() => sortMembers("Sexo")}>
      Sexo {sortBy === "Sexo" && (
        <span className={`sort-indicator ${sortOrder === "asc" ? "asc" : "desc"}`}></span>
      )}
    </th>
    <th onClick={() => sortMembers("Contato")}>
      Contato {sortBy === "Contato" && (
        <span className={`sort-indicator ${sortOrder === "asc" ? "asc" : "desc"}`}></span>
      )}
    </th>
  </tr>
</thead>

            <tbody>
  {memberList.map((membro) => (
  <tr key={membro.id}>
    <td>{membro.Nome}</td>
    <td>{membro.RA}</td>
    <td>{membro.CPF}</td>
    <td>{membro.Curso}</td>
    <td>{membro.Cargo}</td>
    <td>{membro.Modalidade}</td>
    <td>{membro.RG}</td>
    <td>{membro.Sexo}</td>
    <td>{membro.Contato}</td>
    <td>
      <button onClick={() => handleEdit(membro.id)}>Edit</button>
       <button onClick={() => handleDelete(membro.id)}>Excluir</button>
    </td>
  </tr>
))}
</tbody>

{editingMemberId && (
  <div className="edit-form">
    <h2>Edit Member</h2>
    <div className="form-group">
      <label className="form-label">Name:</label>
      <input
        className="form-input"
        type="text"
        value={updatedMemberData.Nome}
        onChange={(e) => setUpdatedMemberData({ ...updatedMemberData, Nome: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label className="form-label">RA:</label>
      <input
        className="form-input"
        type="text"
        value={updatedMemberData.RA}
        onChange={(e) => setUpdatedMemberData({ ...updatedMemberData, RA: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label className="form-label">CPF:</label>
      <input
        className="form-input"
        type="text"
        value={updatedMemberData.CPF}
        onChange={(e) => setUpdatedMemberData({ ...updatedMemberData, CPF: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label className="form-label">Curso:</label>
      <input
        className="form-input"
        type="text"
        value={updatedMemberData.Curso}
        onChange={(e) => setUpdatedMemberData({ ...updatedMemberData, Curso: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label className="form-label">Cargo:</label>
      <input
        className="form-input"
        type="text"
        value={updatedMemberData.Cargo}
        onChange={(e) => setUpdatedMemberData({ ...updatedMemberData, Cargo: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label className="form-label">Modalidade:</label>
      <input
        className="form-input"
        type="text"
        value={updatedMemberData.Modalidade}
        onChange={(e) => setUpdatedMemberData({ ...updatedMemberData, Modalidade: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label className="form-label">RG:</label>
      <input
        className="form-input"
        type="text"
        value={updatedMemberData.RG}
        onChange={(e) => setUpdatedMemberData({ ...updatedMemberData, RG: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label className="form-label">Sexo:</label>
      <input
        className="form-input"
        type="text"
        value={updatedMemberData.Sexo}
        onChange={(e) => setUpdatedMemberData({ ...updatedMemberData, Sexo: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label className="form-label">Contato:</label>
      <input
        className="form-input"
        type="text"
        value={updatedMemberData.Contato}
        onChange={(e) => setUpdatedMemberData({ ...updatedMemberData, Contato: e.target.value })}
      />
    </div>
    <div className="button-container">
      <button onClick={saveEdit}>Save</button>
      <button onClick={() => setEditingMemberId(null)}>Cancel</button>
    </div>
  </div>
)}



          </table>
        </div>
      </div>
    </div>
  );
}

export default GerenciarMembros;

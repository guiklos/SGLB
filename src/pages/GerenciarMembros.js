import React, { useEffect, useState } from "react";
import { Auth } from "../components/auth";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

function GerenciarMembros() {
  const [memberList, setMemberList] = useState([]);
  const [sortBy, setSortBy] = useState(null); // Estado para rastrear a coluna atualmente classificada
  const [sortOrder, setSortOrder] = useState("asc"); // Estado para rastrear a ordem de classificação

  const colecaoDeMembrosRef = collection(db, "membro");

  // Data do novo usuário
  const [memberName, setMemberName] = useState("");
  const [memberModality, setMemberModality] = useState("");
  const [memberRG, setMemberRG] = useState(0);
  const [memberSex, setMemberSex] = useState("");
  const [memberContact, setMemberContact] = useState("");

  useEffect(() => {
    const getMemberList = async () => {
      // Ler o BD
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

  // Função para classificar os membros com base na coluna especificada
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
      <div>
        <Link to="/adicionar-membro">
          <button>Adicionar Membro</button>
        </Link>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => sortMembers("Nome")}>
                Nome {sortBy === "Nome" && <span>({sortOrder === "asc" ? "A-Z" : "Z-A"})</span>}
              </th>
              <th onClick={() => sortMembers("Modalidade")}>
                Modalidade {sortBy === "Modalidade" && <span>({sortOrder === "asc" ? "A-Z" : "Z-A"})</span>}
              </th>
              <th onClick={() => sortMembers("RG")}>
                RG {sortBy === "RG" && <span>({sortOrder === "asc" ? "A-Z" : "Z-A"})</span>}
              </th>
              <th onClick={() => sortMembers("Sexo")}>
                Sexo {sortBy === "Sexo" && <span>({sortOrder === "asc" ? "A-Z" : "Z-A"})</span>}
              </th>
              <th onClick={() => sortMembers("Contato")}>
                Contato {sortBy === "Contato" && <span>({sortOrder === "asc" ? "A-Z" : "Z-A"})</span>}
              </th>
            </tr>
          </thead>
          <tbody>
            {memberList.map((membro) => (
              <tr key={membro.id}>
                <td>{membro.Nome}</td>
                <td>{membro.Modalidade}</td>
                <td>{membro.RG}</td>
                <td>{membro.Sexo}</td>
                <td>{membro.Contato}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GerenciarMembros;

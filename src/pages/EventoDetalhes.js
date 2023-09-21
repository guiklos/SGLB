import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';


function EventoDetalhes() {
  const { eventoId } = useParams();
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    const eventoRef = db.collection('eventosEsportivos').doc(eventoId);

    eventoRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setEvento(doc.data());
        } else {
          console.log('Evento não encontrado');
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar evento:', error);
      });
  }, [eventoId]);

  return (
    
    <div>
      <h2>Detalhes do Evento {eventoId}</h2>
      {/* Exiba os detalhes do evento com base no eventoId */}
    </div>
  );
}

export default EventoDetalhes;

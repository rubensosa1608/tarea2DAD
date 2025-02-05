// MonsterHunterCommands.jsx
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import monstersLista from './Monsters';

const MonsterHunterCommands = () => {
  const [message, setMessage] = useState('');
  const [nombre, setNombre] = useState('');
  const [color, setColor] = useState('');
  const [debilidad, setDebilidad] = useState('');
  const [habitat, setHabitat] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [image, setImage] = useState(null);

  const commands = [
    {
      command: 'Dime información sobre *',
      callback: (monsterName) => {
        const monster = monstersLista[monsterName.toLowerCase().trim()];
        if (monster) {
          setNombre(`🦖 **${monster.nombre}** `);
          setColor(`🌈 Color: ${monster.color} `);
          setDebilidad(`⚡ Debilidad: ${monster.debilidad}`);
          setHabitat(`🌲 Habitat: ${monster.habitat}`);
          setDescripcion(`📖 Descripción: ${monster.descripcion}`);
          setImage(monster.imagen);
        } else {
          setNombre(null);
          setColor(null);
          setDebilidad(null);
          setHabitat(null);
          setDescripcion(null);
          setImage(null);
          setMessage("No tenemos informacion sobre " + monsterName);
        }
      }
    }
  ];

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });
  console.log(transcript);
  
  if (!browserSupportsSpeechRecognition) {
    return <p>Tu navegador no soporta reconocimiento de voz.</p>;
  }

  return (
    <div>
      <h2>
        Monster Hunter Info
      </h2>
      <div>
        <button
          onClick={() => SpeechRecognition.startListening({ continuous: true, language: 'es-ES' })}
        >
          🎙️ Iniciar
        </button>
        <button
          onClick={SpeechRecognition.stopListening}
        >
          🛑 Detener
        </button>
      </div>
      <p>
        {nombre}
      </p>

      <p>
        {color}
      </p>

      <p>
        {debilidad}
      </p>

      <p>
        {habitat}
      </p>

      <p>
        {descripcion}
      </p>

      {image && (
        <img
          src={image}
          alt="Imagen del monstruo"
        />
      )}

      <p>
        {message}
      </p>
    </div>
  );
};

export default MonsterHunterCommands;

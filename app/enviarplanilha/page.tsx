"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function UploadPage() {
  const route = useRouter()
  const [file, setFile] = useState<File | null>();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      console.log('Nenhum arquivo selecionado!');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5050/planilha/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);

      route.push("/recuperado")
    } catch (error) {
      console.error(error);
      alert('Alguma Coisa deu Errado')
    }
  };
  const fileChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setFile(file[0]);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <form onSubmit={submitHandler}>
        <input
          type="file"
          accept=".xlsx"
          onChange={fileChangedHandler}
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Enviar
        </button>
      </form>
    </div>
  );
}

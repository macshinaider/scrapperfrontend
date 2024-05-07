"use client";
import { backend } from "@/libs/axios";
import { useEffect, useState } from "react";

export default function CarTable() {
  const [carros, setCarros] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      backend
        .get("/veiculosencontrados")
        .then((response) => {
          setCarros(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar carros:", error);
        });
    }, 10000); // Fetch a cada 10 segundos

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <div className="container">
      <h1>Carros Encontrados</h1>
      <div className="table-responsive w-full items-center">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>PLACA</th>
              <th>UF</th>
              <th>MODELO</th>
              <th>CHASSI</th>
              <th>ANO</th>
            </tr>
          </thead>
          <tbody>
            {carros.map((carro: any) => (
              <tr key={carro.id}>
                <td>{carro.id}</td>
                <td>{carro.veiculos.placaVeiculo}</td>
                <td>{carro.veiculos.codigoUnidadeFederal}</td>
                <td>{carro.veiculos.nomeModelo}</td>
                <td>{carro.veiculos.numeroChassisVeiculo}</td>
                <td>{carro.veiculos.anoModelo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

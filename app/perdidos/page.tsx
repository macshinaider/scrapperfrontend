"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backend } from '@/libs/axios';

type Vehicle = {
  id: number;
  placaVeiculo: string;
  codigoUnidadeFederal: string;
  numeroChassisVeiculo: string;
  anoModelo: string;
  nomeModelo: string;
  rj: boolean;
  mg: boolean;
  bh: boolean;
};

function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage] = useState(100);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await backend.get('/veiculosperdidos');
      setVehicles(response.data);
    };

    fetchVehicles();
  }, []);

  // Atualizar a página atual
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  // Obter veículos atuais
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

  // Filtrar veículos
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.placaVeiculo.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.codigoUnidadeFederal.toLowerCase().includes(search.toLowerCase())
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(vehicles.length / vehiclesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <input
              type='text'
              placeholder='Pesquisar...'
              onChange={(e) => setSearch(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Placa do Veículo
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Código da Unidade Federal
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Número do Chassi do Veículo
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Ano do Modelo
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Nome do Modelo
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredVehicles.map((vehicle: any) => (
                  <tr key={vehicle.id}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {vehicle.placaVeiculo}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {vehicle.codigoUnidadeFederal}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {vehicle.numeroChassisVeiculo}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {vehicle.anoModelo}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {vehicle.nomeModelo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='pagination flex gap-1 justify-center text-xl'>
              <button onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}>&lt;</button>
              {pageNumbers.slice(currentPage - 1, currentPage + 7).map((number) => (
                <button key={number} onClick={() => paginate(number)}>
                  {number}
                </button>
              ))}
              <button onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : currentPage)}>&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleList;

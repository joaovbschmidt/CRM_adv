import { useState, useMemo } from 'react';
import { INITIAL_PROCESSOS } from '../data/mockProcessos';
import { genId } from '../utils/idGenerator';

export function useProcessos() {
  const [processos, setProcessos] = useState(INITIAL_PROCESSOS);
  const [searchProcesso, setSearchProcesso] = useState('');

  const filteredProcessos = useMemo(() => {
    if (!searchProcesso.trim()) return processos;
    const q = searchProcesso.toLowerCase();
    return processos.filter(p =>
      p.dadosPessoais.nomeCompleto.toLowerCase().includes(q) ||
      p.dadosPessoais.numeroProcesso.toLowerCase().includes(q) ||
      p.dadosPessoais.tipoAcao.toLowerCase().includes(q)
    );
  }, [processos, searchProcesso]);

  const saveProcesso = (proc) => {
    if (processos.find(p => p.id === proc.id)) {
      setProcessos(prev => prev.map(p => p.id === proc.id ? proc : p));
    } else {
      setProcessos(prev => [...prev, { ...proc, id: proc.id || genId() }]);
    }
  };

  const deleteProcesso = (id) => {
    setProcessos(prev => prev.filter(p => p.id !== id));
  };

  const changeFase = (id, fase) => {
    setProcessos(prev => prev.map(p => p.id === id ? { ...p, fase } : p));
  };

  const getNomeProcesso = (id) => {
    const p = processos.find(x => x.id === id);
    return p ? p.dadosPessoais.nomeCompleto : '—';
  };

  return {
    processos,
    filteredProcessos,
    searchProcesso,
    setSearchProcesso,
    saveProcesso,
    deleteProcesso,
    changeFase,
    getNomeProcesso
  };
}

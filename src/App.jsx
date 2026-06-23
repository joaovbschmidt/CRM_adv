import { useState } from 'react';
import CrmJuridico from './CrmJuridico';
import { LoginScreen } from './auth/loginscreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Se o usuário não estiver autenticado, mostra a tela de login
  if (!isAuthenticated) {
    return (
      <LoginScreen 
        onSubmit={async (data) => {
          // TODO: Adicione sua lógica de autenticação real aqui (API, Firebase, etc)
          console.log("Credenciais recebidas:", data);
          // Simula um login com sucesso:
          setIsAuthenticated(true);
        }} 
      />
    );
  }

  // Se estiver autenticado, mostra o sistema principal
  return <CrmJuridico />;
}

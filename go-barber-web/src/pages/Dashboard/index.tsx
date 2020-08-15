import React, { useCallback } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';
import logoImg from '../../assets/logo.svg';
import { Header, HeaderContent, Profile } from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { addToast } = useToast();

  const handleSignOut = useCallback(async () => {
    try {
      signOut();
      addToast({
        type: 'success',
        title: 'Logout efetuado com sucesso',
        description: 'Saindo...',
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro no logout',
        description: 'Ocorreu um erro ao fazer logout.',
      });
    }
  }, [addToast, signOut]);

  return (
    <>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={handleSignOut}>
            <FiLogOut />
          </button>
        </HeaderContent>
      </Header>
      {/* <Content /> */}
    </>
  );
};

export default Dashboard;

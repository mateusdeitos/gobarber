/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../hooks/ToastContext';
import { Container } from './styles';

interface ToastProps {
  toast: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ toast, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);

    /* Função é automaticamente executada quando o componente Toast
      deixar de existir. Dessa forma, se o user clicar para fechar
      o Toast, o timer não é executado quando o Toast não existir mais */
    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, toast.id]);

  return (
    <Container
      type={toast.type}
      hasdescription={Number(!!toast.description)}
      style={style}
      data-testid="toast-container"
    >
      {icons[toast.type || 'info']}
      <div>
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
      </div>
      <button onClick={() => removeToast(toast.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;

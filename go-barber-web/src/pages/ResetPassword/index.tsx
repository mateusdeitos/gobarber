/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content, AnimationContainer, Background } from './styles';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import logo from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/ToastContext';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData): Promise<void> => {
      try {
        // Seta os erros como vazio antes de iniciar, pois ao ter sucesso acaba não removendo o último erro do form
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('A senha é obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'A confirmação de senha não coincide',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        addToast({
          type: 'success',
          title: 'Reset de senha efetuado com sucesso',
          description: 'Redirecionando...',
        });

        history.push('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar a senha',
          description: 'Ocorreu um erro ao resetar a senha, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Nova Senha"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirmação de Senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;

import React, { useRef, useCallback } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.png';
import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
} from './styles';

import Input from '../../components/input';
import Button from '../../components/button';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData): Promise<void> => {
      try {
        // Seta os erros como vazio antes de iniciar, pois ao ter sucesso acaba não removendo o último erro do form
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório'),
          email: Yup.string()
            .required('O e-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'A senha deve ter no mínimo 6 dígitos'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);

        Alert.alert('Cadastro realizado com sucesso',
          'Você já pode fazer login na aplicação.');

        navigation.navigate('SignIn');

        // addToast({
        //   type: 'success',
        //   title: 'Cadastro realizado com sucesso',
        //   description: 'Você já pode fazer o seu logon no GoBarber',
        // });

        // history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }
        // await addToast({
        //   type: 'error',
        //   title: 'Erro no cadastro',
        //   description: 'Ocorreu um erro ao fazer o cadastro.',
        // });
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp} style={{ width: '100%' }}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"

                autoCapitalize="words"
                blurOnSubmit={false}
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}

              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                blurOnSubmit={false}

                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                secureTextEntry
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button onPress={() => { formRef.current?.submitForm(); }}>Criar</Button>
            </Form>
          </Container>
        </ScrollView>

      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => navigation.goBack()}>
        <>
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackToSignInText>Voltar para login</BackToSignInText>
        </>
      </BackToSignIn>
    </>
  );
};

export default SignUp;

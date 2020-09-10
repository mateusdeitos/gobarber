import React, {
  useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, InputIcon } from './styles';

// Da mesma forma como foi feito ao Button, é criada uma interface
// para definir os parâmetros que o Input irá receber.
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {

  }
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void
}

// 'ref' serve para passar uma referência ao input quando, por exemplo, for necessário
// mudar o foco para outro campo e o tipo do input deixa de ser React.FC e passa a ser React.RefForwardingComponent
const Input: React.RefForwardingComponent<InputRef, InputProps> = ({
  name, icon, containerStyle = {}, ...rest
}, ref) => {
  const inputElementRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  // Faz o registro do input no unform
  const {
    registerField, defaultValue = '', fieldName, error,
  } = useField(name);

  // Cria a referência para o input
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // Se houver algo no input, seta isFilled = true
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  // É preciso usar esse hook devido ao return já conter uma propriedade chamada 'ref', dessa forma,
  // o elemento que passou o ref, irá receber o focus
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',

      setValue(ref: any, value) {
        inputValueRef.current.value = value;

        // Para mudar visualmente o texto no input
        inputElementRef.current.setNativeProps({ text: value });
      },

      // O que irá fazer ao limpar o elemento
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isFocused={isFocused} hasError={!!error}>
      <InputIcon name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : '#666360'} />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark" // muda o tema do teclado
        defaultValue={defaultValue}
        placeholderTextColor="#666360"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);

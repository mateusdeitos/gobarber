import styled from 'styled-components';

export const Header = styled.div`
  background-color: #28262e;
  padding: 32px 0;
`;
export const HeaderContent = styled.div`
  max-width: 1120px;
  /* margin: 0 auto é o que irá fazer o HeaderContent respeitar o espaçamento no início */
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    border: 0;
    background: transparent;
    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;
export const Profile = styled.div`
  margin-left: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    height: 56px;
    width: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }

  span {
    color: #f4ede8;
  }

  strong {
    color: #ff9000;
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;
export const Schedule = styled.div`
  flex: 1;
  margin: 0 auto;

  h1 {
    font-size: 36px;
    font-weight: 500;
    line-height: 47px;
    color: #f4ede8;
  }

  p {
    display: flex;
    align-items: center;
    span {
      display: flex;
      align-items: center;
      color: #ff9000;
      font-size: 16px;
      font-weight: 500;
      line-height: 21px;
    }
    span + span::before {
      content: '';
      width: 1px;
      margin: 0 8px;
      height: 16px;
      background: #ff9000;
    }
  }
`;
export const NextAppointment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 64px;

  strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    font-weight: 400px;
  }

  div {
    display: flex;
    margin-top: 24px;
    flex-direction: row;
    align-items: center;
    flex: 1;
    background-color: #3e3b47;
    border-radius: 10px;
    width: 640px;
    padding: 16px 24px;

    /* Serve para fazer a borda laranja */
    position: relative;

    /* Borda laranja */
    &::before {
      /* Content é necessário, sem ele nada será exibido */
      content: '';
      /* Fixa a posição */
      position: absolute;
      height: 80%;
      /* Como o tamanho é 80% da div, para centralizar a borda, o top deve ser 10% */
      top: 10%;
      width: 2px;
      background: #ff9000;
      /* Define a posição como sendo no início da div */
      left: 0;
    }

    strong {
      font-size: 24px;
      line-height: 32px;
      color: #f4ede8;
      margin-left: 24px;
    }

    img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
    }

    span {
      display: flex;
      align-items: center;
      font-size: 20px;
      color: #999591;
      line-height: 26px;
      margin-left: auto;

      svg {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        color: #ff9000;
      }
    }
  }
`;

export const Calendar = styled.div`
  width: 380px;
`;

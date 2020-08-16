import styled from 'styled-components';
import { shade } from 'polished';

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

    img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
    }
    strong {
      font-size: 24px;
      line-height: 32px;
      color: #f4ede8;
      margin-left: 24px;
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
        margin-right: 8px;
        color: #ff9000;
      }
    }
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 48px;
  width: 640px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    font-weight: 400px;
    display: block;
    border-bottom: 1px solid #3e3b47;
    padding-bottom: 16px;
    margin-bottom: 24px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;
  width: 640px;

  & + & {
    margin-top: 16px;
  }

  span {
    display: flex;
    align-items: center;
    margin-right: 24px;
    svg {
      color: #ff9000;
      height: 20px;
      width: 20px;
      margin-right: 8px;
    }
  }

  div {
    display: flex;
    flex: 1;
    align-items: center;
    background: #3e3b47;
    border-radius: 10px;
    padding: 16px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 16px;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 26px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

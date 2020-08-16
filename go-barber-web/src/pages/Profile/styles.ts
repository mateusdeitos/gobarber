import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;

    a {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        height: 24px;
        width: 24px;
        color: #999591;
      }
    }
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -175px auto 0;
  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 20px;
      text-align: left;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  width: 186px;
  height: 186px;
  align-self: center;
  position: relative;
  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
  }
`;

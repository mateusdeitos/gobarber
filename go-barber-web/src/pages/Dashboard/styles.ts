import styled from 'styled-components';

export const Header = styled.div`
  background-color: #28262e;
  padding: 32px 0;
  margin-bottom: 64px;
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

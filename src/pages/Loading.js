import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
position: absolute;
width: 100vw;
height: 100vh;
top: 0;
left: 0;
background: #ffffffb7;
z-index: 999;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const LoadingText = styled.div`
font: 1rem 'Noto Sans KR';
text-align: center;
`;


const Loading = () => {
    return (
        <Background>
            <LoadingText>잠시만 기다려 주세요. (테스트 지연중) </LoadingText>
            <img src='/Spinner.svg' alt="로딩중" className='w-1/6' />
        </Background>
    )
};

export default Loading;
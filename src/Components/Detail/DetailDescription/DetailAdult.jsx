import { styled } from 'styled-components';

const DetailAdultWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.red};
    color: ${(props) => props.theme.red};
    font-size: 0.85rem;
`;

export default function DetailAdult({ data }) {
    return (
        <DetailAdultWrapper style={{ display: data.adult ? 'flex' : 'none' }}>
            <span>18</span>
        </DetailAdultWrapper>
    );
}

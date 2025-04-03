// 1. props의 타입을 interface로 정의
interface ListProps {
  tech: string;
  name: string;
  food: string;
}

// 2. 구조분해 할당으로 props 받기 + 타입 지정
const List = ({ tech, name, food }: ListProps) => {
  console.log(name, tech, food);
  return (
    <li>
      <strong>{name}</strong>는 <em>{tech}</em> 기술을 사용하며,{' '}
      <span>{food}</span>를 좋아합니다.
    </li>
  );
};
export default List;

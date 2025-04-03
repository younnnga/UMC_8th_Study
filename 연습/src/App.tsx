import './App.css';
// 1. List Component를 Import 해줍니다.
import List from './components/List';

function App() {
  const nickname = '주디';
  const sweetPotato = '고구마';
  const array = [
  { name: "헤일리", tech: "REACT", food: "녹차" },
  { name: "율무", tech: "REACT", food: "율무차" },
  { name: "주디", tech: "VUE", food: "커피" },
  ];

  return (
    <>
      <strong className="school">상명대학교</strong>
      <p style={{ color: 'purple', fontWeight: 'bold', fontSize: '3rem' }}>
        {nickname}/김용민
      </p>
      <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
      <ul>
        {array.map((item, idx) => (
          <List key={idx} name={item.name} tech={item.tech} food={item.food} />

        ))}
      </ul>
    </>
  );
}

export default App;

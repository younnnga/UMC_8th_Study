import { useEffect, useState } from 'react';
import { getMyInfo } from '../apis/auth';
import { ResponseMyInfoDto } from '../types/auth';

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log(response);
        setData(response);
      } catch (error) {
        console.error('내 정보 불러오기 실패:', error);
      }
    };

    getData();
  }, []);

  if (!data) return <div>로딩 중...</div>;

  return (
    <div>
      <p>이름: {data.data.name}</p>
      <p>이메일: {data.data.email}</p>
    </div>
  );
};

export default MyPage;


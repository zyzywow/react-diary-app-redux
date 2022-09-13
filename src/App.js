import "./App.css";
import "./css/layout.css";
import Header from "./compornents/Header";
import Footer from "./compornents/Footer";
import DiaryEditor from "./compornents/DiaryEditor";
import DiaryList from "./compornents/DiaryList";
import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

function App() {
  const dataID = useRef(0);
  // useRef = 화면이 렌더링되어서 값이 초기화 되는걸 막고싶을때 도는 Dom제어할때..
  // app.js에서 데이터관리...자식에게 props로데이터 전달해서 거기서 함수 실행을 하고 부모에서 데이터 바뀌는 것을 테스트 해봤음..

  const diaryData = useSelector((state) => {
    return state.diaryList;
  });
  // const count = useSelector((state) => {
  //   return state.count;
  // });
  const diaryAnalysis = useMemo(() => {
    console.log("일기분석을 시작합니다.");
    const total = diaryData.length;
    const good = diaryData.filter((item, idx) => {
      return item.emotion >= 3;
    }).length;
    const bad = total - good;
    const percent = Math.floor((good / total) * 100 * 1000) / 1000;

    console.log(percent);
    return {
      good: good,
      bad: bad,
      percent: percent,
      total: total,
      // 넘어오는 키와밸류값이같을경우 하나만써도됨.
      // good,
      // bad,
      // percent,
    };
  }, [diaryData]);
  // useEffect()랑 비슷함. \ 렌더링을 최소화 하기위해서 쓴다.

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <DiaryEditor />
        <div className="infoBox container">
          <dl>
            <dt>전체 :</dt>
            <dd>
              <strong>{diaryAnalysis.total}</strong>
            </dd>
          </dl>
          <dl>
            <dt>기분좋은 날 : </dt>
            <dd>
              <strong>{diaryAnalysis.good}</strong>
            </dd>
          </dl>
          <dl>
            <dt>기분 안좋은 날 : </dt>
            <dd>
              <strong>{diaryAnalysis.bad}</strong>
            </dd>
          </dl>
          <dl>
            <dt>퍼센트</dt>
            <dd>
              <strong>{diaryAnalysis.percent}%</strong>
              {/* {console.log(parseInt(diaryAnalysis))} */}
            </dd>
          </dl>
        </div>
        <DiaryList diaryList={diaryData} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

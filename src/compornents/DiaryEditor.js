import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { insertDiary } from "../store/diary";
export default function DiaryEditor() {
  const dispatch = useDispatch();
  const count = useSelector((state) => {
    return state.count;
  });

  const writerRef = useRef();
  const contentsRef = useRef();
  const [diaryItem, setDiaryItem] = useState({
    writer: "",
    contents: "",
    emotion: 1,
  });
  const insertDiaryItem = function () {
    if (diaryItem.writer.length < 3) {
      alert("글쓴이는 최소 3글자 이상이어야 합니다.");
      writerRef.current.focus();
      return false;
    } else if (diaryItem.contents.length < 10) {
      alert("내용은 최소 10글자 이상이어야 합니다.");
      contentsRef.current.focus();
      return false;
    }

    dispatch(insertDiary({ id: count + 1, date: new Date().getTime(), ...diaryItem }));
    alert("일기가 저장되었습니다.");
    setDiaryItem({
      writer: "",
      contents: "",
      emotion: 1,
    });
  };
  function changeDiaryItem(e) {
    setDiaryItem({
      ...diaryItem,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div className="container">
      <div className="section">
        <input type="text" value={diaryItem.writer} name="writer" placeholder="이름을 입력해주세요." ref={writerRef} onChange={changeDiaryItem} />
      </div>
      <div className="contents section">
        <textarea name="contents" id="" cols="30" rows="10" value={diaryItem.contents} ref={contentsRef} placeholder="내용을 입력해주세요." onChange={changeDiaryItem}></textarea>
      </div>
      <div className="section">
        <label>오늘 하루 어땠나요?</label>
        <select name="emotion" id="" value={diaryItem.emotion} onChange={changeDiaryItem}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="btns section">
        <button className="btn btnSave" onClick={insertDiaryItem}>
          SAVE
        </button>
      </div>
    </div>
  );
}

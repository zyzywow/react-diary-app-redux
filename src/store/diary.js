export const ACTIONS_TYPE = {
  INSERT_DIARY: "insertDiary",
  MODIFY_DIARY: "modifyDiary",
  DELETE_DIARY: "deleteDiary",
};
// 여기에 여러가지 속성들을 넣어서 쓰면 된다...
const initState = {
  count: 3,
  diaryList: [
    { id: 0, writer: "가나다", contents: "redux를 배우고 있습니다.", emotion: 4, date: new Date().getTime() },
    { id: 1, writer: "유재석", contents: "국민MC 메뚜기 ", emotion: 4, date: new Date().getTime() },
    { id: 2, writer: "박명수", contents: "박명수는 무한도전 2인자.", emotion: 4, date: new Date().getTime() },
    { id: 3, writer: "정우성", contents: "좋은놈 나쁜놈 이상한놈", emotion: 4, date: new Date().getTime() },
  ],
};

export const insertDiary = (diaryItem) => {
  return {
    type: ACTIONS_TYPE.INSERT_DIARY,
    payload: diaryItem,
  };
};
export const deleteDiary = (id) => {
  return {
    type: ACTIONS_TYPE.DELETE_DIARY,
    payload: { id },
  };
};
export const modifyDiary = (id, localContents) => {
  return {
    type: ACTIONS_TYPE.MODIFY_DIARY,
    payload: { id, localContents },
  };
};
const diary = (state = initState, action) => {
  console.log(action);
  // action은obj , {type,payload}
  switch (action.type) {
    case ACTIONS_TYPE.INSERT_DIARY: {
      const newDiaryItem = {
        ...action.payload,
      };
      return {
        count: state.count + 1, //고유한 값으로 사용
        diaryList: [newDiaryItem, ...state.diaryList],
      };
    }
    case ACTIONS_TYPE.MODIFY_DIARY: {
      const id = action.payload.id;
      const localContents = action.payload.localContents;
      return {
        count: state.count,
        diaryList: state.diaryList.map((item, idx) => {
          return item.id === id ? { ...item, contents: localContents } : item;
        }),
      };
    }
    case ACTIONS_TYPE.DELETE_DIARY: {
      return {
        count: state.count - 1, //고유한 값으로 사용
        diaryList: state.diaryList.filter((item, idx) => {
          return item.id !== action.payload.id;
        }),
      };
    }

    default:
      return state;
  }
};

export default diary;

/*   loading 상태만 따로 관리하는 모듈*/

import { createAction, handleActions } from "redux-actions";

const START_LOADING = "loading/START_LOADING"; // 요청을 위한 액션 타입을 payload 로 설정
const FINISH_LOADING = "loading/FINISH_LOADING";

export const startLoading = createAction(
  //start Loading이라는 함수 생성
  START_LOADING,
  (requestType) => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);

const initialState = {}; //초기화 상태 로 빈 객체 전달

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState
);

export default loading;

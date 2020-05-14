//추후 다른 리듀서에서 사가를 만들어 등록할것이기 때문에 루트 사가를 만든다.
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { counterSaga } from "./counter";
import sample from "./sample";
import loading from "./loading";

const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

export function* rootSaga() {
  //all 함수는 여러 사가를 합쳐주는 역할을 한다.
  yield all([counterSaga()]);
}

export default rootReducer;

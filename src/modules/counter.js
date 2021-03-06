import { createAction, handleActions } from "redux-actions";
import { delay, put, takeEvery, takeLatest, select } from "redux-saga/effects";

// select : saga 내부에서 현재 상태를 조회하는 방법

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록 ()=> undefined를 두번째 파라미터로 넣어준다.
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

// 제너레이터 함수를 만들때는  function* 키워드를 사용한다.
// 제너레이터함수를 호출했을 때 반환되는 객체를 제너레이터라고 한다.
// 제너레이터 함수를 사용하면 함수에서 값을 순차적으로 , 임의적으로 반환할 수 있다.
function* increaseSaga() {
  yield delay(1000); //1초를 기다린다.
  yield put(increase()); // 특정 액션(INCREASE)을 dispatch 한다.
  const number = yield select((state) => state.number); //state는 스토어 상태를 의미.
  console.log(`현재값은${number}임`);
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease()); //특정 액션(DECREASE)을 dispatch 한다.
}

export function* counterSaga() {
  //takeEvery 는 들어오는 모든 액션에 대해 특정 작업을 처리해 준다.
  yield takeEvery(INCREASE_ASYNC, increaseSaga);

  //takeLatest 는 기존에 진행중이던 작업이 있으면 취소 처리하고 가장 마지막에 실행된 작업만 수행한다.
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0; //

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;

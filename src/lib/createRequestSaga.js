/* 반복되는 코드를 따로 함수화 해서 리팩토링 하기*/
import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/loading";

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  //파라미터로 action을 받아오면 액션의 정보를 조회할 수 있다.
/* redux - saga 미들웨어와 yield하는 제너레이터 함수로 구현됨
   yield 된 오브젝트들은 미들웨어에 의해 해석하는 명령의 한 종류이다. */
  return function* (action) {
    yield put(startLoading(type)); //로딩 시작

    try {
      //call을 사용하면 promise를 반환하는 함수를 호출하고 기다릴 수 있다.
      // 첫번째 파라미터는  호출하고싶은 함수 , 나머지 파라미터는 해당 함수에 넣어주고싶은 인수 이다.
      const response = yield call(request, action.payload); // === request(action.payload)

      yield put({
        // put은 '이펙트'의 일종 이다.
        // 이펙트는 미들웨어에 의해서 수행되는 명령을 담고있는 자바스크립트 객체이다.
        // put은 redux store 에 dispatch 하는 역할을 한다.
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}

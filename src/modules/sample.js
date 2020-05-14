import { createAction, handleActions } from "redux-actions"; //handleAction 이라는 reducer는  보통 action 처리와 error action 처리를 하기 위해 사용한다.
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";
import { startLoading, finishLoading } from "./loading";

//------------------------- 엑션 타입을 설정하기
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

function* getPostSaga(action) {
  yield put(startLoading(GET_POST)); //로딩 시작

  //파라미터로 action을 받아오면 액션의 정보를 조회할 수 있다.
  try {
    //call을 사용하면 promise를 반환하는 함수를 호출하고 기다릴 수 있다.
    // 첫번째 파라미터는  호출하고싶은 함수 , 나머지 파라미터는 해당 함수에 넣어주고싶은 인수 이다.
    // GET_POST액션같은 경우에는 API요청을 할때 어떤 id로 조회할지 정해주어야한다.
    // 
    const post = yield call(api.getPost, action.payload); // === api.getPost(action.payload)
    yield put({
      type: GET_POST_SUCCESS,
      payload: post.data,
    });
  } catch (e) {
    console.log("에러>>", e);
    yield put({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_POST)); //로딩 완료
}

function* getUsersSaga() {
  yield put(startLoading(GET_USERS));

  try {
    const users = yield call(api.getUsers);
    yield put({
      type: GET_USERS_SUCCESS,
      payload: users.data,
    });
  } catch (e) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_USERS));
}

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

const initialState = {
  post: null,
  users: null,
};

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,

      post: action.payload,
    }),

    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,

      users: action.payload,
    }),
  },
  initialState
);

export default sample;

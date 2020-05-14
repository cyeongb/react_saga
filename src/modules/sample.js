import { createAction, handleActions } from "redux-actions"; //handleAction 이라는 reducer는  보통 action 처리와 error action 처리를 하기 위해 사용한다.
import { takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";
import createRequestSaga from "../lib/createRequestSaga"; //loading 상태, call,put 렌더 되어있음

//------------------------- 엑션 타입을 설정하기
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";

export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

// 로딩중인 상태는 loading이라는 객체에서 관리함
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

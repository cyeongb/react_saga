import { startLoading, finishLoading } from "../modules/loading";

export default function createRequestThunk(type, request) {
  //성공, 실패 , 액션 타입 설정
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return (params) => async (dispatch) => {
    dispatch({ type }); //요청이 시작된것을 알린다. dispatch 라는 함수로 요청(type값)을 보낸다.

    try {
      console.log("params>>", params);
      //성공시
      const response = await request(params); // params 요청의 비동기처리가 완료되면 response 에 담는다.

      dispatch({
        type: SUCCESS,
        payload: response.data, //payload 는 "전송되는 데이터" 를 의미하는데 보내고자하는 "데이터 자체" 를 의미한다.
      });
      dispatch(finishLoading(type));
    } catch (e) {
      //실패시
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      });
      dispatch(startLoading(type));
      throw e;
    }
  };
}

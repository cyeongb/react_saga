import React from "react";
import { connect } from "react-redux";
import Sample from "../components/Sample";
import { getPost, getUsers } from "../modules/sample";

const { useEffect } = React;

const SampleContainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers,
}) => {
  console.log("container _ const SampleContainer()");
  console.log(" SampleContainer() _ loading users>>", loadingUsers);
  console.log(" SampleContainer() _ post>>", post);
  console.log(" SampleContainer() _ loading post>>", loadingPost);
  console.log(" SampleContainer() _ users>>", users);
  // 클래스 형태의 컴포넌트였다면 componentDidMount
  useEffect(() => {
    const fn = async () => {
      //useEffect 에 파라미터로 넣는 함수는  async로 할 수 없기 때문에
      // 내부에서 async함수를 선언하고 호출한다.
      try {
        // useEffect 함수로 getPost 와 getUsers 함수가 렌더링되면 각(4번째,1번째) 값을 부른다.
        await getPost(4);
        await getUsers(1);
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  }, [getPost, getUsers]);

  return (
    //반환으로 Sample 컴포넌트를 렌더링 하는데 , 각 객체에 맞게 대입해 준다.
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

export default connect(
  //connect => 특정 함수(SampleContainer)를 props로 받아와서 사용할 수 있는 패턴
  ({ sample, loading }) => ({
    post: sample.post, //action.payload
    users: sample.users, //action.payload
    loadingPost: loading["sample/GET_POST"],
    loadingUsers: loading["sample/GET_USERS"],
  }),
  {
    getPost,
    getUsers,
  }
)(SampleContainer);

import React from "react";

const sample = ({ loadingPost, loadingUsers, post, users }) => {
  console.log("components _ const sample()");
  console.log("sample() _ loading post>>", loadingPost);
  console.log("sample() _ loading users>>", loadingUsers);
  console.log("sample() _ post>>", post);
  console.log("sample() _ users>>", users);
  return (
    <div>
      <section>
        <h1> &nbsp;&nbsp;&nbsp; &nbsp; P O S T </h1>
        {
          loadingPost &&
            "loading posts . . ." /* && : 유효성 검사임 !  =>>해당 객체가 유효할 때만 내부의 값을 보여준다. 데이터가 없는 상태이면 오류가 난다 !
                                                예를들어 post && ~~ 이라하면 post가 유효한 객체일때만 적용이 되고, 그 내부의 post.title 값 등을 보여준다. */
        }
        {!loadingPost && post && (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        )}
      </section>
      <hr />
      <section>
        <h1>&nbsp;&nbsp;&nbsp; &nbsp; U S E R S </h1>
        {loadingUsers && "loading users . . ."}
        {!loadingUsers && users && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username}[{user.email}]
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default sample;

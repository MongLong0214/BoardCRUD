import React, { useContext, Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../App";

import styled from "styled-components";

import Nav from "./style/Nav";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/main");
  };

  return (
    <nav activeKey={location.pathname}>
      {/* <h1>안녕하세요, 포트폴리오 공유 서비스입니다.</h1> */}
      <Nav />
      <ul>
        <li>
          <a href="/">나의 페이지</a>
        </li>
        <li>
          <a href="/network">네트워크</a>
        </li>
        <li>
          <a href="/forum">포럼</a>
        </li>
        {isLogin && (
          <li>
            <button onClick={logout}>로그아웃</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Header;

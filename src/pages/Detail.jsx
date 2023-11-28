import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteTodo, switchTodo } from "../modules/todos";

export default function Detail() {
  const todos = useSelector((state) => state.todos);
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const disPatch = useDispatch();
  return (
    <>
      <div>
        {todos.id === params
          ? todos.map((todo) => {
              return (
                <>
                  <div>id :{todo.id}</div>
                  <div>제목 :{todo.title}</div>
                  <div>내용 :{todo.contents}</div>
                  <div>진행상태 :{todo.isDone ? "완료" : "진행중"}</div>

                  <div>
                    <button
                      onClick={() => {
                        disPatch(deleteTodo(todo.id));

                        navigate("/");
                      }}
                    >
                      삭제하기
                    </button>
                    <button
                      onClick={() => {
                        disPatch(switchTodo(todo));
                      }}
                    >
                      이동하기
                    </button>
                  </div>
                </>
              );
            })
          : null}
      </div>

      <div>
        <button
          onClickCapture={() => {
            navigate("/");
          }}
        >
          이전화면으로
        </button>
      </div>
    </>
  );
}

import { nanoid } from "nanoid";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, switchTodo } from "../modules/todos";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const doingtodo = todos.filter(function (todo) {
    return todo.isDone === false;
  });
  const donetodo = todos.filter(function (todo) {
    return todo.isDone === true;
  });
  return (
    <>
      <h1>투두리스트</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const newTodo = {
              id: nanoid(),
              title: title,
              contents,
              isDone: false,
            };

            disPatch(addTodo(newTodo));
          }}
        >
          <span>제목</span>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <span>내용</span>
          <input
            value={contents}
            onChange={(e) => {
              setContents(e.target.value);
            }}
          />
          <button>추가하기</button>
        </form>
      </div>

      <div>
        <h1>해야할 투두</h1>
        <>
          {doingtodo.map((todo) => {
            return (
              <section>
                <div>id :{todo.id}</div>
                <div>제목 :{todo.title}</div>
                <div>내용 :{todo.contents}</div>
                <div>진행상태 :{todo.isDone ? "완료" : "진행중"}</div>

                <div>
                  <button
                    onClick={() => {
                      disPatch(deleteTodo(todo.id));
                    }}
                  >
                    삭제하기
                  </button>
                  <button
                    onClick={() => {
                      disPatch(switchTodo(todo));
                    }}
                  >
                    완료
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/${todo.id}`);
                    }}
                  >
                    상세 페이지
                  </button>
                </div>
              </section>
            );
          })}{" "}
        </>
      </div>
      <div>
        <h1>완료된 투두</h1>
        <>
          {donetodo.map((todo) => {
            return (
              <section>
                <div>id :{todo.id}</div>
                <div>제목 :{todo.title}</div>
                <div>내용 :{todo.contents}</div>
                <div>진행상태 :{todo.isDone ? "완료" : "진행중"}</div>
                <div>
                  <button
                    onClick={() => {
                      disPatch(deleteTodo(todo.id));
                    }}
                  >
                    삭제하기
                  </button>
                  <button
                    onClick={() => {
                      disPatch(switchTodo(todo));
                    }}
                  >
                    진행
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/${todo.id}`);
                    }}
                  >
                    상세 페이지
                  </button>
                </div>
              </section>
            );
          })}{" "}
        </>
      </div>
    </>
  );
}

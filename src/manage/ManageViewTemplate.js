export default () => `
  <div class="manage_section">
    <nav>
      <ul>
        <li>
          <a href="/manage" data-route="/manage" class="all_view">전체 보기</a>
        </li>
        <li>
          <a href="/manage/my" data-route="/manage/my" class="my_view">내 질문 보기</a>
        </li>
      </ul>
    </nav>
    <section class="content_area">
      <h1>질문 관리하기</h1>
      <section class="question_section">
        <div class="question_table"></div>
      </section>

      <section class="register_section">
        <div class="register_category line">
          <span class="title">카테고리</span>
          <select>
              <option value="javascript" selected>JavaScript</option>
              <option value="web">web</option>
              <option value="cs">cs</option>
          </select>
        </div>
        <div class="register_title line">
          <span class="title">질문 제목</span>
          <input class="title_input" />
        </div>
        <div class="register_answer line">
          <span class="title">정답</span>
          <textarea class="answer_textarea"></textarea>
        </div>
        <div class="button_wrapper line">
          <button class="save_button" disabled>저장 하기</button>
        </div>
      </section>
    </section>
  </div>
`;

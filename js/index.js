import template from "./template.js";

//start input focus
  const searchInputEl = document.getElementById("search-input");
  window.addEventListener('load', () => {
    searchInputEl.focus();
  })
  
  const  fetchMovie = async () =>{
  const res = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=1609961e6087bc908a47717d3912b94c&language=ko-KR")
  const data = await res.json()
  let rows = data.results;

  //모듈로 템플릿 제작 순회 
  let temp = template(rows)

  //배열 정리후 데이터바인딩
  let joinTemp = temp.join("");
  const nowPlayEl = document.querySelector("#now-play");
  nowPlayEl.innerHTML = joinTemp;

  //li삽입 후 선택자 재할당
  let nowPlayLiEls = document.querySelectorAll("#now-play li");

    //ID클릭 이벤트
    const clickLi = () => {
      nowPlayLiEls.forEach((nowPlayLiEl) => {
        nowPlayLiEl.addEventListener("click", function () {
          const liId = this.getAttribute("data-id");
          window.alert(`id는 ${liId}입니다.`);
        });
      });
    };
    clickLi();

    const searchBtnEl = document.getElementById("search-btn");

    //검색함수
    const search = function () {
      let searchValue = searchInputEl.value;
      const copyRows = [...rows];
      let filteredRows =  copyRows.filter(row => row.title.includes(searchValue))
      
      //모듈로 템플릿 제작 순회 
      temp = template(filteredRows);

      //배열 정리후 데이터바인딩
      joinTemp = temp.join("");
      nowPlayEl.innerHTML = joinTemp;
      nowPlayLiEls = document.querySelectorAll("#now-play li");
      clickLi();
    };
    
    //검색 버튼 클릭이벤트
    searchBtnEl.addEventListener("click", search);
    
    //엔터키 이벤트
    searchInputEl.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) search();
    });
  }

  fetchMovie();
  

        
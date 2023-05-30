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
    const search = async function () {
      let searchValue = searchInputEl.value;
      // 처음 받아온 데이터 필터형식
      // const copyRows = [...rows];
      // let filteredRows =  copyRows.filter(row => row.title.includes(searchValue))
      
      // 새로 api 요청해서 검색에 대한 많은 데이터 가져오기
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1609961e6087bc908a47717d3912b94c&language=ko-KR&page=1&query=${searchValue}`)
      const searchDate = await res.json();
      let searchRows = searchDate.results;
      console.log(searchRows)
      //모듈로 템플릿 제작 순회 
      temp = template(searchRows);

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
  

        
import { clickLi } from "./modal.js";
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

    // template.js로 템플릿 제작 순회  
    let temp = template(rows)

    // 배열 정리후 데이터바인딩
    let joinTemp = temp.join("");
    const nowPlayEl = document.querySelector("#now-play");
    nowPlayEl.innerHTML = joinTemp;

    // 마지막 li 찾기
    let LastLi = document.querySelector("#now-play li:last-child");
    let pageCount = 1;
    
    // 무한스크롤 기능구현
    // 요소의 가시성관찰
    const io = new IntersectionObserver((entries, observer) =>{
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          pageCount++
          const  ioFetch = async () =>{
            const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=1609961e6087bc908a47717d3912b94c&page=${pageCount}&language=ko-KR`)
            const data = await res.json()
            let rows = data.results;
        
            // template.js로 템플릿 제작 순회  
            let temp = template(rows)
            
            // 배열 정리후 데이터바인딩
            let joinTemp = temp.join("");
            const nowPlayEl = document.querySelector("#now-play");
            nowPlayEl.insertAdjacentHTML("beforeend", joinTemp)
            
            // 모달이벤트에 넣을 list 재할당
            movieLis = document.querySelectorAll("#now-play li");
            
            // 모달 클릭 데이터삽입 함수
            clickLi(rows, movieLis, modalEl, modalContentEl);

            // 기존에 사용한 마지막 li 관찰 종료
            io.unobserve(LastLi);

            // 템플릿 추가후 바뀐 마지막 li 재할당 
            LastLi = document.querySelector("#now-play li:last-child");
            console.log(LastLi)

            // 새로운 마지막 li에 가시성관찰
            io.observe(LastLi)
          }
          // 무한스크롤 패칭
          ioFetch()
        }
      })
    })
    console.log(LastLi)

    //첫 번째 관찰 시작
    io.observe(LastLi)


    //모달이벤트에 넣을 list
    let movieLis = document.querySelectorAll("#now-play li");

    //모달 선택자
    const modalEl = document.querySelector("#modal");
    const modalContentEl = document.querySelector("#modal-content");
    
    //모달 닫기
    modalEl.addEventListener("click", function(e){
      if(e.target === this) modalEl.classList.remove("on")
    })
   

    // 모달 클릭 데이터삽입 함수
    clickLi(rows, movieLis, modalEl, modalContentEl);

    //검색버튼 선택자
    const searchBtnEl = document.getElementById("search-btn");

    //검색함수
    const search = async function () {

      // input value가져오기
      let searchValue = searchInputEl.value;
      if(searchValue === "") return alert("검색어를 작성해주세요")

      // ver.1 처음 받아온 데이터 필터형식
      // const copyRows = [...rows];
      // let filteredRows =  copyRows.filter(row => row.title.includes(searchValue))
        
      // ver.2 새로 api 요청해서 검색에 대한 많은 데이터 가져오기
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1609961e6087bc908a47717d3912b94c&language=ko-KR&page=1&query=${searchValue}`)
      const searchDate = await res.json();
      let searchRows = searchDate.results;

      //template.js로 템플릿 제작 순회 
      temp = template(searchRows);

      //배열 정리후 데이터바인딩
      joinTemp = temp.join("");
      nowPlayEl.innerHTML = joinTemp;

      //검색된 데이터로 만든 템플릿의 lis 재할당
      movieLis = document.querySelectorAll("#now-play li");
      
      // 모달 클릭 데이터삽입 함수
      clickLi(searchRows, movieLis, modalEl, modalContentEl);
    };
    
    //검색 버튼 클릭이벤트
    searchBtnEl.addEventListener("click", search);
    
    //검색 엔터키 이벤트
    searchInputEl.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) search();
    });
  }
  fetchMovie();
  
  

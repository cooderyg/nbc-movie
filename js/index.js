
fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=1609961e6087bc908a47717d3912b94c&language=ko-KR")
    .then(res => res.json())
    .then(data => {
        const rows =  data.results;
        console.log(rows)
        
          //템플릿 제작 순회
        let temp = rows.map(row =>   
                    `<li data-id=${row.id}>
                            <img src="https://image.tmdb.org/t/p/original/${row.backdrop_path}" />
                            <h3>${row.title}</h3>
                            <p><strong>줄거리</strong> : ${row.overview.length>100 
                              ? row.overview.slice(0, 100)+ "..."
                              : row.overview
                            }
                            </p>
                            <p><strong>개봉일</strong> : ${row.release_date}</p>
                    </li>`
        );
        //배열정리
          let joinTemp = temp.join("")
          const nowPlayEl = document.querySelector("#now-play");
          nowPlayEl.innerHTML = joinTemp;
        
        //li삽입 후 선택자
          let nowPlayLiEls= document.querySelectorAll('#now-play li')
        
        //ID클릭 이벤트
        const clickLi = () => {
          nowPlayLiEls.forEach(nowPlayLiEl=> {
           nowPlayLiEl.addEventListener("click", function(){
            const liId = this.getAttribute('data-id')
            window.alert(`id는 ${liId}입니다.`)
           })
          })
        }
        clickLi();
          const searchBtnEl = document.getElementById('search-btn');
          const searchInputEl = document.getElementById('search-input');
          const search = function(){
           let searchValue = searchInputEl.value;
            temp = rows.map(row => 
              row.title.includes(searchValue)
              ? `
                    <li data-id=${row.id}>
                            <img src="https://image.tmdb.org/t/p/original/${row.backdrop_path}" />
                            <h3>${row.title}</h3>
                            <p>${row.overview}</p>
                            <p>개봉일 : ${row.release_date}</p>
                    </li>
                `
              : null
            )
            joinTemp = temp.join("")
            nowPlayEl.innerHTML = joinTemp;
            nowPlayLiEls = document.querySelectorAll('#now-play li')
            clickLi();
          }
          searchBtnEl.addEventListener('click', search)
          searchInputEl.addEventListener('keydown', (e)=>{
            if (e.keyCode === 13) search()
          })
        })
        
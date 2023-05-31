export function clickLi(rows, movieLis, modalEl, modalContentEl) {
    movieLis.forEach((movieLi) => {
      movieLi.addEventListener("click", function () {
        const liId = this.getAttribute("data-id");
        // ver.1 alert
        // window.alert(`id는 ${liId}입니다.`);

        // ver.2 클릭하는 li ID값 이용해서 modal 창 데이터 바꾸기

        // 모달열기
        modalEl.classList.add("on")

        // ID로 원하는 데이터 찾기
        let findRow = rows.find(row => row.id == liId)
        
        // 모달창에 데이터바인딩
        let modalTemp = 
        `
        <div>
              <img src="https://image.tmdb.org/t/p/original${findRow.poster_path}" />
        </div>
        <div>
          <h3>${findRow.title}</h3>
          <p class="modal-overview">${findRow.overview}</p>
          <p class="modal-vote">평점 : ${findRow.vote_average}</p>
          <p class="modal-date">개봉일 : ${findRow.release_date}</p>
        </div>
        `
        modalContentEl.innerHTML = modalTemp
      });
    });
  };
export default function template(rows){
    return rows.map(
        row =>
            row.poster_path 
            ? `<li data-id=${row.id}>
                    <img src="https://image.tmdb.org/t/p/original/${row.poster_path}" />
                    <h3>${row.title}</h3>
                    <p><strong>줄거리</strong> : ${
                                    !row.overview
                                    ? "등록된 줄거리가 없습니다..."
                                    :row.overview.length > 100
                                        ? row.overview.slice(0, 100) + "..."
                                        : row.overview
                                    }
                    </p>
                    <p><strong>개봉일</strong> : ${
                        row.release_date 
                        ? row.release_date
                        : "개봉예정일이 아직 등록되지 않았습니다."
                    }
                    </p>
                </li>`
            :`<li data-id=${row.id}>
                    <img src="/img/noimg.jpg" />
                    <h3>${row.title}</h3>
                    <p><strong>줄거리</strong> : ${
                                    row.overview.length > 100
                                        ? row.overview.slice(0, 100) + "..."
                                        : row.overview
                                    }
                    </p>
                    <p><strong>개봉일</strong> : ${
                        row.release_date
                        ? row.release_date
                        : "개봉예정일이 아직 등록되지 않았습니다."
                    }
                    </p>
                </li>`
    )
}
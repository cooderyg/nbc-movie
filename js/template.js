export default function template(rows){
    return rows.map(
        row =>
            `<li data-id=${row.id}>
                <img src="https://image.tmdb.org/t/p/original/${row.backdrop_path}" />
                <h3>${row.title}</h3>
                <p><strong>줄거리</strong> : ${
                                row.overview.length > 100
                                    ? row.overview.slice(0, 100) + "..."
                                    : row.overview
                                }
                </p>
                <p><strong>개봉일</strong> : ${row.release_date}</p>
            </li>`
    )
}
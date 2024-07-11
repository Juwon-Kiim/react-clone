import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [detail, setDetail] = useState({});
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetail(json.data.movie);
    setLoaded(true);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loaded ? (
        <div>
          <h1>{detail.title_long}</h1>
          <img src={detail.large_cover_image} />
          <h2>설명</h2>
          <p>{detail.description_full}</p>
          <h2>
            시간: {Math.floor(detail.runtime / 60)}h {detail.runtime % 60}m
          </h2>
          <h2>평점: {detail.rating}점</h2>
          <p>{detail.summary}</p>
          <div>
            <h2>장르</h2>
            <ul>
              {detail.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
          <h2>좋아요 수: {detail.like_count}</h2>
        </div>
      ) : (
        <h1>data loading...</h1>
      )}
    </div>
  );
}
export default Detail;

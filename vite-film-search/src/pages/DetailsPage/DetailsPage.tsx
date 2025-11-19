import { useParams } from "react-router-dom";
import {
  useAppSelector,
  useAppDispatch,
  getMovie,
  getMovieById,
  addFavorite,
  getFavorites,
  getUser,
} from "store";
import type { MovieInfo } from "types";
import { useEffect, useState } from "react";
import {
  Details,
  EncyclopedicTable,
  Genres,
  Plot,
  Poster,
  PosterWrapper,
  Ratings,
  StyledDetailsMoviePage,
  TextCell,
  WrapperRate,
  PosterControls,
  ControlButton,
} from "./styles";
import { Feedback, Spinner, Title } from "components";
import { BookMarkIcon, IMDBIcon, ShareIcon } from "assets";
import { Icon } from "components";

export const DetailsPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { isAuth } = useAppSelector(getUser);
  const { movie, isLoading, error } = useAppSelector(getMovie);
  const favState = useAppSelector(getFavorites);

  const favorites = favState.favorites as MovieInfo[];

  const [delayPassed, setDelayPassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayPassed(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (id) dispatch(getMovieById(id));
  }, [dispatch, id]);

  const showSpinner = isLoading && !delayPassed;

  if (showSpinner) return <Spinner />;
  if (error) return <Feedback text="Movie is not found" />;

  const tableValues = [
    { title: "Year", value: movie.year },
    { title: "Released", value: movie.released },
    { title: "BoxOffice", value: movie.boxOffice },
    { title: "Country", value: movie.country },
    { title: "Production", value: movie.production },
    { title: "Actors", value: movie.actors },
    { title: "Director", value: movie.director },
    { title: "Writers", value: movie.writer },
  ];

  const isFavorite = favorites.some((f) => f.imdbID === movie.imdbID);

  const handleFavorite = () => {
    dispatch(addFavorite(movie));
  };

  return (
    <StyledDetailsMoviePage
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeIn", duration: 0.5 }}
    >
      <PosterWrapper>
        {movie.poster === "N/A" ? (
          <Poster
            loading="lazy"
            src={`https://via.placeholder.com/250.png?text=${movie.title}`}
            alt="feedback image"
          />
        ) : (
          <Poster loading="lazy" src={movie.poster} alt={`poster ${movie.title}`} />
        )}

        <PosterControls>
          <ControlButton $active={isFavorite} onClick={handleFavorite} disabled={!isAuth}>
            <Icon icon={BookMarkIcon} />
          </ControlButton>

          <ControlButton
            onClick={() => navigator?.share?.({ title: movie.title, url: window.location.href })}
          >
            <Icon icon={ShareIcon} />
          </ControlButton>
        </PosterControls>
      </PosterWrapper>

      <Details>
        <Genres>
          {movie.genres?.map((genre) => (
            <p key={genre}>{genre}</p>
          ))}
        </Genres>

        <Title text={movie.title} option="H1" />

        <Ratings>
          <WrapperRate $greenVariant>{movie.imdbRating}</WrapperRate>
          <WrapperRate>
            <Icon icon={IMDBIcon} /> {movie.imdbRating}
          </WrapperRate>
          <WrapperRate>{movie.runTime}</WrapperRate>
        </Ratings>

        <Plot>{movie.plot}</Plot>

        <EncyclopedicTable>
          <tbody>
            {tableValues.map((row) => (
              <tr key={row.title}>
                <TextCell variant="title">{row.title}</TextCell>
                <TextCell>{row.value}</TextCell>
              </tr>
            ))}
          </tbody>
        </EncyclopedicTable>
      </Details>
    </StyledDetailsMoviePage>
  );
};

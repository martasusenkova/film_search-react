import { ROUTE } from "router";
import { generatePath } from "react-router-dom";
import { StyledMovieCard, Poster, Title, Genres, Rate, FavoriteButton } from "./styles";
import { RouterLink } from "components";
import { BookMarkIcon } from "assets";
import { Icon } from "components";
import { deleteFavorite, removeFavoriteLocal, useAppDispatch } from "store";

interface MovieCardProps {
  id: string;
  title: string;
  img: string;
  genres?: string[];
  rating?: string;
  favorite?: boolean;
}
export const MovieCard = ({ id, title, img, genres, rating, favorite }: MovieCardProps) => {
  const dispatch = useAppDispatch();
  const handleFavorite = () => {
    if (!id) return;
    // optimistic UI: remove locally first so the card disappears instantly
    dispatch(removeFavoriteLocal(id));
    dispatch(deleteFavorite(id)).catch(() => {
      // On failure we could re-fetch favorites or show a message; userSlice already shows toast on error.
    });
  };
  return (
    <StyledMovieCard>
      {rating && <Rate>{rating}</Rate>}
      {favorite && (
        <FavoriteButton $active={Boolean(favorite)} onClick={handleFavorite}>
          <Icon icon={BookMarkIcon} />
        </FavoriteButton>
      )}
      <RouterLink to={generatePath(`${ROUTE.HOME + ROUTE.MOVIE}`, { id })}>
        {img === "N/A" ? (
          <Poster
            loading="lazy"
            src={`https://via.placeholder.com/250.png?text=${title}`}
            alt="Not found"
          />
        ) : (
          <Poster loading="lazy" src={img} alt={`poster ${title}`} />
        )}
        <Title>{title}</Title>
        {genres && (
          <Genres>
            {genres.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </Genres>
        )}
      </RouterLink>
    </StyledMovieCard>
  );
};

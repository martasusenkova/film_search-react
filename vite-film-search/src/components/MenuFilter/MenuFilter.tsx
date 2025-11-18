import { Background, FilterHeader, Filters, StyledFilterMenu } from "./styles";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { generatePath, useNavigate, createSearchParams } from "react-router-dom";
import { CrossIcon } from "assets";
import { Icon } from "components";
import { Input, InputGroup } from "ui";
import { ROUTE } from "router";
import { Button, MovieType, CustomSelect, Portal, Title, portalTarget } from "components";
import { useAppDispatch, useAppSelector } from "store";
import { setFilters, clearFilters, addGenre, removeGenre, selectFilters } from "store";
import type { SelectOption } from "components";
import {
  Section,
  LabelText,
  Segment,
  SegmentButton,
  GenreWrapper,
  Pill,
  Ranges,
  Footer,
} from "./styles";
import type { SingleValue } from "react-select";

interface Props {
  toogleFilter: () => void;
}

interface FilterFormFields {
  title?: string;
  yearFrom?: string;
  yearTo?: string;
  ratingFrom?: string;
  ratingTo?: string;
  movieType?: SelectOption | null;
}

type SortBy = "rating" | "year";

type FiltersPayload = {
  sortBy: SortBy;
  title?: string;
  yearFrom?: string;
  yearTo?: string;
  movieType?: string;
  genres?: string[];
  ratingFrom?: string;
  ratingTo?: string;
};

const options: SelectOption[] = [
  { value: MovieType.MOVIES, label: "Movie" },
  { value: MovieType.SERIES, label: "Series" },
  { value: MovieType.EPISODE, label: "Episode" },
];

export const FilterMenu = ({ toogleFilter }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FilterFormFields>({ mode: "onBlur", defaultValues: { movieType: options[0] } });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const savedFilters = useAppSelector(selectFilters);

  const [genres, setGenres] = React.useState<string[]>(savedFilters.genres || []);
  const [genreInput, setGenreInput] = React.useState("");
  const [sortBy, setSortBy] = React.useState<SortBy>(savedFilters.sortBy || "rating");

  const apiSupported = {
    title: true,
    year: true,
    movieType: true,
    genres: false,
    rating: false,
    country: false,
  };

  const handleCross = () => toogleFilter();

  React.useEffect(() => {
    const prev = typeof document !== "undefined" ? document.body.style.overflow : undefined;
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
    return () => {
      if (typeof document !== "undefined") document.body.style.overflow = prev || "";
    };
  }, []);

  const onSubmit: SubmitHandler<FilterFormFields> = (filterData) => {
    const { title, movieType, yearFrom, yearTo, ratingFrom, ratingTo } = filterData;

    // Build payload with explicit type
    const payload: FiltersPayload = { sortBy };

    if (apiSupported.title && title) payload.title = title;
    if (apiSupported.year) {
      if (yearFrom) payload.yearFrom = yearFrom;
      if (yearTo) payload.yearTo = yearTo;
    }
    if (apiSupported.movieType && movieType) payload.movieType = movieType.value;
    if (apiSupported.genres && genres.length) payload.genres = genres;
    if (apiSupported.rating) {
      if (ratingFrom) payload.ratingFrom = ratingFrom;
      if (ratingTo) payload.ratingTo = ratingTo;
    }

    dispatch(setFilters(payload));
    toogleFilter();

    const query: Record<string, string> = {};
    if (apiSupported.year && yearFrom) query.year = yearFrom;
    if (apiSupported.movieType && movieType) query.type = movieType.value;
    const search = createSearchParams(query).toString();
    navigate(`${generatePath(ROUTE.SEARCH, { name: title || "" })}${search ? `?${search}` : ""}`);
  };

  const handleClear = () => {
    reset();
    setGenres([]);
    setGenreInput("");
    dispatch(clearFilters());
  };

  const handleAddGenre = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (!apiSupported.genres) return;
    if (e && e.key !== "Enter") return;
    const value = genreInput.trim();
    if (!value) return;
    if (!genres.includes(value)) {
      setGenres((s) => [...s, value]);
      dispatch(addGenre(value));
    }
    setGenreInput("");
  };

  const handleRemoveGenre = (g: string) => {
    setGenres((s) => s.filter((x) => x !== g));
    dispatch(removeGenre(g));
  };

  return (
    <Portal target={portalTarget.MODAL}>
      <StyledFilterMenu>
        <Background
          onClick={toogleFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut" }}
        />
        <Filters
          onSubmit={handleSubmit(onSubmit)}
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeInOut" }}
          exit={{ x: 1000, opacity: 0 }}
        >
          <FilterHeader>
            <Title option={"H2"} text={"Filters"} />
            <Icon icon={CrossIcon} onClick={handleCross} />
          </FilterHeader>
          <InputGroup>
            <Section>
              <LabelText>Sort by</LabelText>
              <Segment>
                <SegmentButton
                  type="button"
                  $active={sortBy === "rating"}
                  onClick={() => apiSupported.rating && setSortBy("rating")}
                  disabled={!apiSupported.rating}
                >
                  Rating
                </SegmentButton>
                <SegmentButton
                  type="button"
                  $active={sortBy === "year"}
                  onClick={() => setSortBy("year")}
                >
                  Year
                </SegmentButton>
              </Segment>
            </Section>

            <Section>
              <LabelText>Full or short movie name</LabelText>
              <Input
                placeholder="Your text"
                {...register("title")}
                $error={Boolean(errors.title)}
              />
            </Section>

            <Section>
              <LabelText>Genre</LabelText>
              <GenreWrapper>
                {genres.map((g) => (
                  <Pill key={g}>
                    {g}
                    {apiSupported.genres && (
                      <Icon icon={CrossIcon} onClick={() => handleRemoveGenre(g)} />
                    )}
                  </Pill>
                ))}
                <Input
                  placeholder={apiSupported.genres ? "Add genre" : "Not supported by API"}
                  value={genreInput}
                  onChange={(e) => setGenreInput(e.target.value)}
                  onKeyDown={handleAddGenre}
                  disabled={!apiSupported.genres}
                />
              </GenreWrapper>
            </Section>

            <Section>
              <LabelText>Years</LabelText>
              <Ranges>
                <Input placeholder="From" {...register("yearFrom")} />
                <Input placeholder="To" {...register("yearTo")} />
              </Ranges>
            </Section>

            <Section>
              <LabelText>Rating</LabelText>
              <Ranges>
                <Input
                  placeholder="From"
                  {...register("ratingFrom")}
                  disabled={!apiSupported.rating}
                />
                <Input placeholder="To" {...register("ratingTo")} disabled={!apiSupported.rating} />
              </Ranges>
            </Section>

            <Section>
              <LabelText>Country</LabelText>
              <CustomSelect
                options={[]}
                placeholder="Select country"
                isDisabled={!apiSupported.country}
                menuPlacement="bottom"
              />
            </Section>

            <Section>
              <LabelText>Movie type</LabelText>
              <Controller
                name="movieType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CustomSelect
                    options={options}
                    value={value ?? null}
                    defaultValue={options[0]}
                    onChange={(opt: SingleValue<SelectOption> | null) => onChange(opt ?? null)}
                    menuPlacement="bottom"
                  />
                )}
              />
            </Section>
          </InputGroup>
          <Footer>
            <Button
              type="button"
              text={"Clear filter"}
              option={"secondary"}
              onClick={handleClear}
            />
            <Button type="submit" text={"Show results"} option={"primary"} />
          </Footer>
        </Filters>
      </StyledFilterMenu>
    </Portal>
  );
};

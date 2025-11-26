import styled from "styled-components";
import { Color, Media, Typography } from "ui";
export const StyledMovieCard = styled.li `
  position: relative;
  max-width: 266px;
  width: 100%;
  max-height: 433px;
  ${Media.LG} {
    /*max-width: 200px;*/
    max-height: 379px;
  }
  ${Media.MD} {
    /*max-width: 180px;*/
  }
  ${Media.SM} {
    max-width: 272px;
    max-height: 437px;
  }
`;
export const Poster = styled.img `
  width: 100%;
  height: 357px;
  border-radius: 20px;
  margin-bottom: 8px;
  ${Media.LG} {
    height: 279px;
  }

  ${Media.SM} {
    margin-bottom: 20px;
    height: 365px;
  }
`;
export const Title = styled.h6 `
  ${Typography.S2};
`;
export const Genres = styled.p `
  color: ${Color.LIGHT};
  display: flex;
  flex-wrap: wrap;
  gap: 2px 13px;
  ${Typography.S3}
  font-weight: 500;

  span {
    position: relative;
    &:after {
      content: "\u2022";
      display: block;
      position: absolute;
      right: -10px;
      top: 0;
    }
    &:last-child:after {
      display: none;
    }
  }
`;
export const Rate = styled.div `
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: ${Color.GREEN};
  color: ${Color.WHITE};
  border-radius: 6px;
  padding: 2px 8px;
  ${Typography.S3};
`;
export const FavoriteButton = styled.button `
  position: absolute;
  top: 14px;
  right: 14px;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  background: ${({ $active }) => ($active ? Color.PRIMARY : Color.GRAPHITE)};

  svg {
    width: 18px;
    height: 18px;
  }

  /* Icon color: white on active, light grey when inactive */
  path {
    fill: ${({ $active }) => ($active ? Color.WHITE : Color.LIGHT)} !important;
    transition: 0.12s fill ease-in-out, 0.12s transform ease-in-out;
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-1px);
    path {
      fill: ${Color.WHITE};
    }
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
    path {
      fill: ${Color.SECONDARY};
    }
  }
`;

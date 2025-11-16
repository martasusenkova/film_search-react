import styled from "styled-components";
import { Color, Typography } from "ui";
import { motion } from "framer-motion";

export const StyledDetailsMoviePage = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 3.5fr 1fr;
  grid-column-gap: 42px;
`;

export const Details = styled.div``;

export const PosterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export const Poster = styled.img`
  height: 356px;
  width: 266px;
  border-radius: 20px;
`;

export const PosterControls = styled.div`
  display: flex;
  width: 240px;
  border-radius: 14px;
  overflow: hidden;
  background-color: ${Color.GRAPHITE};
`;

export const ControlButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 16px 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${({ $active }) => ($active ? Color.PRIMARY : Color.SECONDARY)} !important;
  transition: color 0.18s ease-in-out, transform 0.12s ease;

  &:hover {
    cursor: pointer;
    color: ${Color.PRIMARY};
    svg {
      transform: scale(1.05);
    }
  }

  svg path {
    fill: currentColor;
    transition: fill 0.18s ease-in-out, transform 0.12s ease;
  }
`;

export const Genres = styled.div`
  color: ${Color.LIGHT};
  display: flex;
  gap: 13px;
  p {
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

export const WrapperRate = styled.div<{ $greenVariant?: boolean }>`
  background-color: ${({ $greenVariant }) => ($greenVariant ? Color.GREEN : Color.GRAPHITE)};
  color: ${Color.WHITE};
  border-radius: 6px;
  padding: 2px 8px;
  ${Typography.S3};
  svg {
    margin-right: 5px;
  }
`;

export const Ratings = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 26px;
`;

export const Plot = styled.p`
  ${Typography.B1};
  margin-top: 42px;
  margin-bottom: 40px;
`;

export const EncyclopedicTable = styled.table`
  border-collapse: collapse;
`;

export const TextCell = styled.td<{ variant?: "title" }>`
  padding: 0 40px 20px 0;
  ${Typography.B1};
  color: ${({ variant }) => (variant === "title" ? Color.LIGHT : Color.PRIMARY_TEXT)};
`;

export const FavoriteButton = styled.button<{ $active?: boolean }>`
  padding: 12px 18px;
  background: transparent;
  border: none;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active }) => ($active ? Color.PRIMARY : Color.SECONDARY)};
  transition: color 0.18s ease-in-out;

  &:hover {
    cursor: pointer;
    color: ${Color.PRIMARY};
    svg {
      transform: scale(1.05);
    }
  }

  &:disabled {
    cursor: default;
    color: ${Color.SECONDARY};
  }

  svg path {
    fill: currentColor;
    transition: fill 0.18s ease-in-out, transform 0.12s ease;
  }
`;

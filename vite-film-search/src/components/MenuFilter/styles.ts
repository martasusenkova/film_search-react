import { Color, Media } from "ui";
import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledFilterMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  min-width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 480px;
  ${Media.LG} {
    grid-template-columns: 1fr 380px;
  }
  ${Media.MD} {
    grid-template-columns: 1fr 420px;
    width: 100%;
  }
  ${Media.XL} {
    grid-template-columns: 1fr 500px;
  }
  ${Media.SM} {
    grid-template-columns: 0 1fr;
  }
`;

export const Background = styled(motion.div)`
  background-color: ${Color.DARK};
  opacity: 0.5;
`;

export const Filters = styled(motion.form)`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-gap: 24px;
  background-color: ${Color.BLOCK_BG};
  border-radius: 10px 0 0 10px;
  padding: 32px 36px;
  max-height: 100vh;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08), 0 0 0 2px ${Color.PRIMARY}18;
  border-left: 3px solid ${Color.PRIMARY}33;
  ${Media.LG} {
    padding: 24px 20px;
    grid-gap: 16px;
  }
  ${Media.MD} {
    padding: 16px 12px;
    grid-gap: 10px;
  }
  ${Media.SM} {
    grid-template-rows: 50px 1fr 80px;
    border-radius: 0px;
    padding: 20px 16px;
    grid-gap: 16px;
  }

  ${Media.MD} {
    max-height: 100vh;
  }

  & > *:nth-child(2) {
    min-height: 0;
    overflow: visible;
    padding-bottom: 28px;
  }

  ${Media.SM} {
    & > *:nth-child(2) {
      overflow: visible;
      padding-bottom: 48px;
    }
  }

  & * {
    box-sizing: border-box;
    max-width: 100%;
  }

  input,
  textarea,
  select {
    width: 100%;
    max-width: 100%;
  }

  .react-select__control,
  .custom-select-root {
    width: 100%;
    box-sizing: border-box;
    min-height: 44px;
  }
  button {
    min-width: 0;
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    cursor: pointer;
    &:hover {
      path {
        fill: ${Color.PRIMARY};
        transition: all 0.3s ease-in-out;
      }
    }
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  ${Media.LG} {
    gap: 10px;
  }
  ${Media.MD} {
    gap: 6px;
  }
  ${Media.SM} {
    gap: 8px;
  }
`;

export const LabelText = styled.div`
  color: ${Color.PRIMARY_TEXT};
  font-size: 14px;
  font-weight: 500;
`;

export const Segment = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(2, 1fr);
  background: ${Color.SELECT_BG};
  border-radius: 10px;
  padding: 6px;
  gap: 8px;
  width: 100%;
`;

export const SegmentButton = styled.button<{ $active?: boolean }>`
  padding: 12px 18px;
  border-radius: 8px;
  border: none;
  background: ${({ $active }) => ($active ? Color.GRAPHITE : "transparent")};
  color: ${({ $active }) => ($active ? Color.WHITE : Color.LIGHT)};
  cursor: pointer;
  font-weight: 600;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  ${Media.MD} {
    padding: 8px 12px;
    font-size: 14px;
  }
  ${Media.SM} {
    padding: 6px 10px;
    font-size: 13px;
  }
`;

export const GenreWrapper = styled.div`
  background: ${Color.SELECT_BG};
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  ${Media.MD} {
    padding: 8px;
    gap: 6px;
  }
`;

export const Pill = styled.div`
  background: ${Color.GRAPHITE};
  color: ${Color.WHITE};
  padding: 8px 12px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  ${Media.MD} {
    padding: 6px 10px;
    font-size: 12px;
  }
  ${Media.SM} {
    padding: 5px 8px;
    font-size: 11px;
  }
`;

export const Ranges = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
  ${Media.MD} {
    gap: 8px;
  }
  ${Media.SM} {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  gap: 12px;

  position: relative;
  padding-bottom: 6px;
  z-index: 5;

  ${Media.MD} {
    position: sticky;
    bottom: 0;
    background: linear-gradient(180deg, rgba(36, 36, 38, 0) 0%, ${Color.BLOCK_BG} 60%);
  }

  ${Media.SM} {
    flex-direction: column-reverse;
    gap: 8px;
    padding-top: 0;
    button {
      width: 100%;
    }
  }
`;

export const GroupButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  ${Media.SM} {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 16px;
  }
`;

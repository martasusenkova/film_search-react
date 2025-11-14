import { useToggle } from "hooks";
import { Background, Burger, Menu, MenuHeader, StyledBurgerMenu } from "./styles";
import { BurgerIcon, CrossIcon } from "assets";
import { Icon } from "components";
import { MenuNav, Portal, Title } from "components";
import { portalTarget } from "components";
import { AnimatePresence } from "framer-motion";

export const BurgerMenu = () => {
  const [isActive, toogleBurger] = useToggle();
  const handleCross = () => toogleBurger();
  const handleBackground = () => toogleBurger();
  return (
    <>
      <Burger onClick={toogleBurger}>
        {isActive ? <Icon icon={CrossIcon} /> : <Icon icon={BurgerIcon} />}
      </Burger>
      <AnimatePresence>
        {isActive && (
          <Portal target={portalTarget.BURGER_MENU}>
            <StyledBurgerMenu>
              <Background
                onClick={handleBackground}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut" }}
              />
              <Menu
                initial={{ x: 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeInOut" }}
                exit={{ x: 1000, opacity: 0 }}
              >
                <MenuHeader>
                  <Title option={"H3"} text={"Menu"} />
                  <Icon icon={CrossIcon} onClick={handleCross} />
                </MenuHeader>
                <MenuNav burger={true} />
              </Menu>
            </StyledBurgerMenu>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

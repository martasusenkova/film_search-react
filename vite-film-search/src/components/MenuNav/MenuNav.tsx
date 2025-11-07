import { BookMarkIcon, FireIcon, HomeIcon, LogoutIcon, SettingsIcon, SignInIcon } from "assets";
import { Icon } from "components";
import { MenuLink } from "components";
import { ROUTE } from "router";
import { LogoutWrapper, StyledMenuNav } from "./styles";
import { getUser, useAppDispatch, useAppSelector, userSignOut } from "store";

interface MenuNavProps {
  burger?: boolean;
}

export const MenuNav = ({ burger }: MenuNavProps) => {
  const { isAuth } = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(userSignOut());
  return (
    <StyledMenuNav>
      <MenuLink title="Home" to={ROUTE.HOME}>
        <Icon icon={HomeIcon} />
      </MenuLink>
      <MenuLink title="Trends" to={ROUTE.HOME + ROUTE.TRENDS}>
        <Icon icon={FireIcon} />
      </MenuLink>
      {isAuth && (
        <>
          <MenuLink title="Favorites" to={ROUTE.HOME + ROUTE.FAVORITES}>
            <Icon icon={BookMarkIcon} />
          </MenuLink>
          <MenuLink title="Settings" to={ROUTE.HOME + ROUTE.SETTINGS}>
            <Icon icon={SettingsIcon} />
          </MenuLink>
          {burger && (
            <LogoutWrapper onClick={handleLogout}>
              <Icon icon={LogoutIcon} />
              Logout
            </LogoutWrapper>
          )}
        </>
      )}
      {burger && !isAuth && (
        <MenuLink title="Sign in" to={ROUTE.HOME + ROUTE.LOGIN}>
          <Icon icon={SignInIcon} />
        </MenuLink>
      )}
    </StyledMenuNav>
  );
};

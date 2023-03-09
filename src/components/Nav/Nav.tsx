import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { getRoutePath } from '@router/helpers';
import classNames from 'classnames';
import { BracketsIcon, EyeIcon } from '@assets/Icons';
import styles from './Nav.module.scss';

const getNavLinkClasses = (props: { isActive: boolean }): string | undefined =>
  classNames(styles.navLink, props.isActive && styles.navLinkActive);

export const Nav: FC = () => {
  return (
    <nav className={styles.wrap}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <NavLink to={getRoutePath('runtime')} className={getNavLinkClasses}>
            <EyeIcon />
            Runtime
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink
            to={getRoutePath('constructor')}
            className={getNavLinkClasses}
          >
            <BracketsIcon />
            Constructor
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

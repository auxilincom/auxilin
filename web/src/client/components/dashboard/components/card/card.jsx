// @flow

import React, { Component } from 'react';
import type { IconBaseProps } from 'react-icon-base';
import classnames from 'classnames';

import { MdStarBorder } from 'react-icons/md';

import styles from './card.styles.pcss';

const iconColors = {
  purple: 'purple',
  green: 'green',
  blue: 'blue',
  orange: 'orange',
};

type ColorType = 'purple' | 'green' | 'blue' | 'orange';

type PropsType = {
  icon?: React$ComponentType<IconBaseProps>,
  title: string | number,
  value: string | number,
  footerIcon?: React$ComponentType<IconBaseProps> | null,
  footerContent: React$Node | string,
  iconColor?: ColorType,
  className?: string,
};

class Card extends Component<PropsType> {
  static defaultProps = {
    icon: MdStarBorder,
    footerIcon: null,
    iconColor: 'green',
    className: '',
  }

  render(): React$Node {
    const {
      icon: Icon,
      title,
      value,
      footerIcon: FooterIcon,
      footerContent,
      iconColor,
      className,
    } = this.props;

    return (
      <div className={classnames(styles.card, className)}>
        <div className={styles.cardHeader}>
          <div className={classnames(styles.cardIcon, styles[iconColor])}>
            {Icon && <Icon size="42px" color="white" />}
          </div>

          <div className={styles.cardData}>
            <span className={styles.cardTitle}>
              {title}
            </span>

            <span className={styles.cardValue}>
              {value}
            </span>
          </div>
        </div>

        <div className={styles.cardFooter}>
          {FooterIcon && <FooterIcon size="15px" className={styles.cardFooterIcon} />}
          <span>
            {footerContent}
          </span>
        </div>
      </div>
    );
  }
}

export default Card;
export { iconColors };
export type CardType = {
  icon: React$ComponentType<IconBaseProps>,
  iconColor: ColorType,
  footerIcon: React$ComponentType<IconBaseProps>,
  value: number | string,
  title: string,
  footerContent: string | number | React$Node,
  className: string,
};

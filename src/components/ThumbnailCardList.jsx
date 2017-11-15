import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/lib/fa';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ThumbnailCardList.css';

import ThumbnailCard from './ThumbnailCard';

class ThumbnailCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: 0,
    };

    this.onClickLeft = this.onClickLeft.bind(this);
    this.onClickRight = this.onClickRight.bind(this);
  }

  onClickLeft() {
    this.setState(state => ({
      scroll: Math.max(state.scroll - 1, 0),
    }));
  }

  onClickRight() {
    this.setState((state, props) => ({
      scroll: Math.min(state.scroll + 1, props.items.length - 3),
    }));
  }

  get isFirst() {
    return this.state.scroll === 0;
  }

  get isLast() {
    return this.state.scroll >= this.props.items.length - 3;
  }

  render() {
    const { items, wrap = false } = this.props;
    const nowrap = !wrap;
    const { scroll } = this.state;

    return (
      <div className={styles.base}>
        {nowrap && (
          <div className={styles.scrollButton} onClick={this.onClickLeft}>
            <FaAngleLeft className={this.isFirst ? styles.scrollButtonDisabled : null} />
          </div>
        )}
        <div className={styles.outer}>
          <div
            className={classnames({
              [styles.inner]: true,
              [styles.innerWrap]: wrap,
            })}
            style={{
              transform: `translateX(calc(-${100 * scroll / 3}%))`,
            }}
          >
            {items.map(item => <ThumbnailCard key={item.title} item={item} wide={wrap} />)}
          </div>
        </div>
        {nowrap && (
          <div className={styles.scrollButton} onClick={this.onClickRight}>
            <FaAngleRight className={this.isLast ? styles.scrollButtonDisabled : null} />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ThumbnailCardList);

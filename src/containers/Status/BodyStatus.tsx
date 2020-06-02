import React from 'react';

import '../../styles/body-status.scss';
import { ILimbs, TLimb } from '../Character/config';

interface IBodyStatusProps {
  limbs: ILimbs;
  onClick?: (limb: string, state: TLimb) => void;
  hasRight?: boolean;
}

const isCrippled = (limb: TLimb) =>
  limb === 'crippled';

// const labels

const BodyStatus = (props: IBodyStatusProps) => {
  const { limbs, onClick, hasRight } = props;

  const crippledLimbs = Object
    .values(props.limbs)
    .reduce((acc: number, limb: TLimb) => acc + (isCrippled(limb) ? 1 : 0), 0);

  const getLimb = (name: string) => {
    const state = limbs[name];
    return (
      <div
        key={name + state}
        className={`limb ${state} ${name}`}
        style={{ backgroundImage: `url(./assets/${state}-${name}.png)` }}
        onClick={() => onClick && onClick(name, state)}
      />
    );
  };

  return (
    <div className={`body-status ${hasRight ? '' : 'disabled'}`}>
      <div>
        <div
          key={'head' + limbs.head}
          className={`limb ${limbs.head} head`}
          style={{ backgroundImage: `url(./assets/${limbs.head}-head.png)` }}
          onClick={() => onClick && onClick('head', limbs.head)}
        >
          <div
            key='face'
            className={`limb face`}
            style={{ backgroundImage: `url(./assets/face_0${Math.min(4, crippledLimbs)}.png)` }}
          />
        </div>
      </div>
      <div>
        {getLimb('handL')}
        {getLimb('torso')}
        {getLimb('handR')}
      </div>
      <div>
        {getLimb('legL')}
        {getLimb('legR')}
      </div>
    </div>
  )
};

export default BodyStatus;

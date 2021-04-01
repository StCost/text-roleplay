import React from 'react';
import { Tooltip } from 'antd';

export interface IRoll {
  roll: string;
  results: number[];
  amount: number;
  size: number;
  maxResult: number;
  minResult: number;
  sum: number;
}

export const diceRegex = /([1-9]|10)[dд]((10|12|20)|[468])/miu;
export const diceRegexG = /([1-9]|10)[dд]((10|12|20)|[468])/miug;

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * ((max + 1) - min) + min);

export const hasDice = (str: string) =>
  /\d+[dд]\d+/imu.test(str);

export const rollDice = (amount: number, size: number) => {
  return new Array(amount).fill(amount + size).map(() => getRandomInt(1, size));
};

export const exportRolls = (str: string) => {
  const rolls = str.match(diceRegexG);
  if (rolls) {
    return rolls.map((roll: string): IRoll => {
      const [_amount, _size] = roll.split(/[dд]/);
      const amount = parseInt(_amount);
      const size = parseInt(_size);
      const results = rollDice(amount, size);

      return ({
        maxResult: size * amount,
        minResult: amount,
        sum: results.reduce((a, b) => a + b, 0),
        roll,
        results,
        amount,
        size,
      })
    }).splice(0, 10);
  }
  return [];
};

export const importRolls = (body: string, _rolls: IRoll[]) => {
  const rolls = [..._rolls]; // Avoid mutations
  return body.split(/[ |\n]/g).map((word: string, index: number) => {
    const rollIndex = rolls.findIndex(({ roll }) => roll === word);
    if (rollIndex > -1) {
      const {
        results,
        maxResult,
        minResult,
        sum
      } = rolls.splice(rollIndex, 1)[0];

      const summing = results.length > 1
        ? `${sum} = ${results.join(' + ')}`
        : `${results.join(' + ')}`;

      const className = (sum === maxResult && 'critHit') || (sum === minResult && 'critMiss') || '';

      return (
        <React.Fragment key={word + index}>
          {' '}
          <Tooltip title={summing}>
            <b className={className}>
              {word}({sum})
            </b>
          </Tooltip>
        </React.Fragment>
      )
    }
    return ` ${word}`;
  });
};

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
  plus: number;
}

export const diceRegex = /(^| )(10|[1-9])[dд](4|6|8|10|12|20)(\+\d+)?/miu;
export const diceRegexG = /(^| )(10|[1-9])[dд](4|6|8|10|12|20)(\+\d+)?/miug;

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * ((max + 1) - min) + min);

export const hasDice = (str: string) =>
  diceRegex.test(str);

export const rollDice = (amount: number, size: number) => {
  return new Array(amount).fill(amount + size).map(() => getRandomInt(1, size));
};

export const exportRolls = (str: string) => {
  const rolls = str.match(diceRegexG);
  if (rolls) {
    return rolls.map((roll: string): IRoll => {
      const [_amount, _size, _plus] = roll.split(/[dд+]/);
      const amount = parseInt(_amount);
      const size = parseInt(_size);
      const plus = parseInt(_plus || '0');
      const results = rollDice(amount, size);

      return ({
        maxResult: size * amount + plus,
        minResult: amount + plus,
        sum: results.reduce((a, b) => a + b, 0) + plus,
        roll,
        results,
        amount,
        size,
        plus,
      })
    }).splice(0, 10);
  }
  return [];
};

export const importRolls = (body: string, _rolls: IRoll[]) => {
  const rolls = [..._rolls]; // Avoid mutations
  return body.split(/[ |\n]/g).map((word: string, index: number) => {
    const rollIndex = rolls.findIndex(({ roll }) => roll.trim() === word.trim());
    if (rollIndex > -1) {
      const {
        results,
        maxResult,
        minResult,
        sum,
        plus,
      } = rolls.splice(rollIndex, 1)[0];

      const summing = results.length > 1
        ? `${sum} = ${results.join(' + ')}` + (plus ? ` + ${plus}` : '')
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

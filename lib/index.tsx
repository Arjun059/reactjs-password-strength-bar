import React, {Fragment, CSSProperties, ReactNode, useState, useEffect, ComponentProps} from 'react';
import zxcvbn from 'zxcvbn';

// components
import Item from './Item';

export interface PasswordFeedback {
  warning?: string;
  suggestions?: string[];
}

export interface PasswordStrengthBarProps {
  className?: ComponentProps<"div">['className'];
  style?: CSSProperties;
  scoreWordClassName?: ComponentProps<"p">['className'];
  scoreWordStyle?: CSSProperties;
  password: string;
  userInputs?: string[];
  barColors?: string[];
  scoreWords?: ReactNode[];
  minLength?: number;
  shortScoreWord?: ReactNode;
  onChangeScore?: (
    score: number,
    feedback: PasswordFeedback,
  ) => void;
}

const rootStyle: CSSProperties = {
  position: 'relative',
};

const wrapStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  margin: '5px 0 0',
};

const spaceStyle: CSSProperties = {
  width: 4,
};

const descStyle: CSSProperties = {
  margin: '5px 0 0',
  color: '#898792',
  fontSize: 14,
  textAlign: 'right',
};

const defaultProps: Partial<PasswordStrengthBarProps> = {
  className: undefined,
  style: undefined,
  scoreWordClassName: undefined,
  scoreWordStyle: undefined,
  password: '',
  userInputs: [],
  barColors: ['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#25c281'],
  scoreWords: ['weak', 'weak', 'okay', 'good', 'strong'],
  minLength: 4,
  shortScoreWord: 'too short',
  onChangeScore: undefined,
};

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = (props) => {
  const {
    className,
    style,
    scoreWordClassName,
    scoreWordStyle,
    password,
    barColors = defaultProps.barColors,
    scoreWords = defaultProps.scoreWords,
    minLength = defaultProps.minLength,
    shortScoreWord = defaultProps.shortScoreWord,
    userInputs = defaultProps.userInputs,
    onChangeScore,
  } = props;

  const [score, setScore] = useState(0);

  const calculateScore = (): void => {
    let result = null;
    let newScore = 0;
    let feedback: PasswordFeedback = {};

    if (password.length >= minLength) {
      result = zxcvbn(password, userInputs);
      ({score: newScore, feedback} = result);

      // some times password length is greater than minLength but score is 0
      // the behavior is comes from zxcvbn library
      if (newScore === 0) {
        newScore = 1;
      }
    }

    setScore(newScore);
    if (onChangeScore) {
      onChangeScore(newScore, feedback);
    }
  };

  useEffect(() => {
    calculateScore();
  }, [password, minLength, userInputs]);

  const newShortScoreWord =
    password.length >= minLength ? scoreWords[score] : shortScoreWord;

  return (
    <div className={className} style={{...rootStyle, ...style}}>
      <div style={wrapStyle}>
        {[1, 2, 3, 4].map((el: number) => (
          <Fragment key={`password-strength-bar-item-${el}`}>
            {el > 1 && <div style={spaceStyle} />}
            <Item score={score} itemNum={el} barColors={barColors} />
          </Fragment>
        ))}
      </div>
      <p
        className={scoreWordClassName}
        style={{...descStyle, ...scoreWordStyle}}
      >
        {newShortScoreWord}
      </p>
    </div>
  );
};

export default PasswordStrengthBar;

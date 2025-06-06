import React, { useState } from 'react';
// import PasswordStrengthBar from '../../dist';
import PasswordStrengthBar from 'reactjs-password-strength-bar';

const styles = {
  wrap: {
    width: 300,
  },
  input: {
    display: 'block',
    width: '100%',
    height: 38,
    padding: '6px 10px',
    borderRadius: 2,
    border: 'solid 1px #ccc',
    boxShadow: 'inset 0 1px 1px rgba(0,0,0,.1)',
    fontSize: 16,
    outline: '0',
    boxSizing: 'border-box',
  },
};

const Home = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <div style={styles.wrap}>
        <input
          style={styles.input}
          type="password"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <PasswordStrengthBar
          password={inputValue}
          minLength={5}
          onChangeScore={(score, feedback) => {
            console.log(score, feedback);
          }}
        />
      </div>
    </div>
  );
};

export default Home;

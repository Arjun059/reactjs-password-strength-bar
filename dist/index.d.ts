import React, { CSSProperties, ReactNode, ComponentProps } from 'react';
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
    onChangeScore?: (score: number, feedback: PasswordFeedback) => void;
}
declare const PasswordStrengthBar: React.FC<PasswordStrengthBarProps>;
export default PasswordStrengthBar;

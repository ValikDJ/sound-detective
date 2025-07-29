
import React from 'react';

export interface StepContent {
  title: string;
  content: React.ReactNode;
}

export interface Answers {
  [key: string]: string;
}

export interface TutorialStep {
  selector: string;
  text: string;
  action?: () => void;
}

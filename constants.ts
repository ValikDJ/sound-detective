
import { TutorialStep } from './types';

export const TUTORIAL_STEPS: TutorialStep[] = [
  { selector: '[data-tutorial="step-1"]', text: 'Ласкаво просимо! Це картки завдань. Натисніть на будь-яку, щоб почати.' },
  { selector: '[data-tutorial="step-2"]', text: 'Це ваш прогрес-бар. Він показує, скільки кроків ви вже виконали.' },
  { selector: '[data-tutorial="step-3"]', text: 'Всередині завдання ви можете перемикатися між кроками за допомогою цієї панелі.' },
  { selector: '[data-tutorial="step-4"]', text: 'Якщо знадобиться допомога, просто натисніть на цей знак питання, щоб пройти навчання ще раз.' }
];

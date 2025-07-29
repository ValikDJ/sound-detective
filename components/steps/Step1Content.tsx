import React from 'react';

const CartoonLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="block p-4 bg-gray-700 text-white no-underline text-center font-bold border-2 border-gray-600 transition-all duration-200 ease-in-out transform hover:bg-blue-600 hover:border-blue-600 hover:-translate-y-1"
  >
    {children}
  </a>
);

const Step1Content: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center mb-6">
        <img src="/ezgif-16f88ebd834f7e.gif" alt="Watching cartoon" className="w-16 h-auto rounded-lg shadow-lg" />
      </div>
      <p className="text-lg leading-relaxed text-gray-400 mb-5 border-l-4 border-purple-600 pl-4">
        На цьому етапі твоє завдання — просто розслабитись і подивитись мультфільм. Ти можеш обрати один із запропонованих нижче або будь-який інший, який тобі до вподоби.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <CartoonLink href="https://www.youtube.com/watch?v=-n9j7Ii2fzw">Маша та Ведмідь</CartoonLink>
        <CartoonLink href="https://www.youtube.com/watch?v=tprkFzzk0DE">Фіксики</CartoonLink>
        <CartoonLink href="https://www.youtube.com/watch?v=ha9ac2klLfg">Губка Боб</CartoonLink>
      </div>
      <p className="font-bold text-yellow-400 text-center p-3 bg-gray-700 mt-6">
        Коли подивишся мультфільм, переходь до наступного етапу, натиснувши кнопку "Далі"!
      </p>
    </div>
  );
};

export default Step1Content;
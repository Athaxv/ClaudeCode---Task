"use client";
import React, { useState, useEffect } from 'react';
import CopyBlock from './CopyBlock';

// Placeholder logos for the social proof section
const Logo = ({ name }: { name: string }) => (
  <div className="h-8 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-default">
    <span className="text-lg font-bold font-sans text-white">{name}</span>
  </div>
);

const WORDS = [
  "> makers",
  "> builders",
  "> creators",
  "> programmers",
  "> engineers",
  "> debuggers",
  "> inventors",
];

const TYPING_SPEED = 60;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPE = 1800;

const Hero: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = WORDS[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = currentWord.slice(0, displayText.length + 1);
        setDisplayText(next);

        if (next.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
          return;
        }
      } else {
        const next = currentWord.slice(0, displayText.length - 1);
        setDisplayText(next);

        if (next.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % WORDS.length);
          return;
        }
      }
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section className="relative w-full pt-20 pb-32 flex flex-col items-center justify-center overflow-hidden px-4">

      {/* Doodle Tag */}
      <div className="mb-8 px-3 py-1 rounded-full border border-[#333] bg-[#1A1A1A] text-[#D97757] text-xs font-mono flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#D97757] animate-pulse"></span>
        Doodling...
      </div>

      {/* Main Headline — "Built for" is static, the "> word" types in/out */}
      <h1 className="text-5xl md:text-7xl lg:text-7xl font-serif text-center mb-8 leading-tight tracking-tight text-white">
        Built for{" "}
        <span className="text-[#D97757] inline-block min-w-[100px] md:min-w-[100px] text-left">
          {displayText}
          <span className="inline-block w-[3px] h-[0.75em] bg-[#D97757] ml-1 align-middle animate-blink" />
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-text-dim text-center max-w-2xl mb-12 leading-relaxed">
        Work with Claude directly in your codebase. Build, debug, and ship from your terminal,
        IDE, Slack, or the web. Describe what you need, and Claude handles the rest.
      </p>

      {/* Install Block */}
      <div className="w-full max-w-xl mb-16">
        <CopyBlock text="https://claude.ai/install.ps1" />
        <div className="text-center mt-4 text-text-dim text-sm">
          Or read the <a href="#" className="underline hover:text-white decoration-text-dim underline-offset-4">documentation</a>
        </div>
      </div>

      {/* Social Proof Logos */}
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-8">
        <Logo name="intercom" />
        <Logo name="StubHub" />
        <Logo name="Uber" />
        <Logo name="databricks" />
      </div>
    </section>
  );
};

export default Hero;
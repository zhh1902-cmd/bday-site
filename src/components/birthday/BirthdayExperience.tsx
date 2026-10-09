import { BirthdayInfo } from "@/components/birthday/BirthdayInfo";
import { SpecialDay } from "@/components/birthday/SpecialDay";
import { HeroSection } from "@/components/hero/HeroSection";
import { JourneySection } from "@/components/journey/JourneySection";
import { MemoriesSection } from "@/components/memories/MemoriesSection";
import { QuizSection } from "@/components/quiz/QuizSection";
import { EmotionalMessages } from "@/components/emotional/EmotionalMessages";
import { CakeSection } from "@/components/cake/CakeSection";
import { BirthdayVoice } from "@/components/birthday/BirthdayVoice";

type BirthdayExperienceProps = {
  enableBirthdayVoice?: boolean;
};

export function BirthdayExperience({ enableBirthdayVoice = false }: BirthdayExperienceProps) {
  return (
    <main>
      <BirthdayVoice enabled={enableBirthdayVoice} />
      <HeroSection />
      <BirthdayInfo />
      <SpecialDay />
      <JourneySection />
      <MemoriesSection />
      <QuizSection />
      <EmotionalMessages />
      <CakeSection />
    </main>
  );
}
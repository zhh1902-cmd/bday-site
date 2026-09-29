import { BirthdayInfo } from "@/components/birthday/BirthdayInfo";
import { SpecialDay } from "@/components/birthday/SpecialDay";
import { HeroSection } from "@/components/hero/HeroSection";
import { JourneySection } from "@/components/journey/JourneySection";
import { MemoriesSection } from "@/components/memories/MemoriesSection";
import { QuizSection } from "@/components/quiz/QuizSection";
import { EmotionalMessages } from "@/components/emotional/EmotionalMessages";
import { CakeSection } from "@/components/cake/CakeSection";

export function BirthdayExperience() {
  return (
    <main>
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
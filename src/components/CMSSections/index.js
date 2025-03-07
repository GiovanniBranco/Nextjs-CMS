import { Menu } from "../commons/Menu";
import { Footer } from "../commons/Footer";
import SEOBlock from "./SEOBlock";
import HeroSection from "../../screens/HomeScreen/HeroSection";
import DisplayQuestions from "../../screens/FAQAllQuestionsScreen/DisplayQuestions";
import DisplayAnswers from "../../screens/FAQQuestionScreen/DisplayAnswers";

export const CmsSections = {
  CommonSeoBlockRecord: SEOBlock,
  CommonMenuRecord: (props) => <Menu {...props} />,
  PageHomeHeroSectionRecord: HeroSection,
  CommonFooterRecord: (props) => <Footer {...props} />,
  PageFaqDisplayQuestionsSectionRecord: DisplayQuestions,
  PageFaqQuestionsDisplayQuestionRecord: DisplayAnswers,
};

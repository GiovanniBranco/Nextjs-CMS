import { Menu } from "../commons/Menu";
import { Footer } from "../commons/Footer";
import SEOBlock from "./SEOBlock";
import PageHomeHeroSection from "./PageHomeHeroSection";

export const CmsSections = {
  CommonSeoBlockRecord: SEOBlock,
  CommonMenuRecord: (props) => <Menu {...props} />,
  PageHomeHeroSectionRecord: PageHomeHeroSection,
  CommonFooterRecord: (props) => <Footer {...props} />,
};

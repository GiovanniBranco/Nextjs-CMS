import CMSSectionRender from "../../components/CMSSections/CMSSectionRender";
import { PageHoc } from "../../components/wrappers/pageHOC";
import cmsService from "../../services/cmsService";

export async function getStaticProps({ preview }) {
  const globalContent = await cmsService.getGlobalContent(preview);
  const faqContent = await cmsService.getFAQContent(preview);
  return {
    props: {
      globalContent,
      faqContent: faqContent.pageFaq.pageContent[0].section,
    },
    revalidate: 3600, //1 hour
  };
}

function FAQAllQuestionsScreen({ faqContent }) {
  return <CMSSectionRender pageContent={faqContent} />;
}

export default PageHoc(FAQAllQuestionsScreen);

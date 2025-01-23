import { isHeading } from "datocms-structured-text-utils";
import Head from "next/head";
import { renderNodeRule, StructuredText } from "react-datocms";
import { Footer } from "../../components/commons/Footer";
import { Menu } from "../../components/commons/Menu";
import { PageHoc } from "../../components/wrappers/pageHOC";
import CmsService from "../../services/cmsService";
import { Box, Text, theme } from "../../theme/components";
import CMSSectionRender from "../../components/CMSSections/CMSSectionRender";

export async function getStaticPaths({ preview }) {
  const data = await CmsService.getFAQQuestions(preview, 100, 0);

  return {
    paths: data.allContentFaqQuestions.map(({ id }) => ({
      params: { id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview }) {
  const { id } = params;
  try {
    const pageContent = await CmsService.getFaqQuestionPageContent(preview);
    const faqQuestionData = await CmsService.getFaqQuestionContent(id, preview);
    const globalContent = await CmsService.getGlobalContent(preview);

    return {
      props: {
        id,
        content: {
          pageContent: pageContent.pageFaqQuestion.pageContent[0].section,
          generalContent: faqQuestionData,
        },
        globalContent: globalContent,
      },
    };
  } catch (e) {
    throw new Error(e.message);
  }
}

function FAQQuestionScreen({ content }) {
  return (
    <CMSSectionRender
      pageContent={content.pageContent}
      generalContent={content.generalContent}
    />
  );
}

export default PageHoc(FAQQuestionScreen);

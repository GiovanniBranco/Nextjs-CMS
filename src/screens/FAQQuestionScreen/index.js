import { isHeading } from "datocms-structured-text-utils";
import Head from "next/head";
import { renderNodeRule, StructuredText } from "react-datocms";
import { Footer } from "../../components/commons/Footer";
import { Menu } from "../../components/commons/Menu";
import { PageHoc } from "../../components/wrappers/pageHOC";
import CmsService from "../../services/cmsService";
import { Box, Text, theme } from "../../theme/components";

export async function getStaticPaths({ preview }) {
  const data = await CmsService.getFAQQuestions(preview, 100, 0);

  console.log(data.allContentFaqQuestions);
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
    const data = await CmsService.getFaqQuestionContent(id, preview);
    const globalContent = await CmsService.getGlobalContent(preview);
    return {
      props: {
        id,
        title: data?.contentFaqQuestion?.title,
        content: data?.contentFaqQuestion?.content,
        globalContent: globalContent,
      },
    };
  } catch (e) {
    throw new Error(e.message);
  }
}

function FAQQuestionScreen({ title, content }) {
  return (
    <>
      <Head>
        <title>FAQ - Alura</title>
      </Head>

      <Menu />

      <Box
        tag="main"
        styleSheet={{
          flex: 1,
          backgroundColor: theme.colors.neutral.x050,
          paddingTop: theme.space.x20,
          paddingHorizontal: theme.space.x4,
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            gap: theme.space.x4,
            flexDirection: "column",
            width: "100%",
            maxWidth: theme.space.xcontainer_lg,
            marginHorizontal: "auto",
          }}
        >
          <Text tag="h1" variant="heading1">
            {title}
          </Text>

          <StructuredText
            data={content}
            customNodeRules={[
              renderNodeRule(isHeading, ({ children, key, node }) => {
                const variant = `heading${node.level + 1}`;
                return (
                  <Text key={key} variant={variant}>
                    {children}
                  </Text>
                );
              }),
            ]}
          />
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default PageHoc(FAQQuestionScreen);

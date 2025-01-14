import Head from "next/head";
import { Footer } from "../../components/commons/Footer";
import { Menu } from "../../components/commons/Menu";
import { Box, Text, theme } from "../../theme/components";
import CmsService from "../../services/cmsService";
import { renderNodeRule, StructuredText } from "react-datocms";
import { isHeading } from "datocms-structured-text-utils";

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "f138c88d" } }, { params: { id: "h138c88d" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  try {
    const data = await CmsService.getFaqQuestionContent();
    const globalContent = await CmsService.getGlobalContent();
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

export default function FAQQuestionScreen({ title, content, globalContent }) {
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

      <Footer description={globalContent?.globalFooter?.description} />
    </>
  );
}

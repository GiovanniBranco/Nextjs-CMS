import { isHeading } from "datocms-structured-text-utils";
import { Box, Text, theme } from "../../../theme/components";
import { renderNodeRule, StructuredText } from "react-datocms";

const DisplayAnswers = ({ contentFaqQuestion }) => {
  return (
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
          {contentFaqQuestion.title}
        </Text>

        <StructuredText
          data={contentFaqQuestion.content}
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
  );
};

export default DisplayAnswers;

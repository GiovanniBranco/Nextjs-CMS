import { CmsSections } from ".";

const CMSSectionRender = ({ pageContent, generalContent }) => {
  return pageContent.map((content) => {
    const Component = CmsSections[content.componentName];

    if (!Component) return null;

    return <Component key={content.id} {...content} {...generalContent} />;
  });
};

export default CMSSectionRender;

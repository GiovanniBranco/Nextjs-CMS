import { CmsSections } from ".";

const CMSSectionRender = ({ pageContent }) => {
  return pageContent.map((content) => {
    const Component = CmsSections[content.componentName];

    return <Component key={content.id} {...content} />;
  });
};

export default CMSSectionRender;

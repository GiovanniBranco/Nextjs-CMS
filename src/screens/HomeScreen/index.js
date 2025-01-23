import CMSSectionRender from "../../components/CMSSections/CMSSectionRender";
import { PageHoc } from "../../components/wrappers/pageHOC";
import CmsService from "../../services/cmsService";

export async function getStaticProps({ preview }) {
  const globalContent = await CmsService.getGlobalContent(preview);
  const homeContent = await CmsService.getHomeContent(preview);
  return {
    props: {
      globalContent,
      homeContent: homeContent.pageHome.pageContent[0].section,
    },
    revalidate: 3600, //1 hour
  };
}

function HomeScreen({ homeContent }) {
  return <CMSSectionRender pageContent={homeContent} />;
}

export default PageHoc(HomeScreen);

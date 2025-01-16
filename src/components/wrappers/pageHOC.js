import CMSProvider from "../../services/providers/cmsProvider";

export function PageHoc(Component) {
  return function Wrapper(props) {
    return (
      <CMSProvider globalContent={props.globalContent}>
        <Component {...props} />
      </CMSProvider>
    );
  };
}

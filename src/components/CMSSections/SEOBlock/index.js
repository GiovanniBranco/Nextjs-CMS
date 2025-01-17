import Head from "next/head";

const SEOBlock = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
    </Head>
  );
};

export default SEOBlock;

import axiosClient from "./axiosClient";

class CmsService {
  async getFaqQuestionPageContent(isPreview = false) {
    const query = `query {
      pageFaqQuestion {
        pageContent {
          section {
            componentName: __typename
                  ... on CommonSeoBlockRecord {
                    id
                    title
                  }
                  ...on CommonMenuRecord {
                    id
                  }
                  ...on PageFaqQuestionsDisplayQuestionRecord {
                    id
                  }
                  ...on CommonFooterRecord {
                    id
                  }
          }
        }
      }
    }`;

    return await this.fetchData(query, isPreview);
  }

  async getFaqQuestionContent(id, isPreview = false) {
    const query = `query($id: ItemId) {
      contentFaqQuestion(filter: {
        id: {
          eq: $id
        }
      } ) {
        title
        content {
            value
        }
      }
    }`;

    const variables = {
      id,
    };

    return await this.fetchData(query, isPreview, variables);
  }

  async getGlobalContent(isPreview = false) {
    const query = `query {
        globalFooter {
          description
        }
    }`;

    return await this.fetchData(query, isPreview);
  }

  async getHomeContent(isPreview = false) {
    const query = `query {
        pageHome {
          pageContent {
            section{
              componentName: __typename
              ... on CommonSeoBlockRecord {
                id
                title
              }
              ...on CommonMenuRecord {
                id
              }
              ...on PageHomeHeroSectionRecord{
                id
                title
                description
                ctatext
                ctalink
              }
              ...on CommonFooterRecord {
                id
              }
            }
          }
        }
    }`;

    return await this.fetchData(query, isPreview);
  }

  async getFAQContent(isPreview = false) {
    const query = `query {
        pageFaq {
          pageContent {
            section{
              componentName: __typename
              ... on CommonSeoBlockRecord {
                id
                title
              }
              ...on CommonMenuRecord {
                id
              }
              ...on PageFaqDisplayQuestionsSectionRecord {
                id
                categories {
                  id
                  title
                  questions {
                    id
                    title
                  }
                }
              }
              ...on CommonFooterRecord {
                id
              }
            }
          }
        }
    }`;

    return await this.fetchData(query, isPreview);
  }

  async getFAQQuestions(isPreview = false, first = 10, skip = 0) {
    const query = `query($first: IntType, $skip: IntType) {
        allContentFaqQuestions(first: $first, skip:$skip) {
          id
          title
        }
    }`;

    const variables = {
      first: first,
      skip: skip,
    };

    return await this.fetchData(query, isPreview, variables);
  }

  async fetchData(query, isPreview, variables = {}) {
    const url = isPreview ? "preview" : "";
    return await axiosClient
      .post(
        url,
        { query, variables },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${process.env.DATO_API_TOKEN}`,
          },
        }
      )
      .then((response) => {
        if (!response.data.errors) return response.data.data;

        throw new Error(response.data.errors[0].message);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
}

export default new CmsService();

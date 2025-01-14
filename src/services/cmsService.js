import axiosClient from "./axiosClient";

class CmsService {
  async getFaqQuestionContent(isPreview = false) {
    const query = `
        query {
        contentFaqQuestion {
            title
            content {
                value
            }
        }   
    }`;

    return await this.fetchData(query, isPreview);
  }

  async getGlobalContent(isPreview = false) {
    const query = `query {
        globalFooter {
          description
        }
    }`;

    return await this.fetchData(query, isPreview);
  }

  async fetchData(query, isPreview) {
    const url = isPreview ? "preview" : "";
    return await axiosClient
      .post(
        url,
        { query },
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

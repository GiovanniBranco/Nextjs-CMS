import axiosClient from "./axiosClient";

class CmsService {
  async getFaqQuestionContent() {
    const query = `
        query {
        contentFaqQuestion {
            title
            content {
                value
            }
        }   
    }`;

    return await axiosClient
      .post(
        "",
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

import apiRequest from './apiRequest';

export const singlePostLoader = async ({ request, params }) => {
  const res = await apiRequest.get(`/posts/${params.id}`);
  return res.data;
};
export const ListOwnChat = async () => {
  const chatResponse = apiRequest.get(`/chats`);
  return { chatResponse };
};
export const ProfileLoader = async () => {
  try {
    //list own post
    const postResponse = apiRequest.get(`/posts/post-of-user`);
    //list post saved
    const postSavedResponse = apiRequest.get(`/saved-posts`);
    //list chat
    const chatResponse = apiRequest.get(`/chats`);

    // Trả về cả hai dữ liệu trong một object
    return {
      postResponse,
      postSavedResponse,
      chatResponse,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      postResponse: [],
      postSavedResponse: [],
      chatResponse: [],
    };
  }
};

export const ListPostLoader = async ({ request, params }) => {
  const query = request.url.split('?')[1];

  // Trả về Promise mà không cần await ngay
  const postResponse = apiRequest.get('/posts?' + query);

  return {
    postResponse, // Trả về Promise
  };
};

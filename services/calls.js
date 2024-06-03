export const postData = (data) => {
  return new Promise((resolve, reject) => {
    console.log('data sent', data);
    resolve({
      response: 'true posData'
    });
  });
};

// For receiving request to send ajax to external post api
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  let { msgFrom, msgData, msgUrlEndpoint } = msg;
  console.log(`Executing background event sent from: ${msgFrom}`);
  switch (msgFrom) {
    case 'send save recipe to external API':
      sendDataToAPI(msgData, msgUrlEndpoint).then((response) => {
        sendResponse(response);
        if (response.success) {
          chrome.action.setIcon({
            path: './successIcon128x128.png',
          });
        } else {
          chrome.action.setIcon({
            path: './alertIcon128x128.png',
          });
        }
      });
      break;
    default:
      break;
  }
  console.log(`Finished executing background event sent from: ${msgFrom}`);

  return true;
});

async function sendDataToAPI(data, url) {
  try {
    console.log(`Sending POST request to endpoint: ${url}`);
    console.log(`with data ${data}`);
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log({ response });
    return { success: true, response };
  } catch (error) {
    return { success: false, error };
  }
}

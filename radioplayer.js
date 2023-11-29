// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>

document.addEventListener("DOMContentLoaded", function () {
  const channelList = document.getElementById("channel-list");

  // Fetch data from the Sveriges Radio API
  fetch("https://api.sr.se/api/v2/channels?format=json")
    .then((response) => response.json())
    .then((data) => {
      // Extract the list of channels from the JSON
      const channels = data.channels;

      // Render each channel
      channels.forEach((channel) => {
        const channelCard = createChannelCard(channel);
        channelList.appendChild(channelCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  function createChannelCard(channel) {
    const channelCard = document.createElement("div");
    channelCard.classList.add("channel-card");

    channelCard.style.backgroundColor = "#" + channel.color;

    const channelImage = document.createElement("img");
    channelImage.src = channel.image;
    channelImage.width = "150";
    channelImage.height = "150";
    channelImage.classList.add("channel-image");

    const channelName = document.createElement("div");
    channelName.textContent = channel.name;
    channelName.classList.add("channel-name");

    const audioElement = document.createElement("audio");
    audioElement.controls = true;

    const sourceElement = document.createElement("source");
    sourceElement.src = channel.liveaudio.url;
    sourceElement.type = "audio/mpeg";

    audioElement.appendChild(sourceElement);

    channelCard.appendChild(channelImage);
    channelCard.appendChild(channelName);
    channelCard.appendChild(audioElement);

    return channelCard;
  }
});

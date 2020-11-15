const tmi = require('tmi.js');
var LastfmAPI = require('lastfmapi');
const dotenv = require('dotenv');
dotenv.config();

// Define configuration options
const opts = {
  identity: {
    username: `${process.env.BOTUSERNAME}`,
    password: `${process.env.BOTPASSWORD}`
  },
  channels: [
    `${process.env.CHANNELS}`
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

//LastFM auth
var lfm = new LastfmAPI({
	'api_key' : `${process.env.LFMAPIKEY}`,
	'secret' : `${process.env.LFMSECRET}`
});

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  }
  else if (commandName === '!website'){
      client.say(target, 'My Website Link: https://blog.nailima.dev/');
      console.log(`* Executed ${commandName} command`);
  }
  // else if (commandName === '!music'){
  //   const songName = getSong(name);
  //   const songArtist = getSong(artist);
  //   client.say(target, '');
  // }
  else if (commandName === '!specs'){
    client.say(target, '!pc for Desktop specs - !laptop for laptop specs' );
  }
  else if (commandName === '!laptop'){
    client.say(target, 'Laptop: Dell XPS 15 9570 - Intel i7-8750H Hexa-Core - GTX 1050 Ti Max-Q - 16 GB Ram - 512 GB NVME SSD - 4TB External USB HDD' );
  }
  else if (commandName === '!pc'){
    client.say(target, 'Desktop (in progress) -- CPU: AMD Ryzen 9 5900X 12-Core - GPU: GTX Titan X (Pascal) - RAM: Corsair Vengeance RGB 32 GB (2 x 16 GB) - Full Spec: https://pcpartpicker.com/user/spider6516/saved/bQGJbv' );
  }
  else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// // Called each time the music command is executed
// function getSong () {
//   lfm.user.getRecentTracks({
//     nowplaying="true"
//   })
// }
'use strict';

const {dialogflow,
       SimpleResponse,
       BasicCard,
       Image,
       Button,
       BrowseCarousel,
       BrowseCarouselItem,
       Suggestions,
       LinkOutSuggestion,
       MediaObject,
       Table,
       List,
       Carousel,  
      } = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({debug: true});

//Default welcome intent
app.intent('Default Welcome Intent', (conv) => {
  conv.ask('Welcome to my agent: Bot Bee Alpana Patel');
  conv.ask('Which response would you like to see next');

});
// This is for Simple Response
app.intent('Simple Response', (conv) => {
  conv.ask(new SimpleResponse({
    speech: `Here's an example of a simple response. ` +
      `Which type of response would you like to see next?`,
    text: `Here's a simple response. ` +
      `Which response would you like to see next?`,
  }));
  
});
// End of Simple Response
// [SSML Response]
app.intent('SSML', (conv) => {
  conv.ask(`<speak>` +
    `Here are <say-as interpet-as="characters">SSML</say-as> examples.` +
    `Here is a buzzing fly ` +
    `<audio src="https://actions.google.com/sounds/v1/animals/buzzing_fly.ogg"></audio>` +
    `and here's a short pause <break time="800ms"/>` +
    `</speak>`);
  conv.ask('Which response would you like to see next?');
});
// [END of SSML]

// This contain the Basic card example, Rich Response 1

app.intent('Test Card', (conv) => {
 if (!conv.screen) {
    conv.ask('Sorry, try this on a screen device or select the ' +
      'phone surface in the simulator.');
    conv.ask('Which response would you like to see next?');
    return;
  }

  conv.ask(`Here's an example of a basic card.`);
  conv.ask(new BasicCard({
    text: `This is a basic card.  Text in a basic card can include "quotes" and
    most other unicode characters including emojis.  Basic cards also support
    some markdown formatting like *emphasis* or _italics_, **strong** or
    __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other
    things like line  \nbreaks`, // Note the two spaces before '\n' required for
                                 // a line break to be rendered in the card.
    subtitle: 'BotBee offers diffrent places for travelling',
    title: 'Bot Bee: this is for travelling bot',
    buttons: new Button({
      title: 'This is a button',
      url: 'https://assistant.google.com/',
    }),
    image: new Image({
      url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
      alt: 'Image alternate text',
    }),
    display: 'CROPPED',
  }));
  conv.ask('Which response would you like to see next?');
});

//End of Basic card

//Start of Rich Response Browse Carousel 
app.intent('Test Browse Caro', (conv) => {
  if (!conv.screen || !conv.surface.capabilities.has('actions.capability.WEB_BROWSER')) {
    conv.ask('Sorry, try this on a phone or select the ' +
      'phone surface in the simulator.');
      conv.ask('Which response would you like to see next?');
    return;
  }

  conv.ask(`Here's an example of a browsing carousel.`);
  conv.ask(new BrowseCarousel({
    items: [
      new BrowseCarouselItem({
        title: 'Title of item 1',
        url: 'https://example.com',
        description: 'Description of item 1',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Image alternate text',
        }),
        footer: 'Item 1 footer',
      }),
      new BrowseCarouselItem({
        title: 'Title of item 2',
        url: 'https://example.com',
        description: 'Description of item 2',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Image alternate text',
        }),
        footer: 'Item 2 footer',
      }),
    ],
  }));
});
// [END df_js_browse_caro]

//This is the example of Suggestion Chip
app.intent('Suggestion Chips', (conv) => {
  if (!conv.screen) {
    conv.ask('Chips can be demonstrated on screen devices.');
    conv.ask('Which response would you like to see next?');
    return;
  }

  conv.ask('These are suggestion chips.');
  conv.ask(new Suggestions('Car'));
  conv.ask(new Suggestions(['Rooms', 'City']));
  conv.ask(new LinkOutSuggestion({
    name: 'Suggestion Link',
    url: 'https://assistant.google.com/',
  }));
  conv.ask('Which type of response would you like to see next?');
});

// This is the example of Media Responses

app.intent('Media Response', (conv) => {
  if (!conv.surface.capabilities
    .has('actions.capability.MEDIA_RESPONSE_AUDIO')) {
      conv.ask('Sorry, this device does not support audio playback.');
      conv.ask('Which response would you like to see next?');
      return;
  }

  conv.ask('This is a media response example.');
  conv.ask(new MediaObject({
    name: 'Jazz in Paris',
    url: 'https://storage.googleapis.com/automotive-media/Jazz_In_Paris.mp3',
    description: 'A funky Jazz tune',
    icon: new Image({
      url: 'https://storage.googleapis.com/automotive-media/album_art.jpg',
      alt: 'Album cover of an ocean view',
    }),
  }));
  conv.ask(new Suggestions(['Basic Card', 'List',
    'Carousel', 'Browsing Carousel']));
});

// End of media responses

//Start of Media status

app.intent('Media Status', (conv) => {
  const mediaStatus = conv.arguments.get('MEDIA_STATUS');
  let response = 'Unknown media status received.';
  if (mediaStatus && mediaStatus.status === 'FINISHED') {
    response = 'Hope you enjoyed the tune!';
  }
  conv.ask(response);
  conv.ask('Which response would you like to see next?');
});

//End of media status

// Start of Table Card
app.intent('Simple Table Card', (conv) => {
  if (!conv.screen) {
    conv.ask('Sorry, try this on a screen device or select the ' +
      'phone surface in the simulator.');
    conv.ask('Which response would you like to see next?');
    return;
  }

  conv.ask('This is a simple table example.');
  conv.ask(new Table({
    dividers: true,
    columns: ['Car', 'Rooms', 'header 3'],
    rows: [
      ['Sedan', 'Single', 'row 1 item 3'],
      ['BMW', 'Queen', 'row 2 item 3'],
    ],
  }));
  conv.ask('Which response would you like to see next?');
});

//End of Table Card

// Start of Advanced Table Card

app.intent('Advanced Table Card', (conv) => {
  if (!conv.screen) {
    conv.ask('Sorry, try this on a screen device or select the ' +
      'phone surface in the simulator.');
    conv.ask('Which response would you like to see next?');
    return;
  }

  conv.ask('This is a table with all the possible fields.');
  conv.ask(new Table({
    title: 'Table Title',
    subtitle: 'Table Subtitle',
    image: new Image({
      url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
      alt: 'Alt Text',
    }),
    columns: [
      {
        header: 'header 1',
        align: 'CENTER',
      },
      {
        header: 'header 2',
        align: 'LEADING',
      },
      {
        header: 'header 3',
        align: 'TRAILING',
      },
    ],
    rows: [
      {
        cells: ['row 1 item 1', 'row 1 item 2', 'row 1 item 3'],
        dividerAfter: false,
      },
      {
        cells: ['row 2 item 1', 'row 2 item 2', 'row 2 item 3'],
        dividerAfter: true,
      },
      {
        cells: ['row 3 item 1', 'row 3 item 2', 'row 3 item 3'],
      },
    ],
    buttons: new Button({
      title: 'Button Text',
      url: 'https://assistant.google.com',
    }),
  }));
  conv.ask('Which response would you like to see next?');
});
// End of Advanced table card

// Start of List

app.intent('List', (conv) => {
  if (!conv.screen) {
    conv.ask('Sorry, try this on a screen device or select the ' +
      'phone surface in the simulator.');
    return;
  }

  conv.ask('This is a list example.');
  // Create a list
  conv.ask(new List({
    title: 'List Title',
    items: {
      // Add the first item to the list
      'SELECTION_KEY_ONE': {
        synonyms: [
          'synonym 1',
          'synonym 2',
          'synonym 3',
        ],
        title: 'Title of First List Item',
        description: 'This is a description of a list item.',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Image alternate text',
        }),
      },
      // Add the second item to the list
      'SELECTION_KEY_GOOGLE_HOME': {
        synonyms: [
          'Google Home Assistant',
          'Assistant on the Google Home',
      ],
        title: 'Google Home',
        description: 'Google Home is a voice-activated speaker powered by ' +
          'the Google Assistant.',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Google Home',
        }),
      },
      // Add the third item to the list
      'SELECTION_KEY_GOOGLE_PIXEL': {
        synonyms: [
          'Google Pixel XL',
          'Pixel',
          'Pixel XL',
        ],
        title: 'Google Pixel',
        description: 'Pixel. Phone by Google.',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Google Pixel',
        }),
      },
    },
  }));
});
//End of List

//  start of List Option
app.intent('List - OPTION', (conv, params, option) => {
  const SELECTED_ITEM_RESPONSES = {
    'SELECTION_KEY_ONE': 'You selected the first item',
    'SELECTION_KEY_GOOGLE_HOME': 'You selected the Google Home!',
    'SELECTION_KEY_GOOGLE_PIXEL': 'You selected the Google Pixel!',
  };
  conv.ask(SELECTED_ITEM_RESPONSES[option]);
  conv.ask('Which response would you like to see next?');
});

//End of List option

//Start of Carousel
app.intent('Carousel', (conv) => {
  if (!conv.screen) {
    conv.ask('Sorry, try this on a screen device or select the ' +
      'phone surface in the simulator.');
    return;
  }

  conv.ask('This is a carousel example.');
  // Create a carousel
  conv.ask(new Carousel({
    title: 'Carousel Title',
    items: {
      // Add the first item to the carousel
      'SELECTION_KEY_ONE': {
        synonyms: [
          'synonym 1',
          'synonym 2',
          'synonym 3',
        ],
        title: 'Title of First Carousel Item',
        description: 'This is a description of a carousel item.',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Image alternate text',
        }),
      },
      // Add the second item to the carousel
      'SELECTION_KEY_GOOGLE_HOME': {
        synonyms: [
          'Google Home Assistant',
          'Assistant on the Google Home',
      ],
        title: 'Google Home',
        description: 'Google Home is a voice-activated speaker powered by ' +
          'the Google Assistant.',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Google Home',
        }),
      },
      // Add the third item to the carousel
      'SELECTION_KEY_GOOGLE_PIXEL': {
        synonyms: [
          'Google Pixel XL',
          'Pixel',
          'Pixel XL',
        ],
        title: 'Google Pixel',
        description: 'Pixel. Phone by Google.',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Google Pixel',
        }),
      },
    },
  }));
});

//End of Carousel

//start of carousel option

app.intent('Carousel - OPTION', (conv, params, option) => {
  const SELECTED_ITEM_RESPONSES = {
    'SELECTION_KEY_ONE': 'You selected the first item',
    'SELECTION_KEY_GOOGLE_HOME': 'You selected the Google Home!',
    'SELECTION_KEY_GOOGLE_PIXEL': 'You selected the Google Pixel!',
  };
  conv.ask(SELECTED_ITEM_RESPONSES[option]);
  conv.ask('Which response would you like to see next?');
});
//End of carousel option

// Booking with BookRooms Intent
app.intent('BookRooms', (conv) => {
conv.ask('I have booked room in city on date');
});


exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
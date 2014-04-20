'use strict';
angular.module('module.service')

.factory('barService', function () {
  return {
    getBars: function () {
      return [
        { id: 'Allen.St..Grill', name : 'Allen St. Grill', lat:'40.794302', lon:'-77.861613' },
        { id: 'Bar.Bleu', name : 'Bar Bleu', lat:'40.79773', lon:'-77.856613' },
        { id: 'The.Brewery', name : 'The Brewery', lat:'40.794952', lon:'-77.858437' },
        { id: 'Cafe.210', name : 'Cafe 210', lat:'40.793246', lon:'-77.862986' },
        { id: 'Chilis', name : 'Chilis', lat:'40.793864', lon:'-77.860543' },
        { id: 'Chrome', name : 'Chrome', lat:'40.791849', lon:'-77.862299' },
        { id: 'Chumleys', name : 'Chumley\'s', lat:'40.794188', lon:'-77.861763' },
        { id: 'Darkhorse.Tavern', name : 'Darkhorse Tavern', lat:'40.79466', lon:'-77.860218' },
        { id: 'Gingerbread.Man', name : 'Gingerbread Man', lat:'40.796706', lon:'-77.856849' },
        { id: 'Indigo', name : 'Indigo', lat:'40.794123', lon:'-77.861806' },
        { id: 'Inferno', name : 'Inferno', lat:'40.797535', lon:'-77.857321' },
        { id: 'Kildares', name : 'Kildares', lat:'40.800109', lon:'-77.85379' },
        { id: 'Levels', name : 'Levels', lat:'40.798233', lon:'-77.85627' },
        { id: 'Lions.Den', name : 'Lion\'s Den', lat:'40.797523', lon:'-77.856519' },
        { id: 'Local.Whiskey', name : 'Local Whiskey', lat:'40.793683', lon:'-77.860092' },
        { id: 'Mad.Mex', name : 'Mad Mex', lat:'40.793872', lon:'-77.85852' },
        { id: 'The.Phyrst', name : 'The Phyrst', lat:'40.793683', lon:'-77.860092' },
        { id: 'Bill.Pickles.Tap.Room', name : 'Bill Pickles Tap Room', lat:'40.794156', lon:'-77.861386' },
        { id: 'The.Rathskeller', name : 'The Rathskeller', lat:'40.795151', lon:'-77.860357' },
        { id: 'Rotellis', name : 'Rotellis', lat:'40.795699', lon:'-77.858772' },
        { id: 'Rumors.Lounge', name : 'Rumors Lounge', lat:'40.791536', lon:'-77.864552' },
        { id: 'The.Saloon', name : 'The Saloon', lat:'40.797315', lon:'-77.857395' },
        { id: 'The.Shandygaff', name : 'The Shandygaff', lat:'40.795301', lon:'-77.859534' },
        { id: 'The.Tavern.Restaurant', name : 'The Tavern Restaurant', lat:'40.795677', lon:'-77.859783' },
        { id: 'Z.Bar...The.Deli', name : 'Z Bar @ The Deli', lat:'40.797133', lon:'-77.857179' },
        { id: 'Zenos', name : 'Zenos', lat:'40.79432', lon:'-77.861621' }
      ];
    },
    getSpecials: function () {
      return [
        { id: 'Darkhorse.Tavern', days: 'MWF', times: '8pm-12pm', description: '1/2 price wings' },
        { id: 'Mad.Mex', days: 'W', times: '8pm-12pm', description: '1/2 price on all food' }
      ];
    }
  };
});
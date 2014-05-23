var querystring = Meteor.require('querystring');
var http = Meteor.require('http');
var fs = Meteor.require('fs');


HipChat = function (message) {
  var ROOM_ID = 1111111,
    AUTH_TOKEN = '******';

// Build the post string from an object
  var post_data = JSON.stringify({
    color: 'purple',
    message_format: 'text',
    message: message
  });
  console.log(post_data);

// An object of options to indicate where to post to
  var post_options = {
    host: 'api.hipchat.com',
    port: '80',
    path: '/v2/room/' + ROOM_ID + '/notification?auth_token=' + AUTH_TOKEN,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': post_data.length
    }
  };

// Set up the request
  var post_req = http.request(post_options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('Response: ' + chunk);
    });
  });

  post_req.write(post_data);
  post_req.end();
};

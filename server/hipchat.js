var querystring = Meteor.require('querystring');
var http = Meteor.require('http');
var fs = Meteor.require('fs');


HipChat = function (task, project, member) {
    // TODO
  var ROOM_ID = '********',
    AUTH_TOKEN = '********************************';

  if (!member) {
    member = Members.findOne({_id: task.memberId});
  }

// Build the post string from an object
  var post_data = JSON.stringify({
    color: 'purple',
    message_format: 'html',
    message: addInfo(task, project, member)
  });

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

function addInfo(task, project, member) {
  var msg = Scrummie.hipchat.message,
      url = (Scrummie.host.protocol ||'http://') + Scrummie.baseUrl;
  console.log(url);

  if (project) {
    msg = msg.replace('{{project}}', project);
  }

  for(var key in member) {
    msg = msg.replace('{{member.' + key + '}}', member[key]);
  }

  for(var key in task) {
    msg = msg.replace('{{task.' + key + '}}', task[key]);
  }

  if (url) {
    msg = msg.replace('{{url}}', url);
  }

  logger.info('Hipchat msg: ' + msg);

  return msg;
}

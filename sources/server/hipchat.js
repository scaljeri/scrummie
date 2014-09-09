var querystring = Meteor.require('querystring');
var http = Meteor.require('http');
var fs = Meteor.require('fs');


HipChat = function (task) {
    var member, settings = Settings.findOne({projectId: task.projectId}),
        project = Projects.findOne({_id: task.projectId});

    if (!settings.hipchat || !settings.hipchat.roomId || !settings.hipchat.authToken) {
        return ;
    }

    if (task.memberId) {
        member = Meteor.user() ? Meteor.users.findOne({_id: task.memberId}) : Members.findOne({_id: task.memberId});
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
        path: '/v2/room/' + settings.hipchat.roomId + '/notification?auth_token=' + settings.hipchat.authToken,
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
    var key, msg = Meteor.settings.hipchat.message;

    if (project) {
        msg = msg.replace('{{project}}', project.name);
    }

    for (key in member.profile) {
        msg = msg.replace('{{member.' + key + '}}', member.profile[key]);
    }

    for (key in task) {
        msg = msg.replace('{{task.' + key + '}}', task[key]);
    }

    msg = msg.replace('{{taskUrl}}', Meteor.absoluteUrl() + project.name + '/task/' + task._id);

    console.log('Hipchat msg: ' + msg);

    return msg;
}

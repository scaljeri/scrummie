Lanes = new Meteor.Collection('lanes');
Postits = new Meteor.Collection('postits');


if (Meteor.isClient) {
	Meteor.subscribe('lanes');
	Meteor.subscribe('postits');
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Lanes.find({}).count() === 0) {
        Lanes.insert({ title: 'todo', message: 'Tasks to be done', index: 0});
        Lanes.insert({ title: 'in progress', message: 'Tasks in progress', index: 1});
        Lanes.insert({ title: 'test', message: 'Tasks under test', index: 2});
        Lanes.insert({ title: 'done', message: 'Tasks done', index: 3});
    }
  });
}

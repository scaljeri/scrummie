Lanes = new Meteor.Collection('lanes');
Cards = new Meteor.Collection('cards');


if (Meteor.isClient) {
	Meteor.subscribe('lanes');
	Meteor.subscribe('cards');

    Template.scrumboard.lanes = function () {
	    return Lanes.find({}).fetch();
    };

    Template.scrumboard.events = {
        "click .add": function () {
        }
    };

    Template.scrumcards.cards = function () {
        return Cards.find({}).fetch();
    };
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

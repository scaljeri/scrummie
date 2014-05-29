Meteor.methods({
  upsertMember: function (member) {
    Members.upsert(
      { initials: member.initials},
      {$set: {name: member.name, initials: member.initials}}
    );
  }
});
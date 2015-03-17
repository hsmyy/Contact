
Contacts = new Mongo.Collection('contacts');

Contacts.before.insert(function (userId, doc) {
  //var gender = Random.choice(['men', 'women']);
  //var num = _.random(0, 50);
  //doc.avatarUrl = 'https://randomuser.me/api/portraits/thumb/' + gender + '/' + num + '.jpg';
});

Contacts.attachSchema(new SimpleSchema({
  name: {
    type: Object
  },
  'name.name': {
    type: String,
    label: 'First Name',
    autoform: {
      'label-type': 'floating',
      placeholder: 'Name'
    },
    max: 200
  },
  emails: {
    type: [Object]
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Email Address'
    }
  },
  'emails.$.label': {
    type: String,
    label: 'Label',
    autoform: {
      options: [
        {value: 'Work', label: 'Work'},
        {value: 'Home', label: 'Home'},
        {value: 'School', label: 'School'},
        {value: 'Other', label: 'Other'}
      ]
    }
  },
  priority: {
    type: String,
    optional: true,
    autoform: {
      options: [
        {value: 'High', label: 'High'},
        {value: 'Medium', label: 'Medium'},
        {value: 'Low', label: 'Low'}
      ],
      type: 'select-radio'
    }
  },
  location: {
    type: Object
  },
  'location.city': {
    type: String,
    max: 200
  },
  details: {
    type: Object
  },
  'details.notes': {
    type: String,
    label: 'Notes',
    optional: true,
    autoform: {
      rows: 10,
      'label-type': 'stacked'
    }
  },
  'details.active': {
    type: Boolean,
    defaultValue: true,
    autoform: {
      type: 'toggle'
    }
  }
}));

Contacts.search = function(query) {
  if (!query) {
    return;
  }
  var res = Contacts.find({
    $or: [{'name.name': { $regex: query, $options: 'i' }},
    {'details.notes': {$regex: query, $options:'i'}}]
  });
  return res;
};

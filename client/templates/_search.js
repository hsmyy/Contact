Template._search.events({
  'keyup input': function(event, template){
	Session.set('searchQuery', event.target.value);
  },
  'click a': function(event, tempalte){
	IonModal.close();
  }
});

Template._search.helpers({
	contacts: function(){
		return Contacts.search(Session.get('searchQuery'));
	}
});

if(Meteor.isClient) {


MessageUsersOnline = new Meteor.Collection('messageusersonline', {
    transform: function(doc) {return new MessageUsersOnlineDocument(doc);}
});

MessageUsersOnline.deny({
    insert: function() {return true;},
    update: function() {return true;},
    remove: function() {return true;}
});

MessageUsersOnlineDocument = function(doc){
    var self = this;
    _.extend(self, doc);
};

_.extend(MessageUsersOnlineDocument.prototype, {
    constructor: MessageUsersOnlineDocument,
    myChat: function(){
        return this.userId === Meteor.userId();
    }
});

Meteor.subscribe('messageusersonline', function(err){
    console.error('err', err);
});


}
else if(Meteor.isServer) {


/**
 *
 */
Meteor.methods({
    'sendMessageToUser': function(userId, message){
        var self = this;
        var sender = Meteor.users.findOne(self.userId);
        UsersOnline.find({'user._id': { $in: [userId, self.userId] }}).forEach(function(conn){
            Connections.sendMessage(conn.connection, {
                userId: sender._id,
                image: sender.profile.image,
                message: message,
                updated: new Date()
            });
        });
    }
});


}
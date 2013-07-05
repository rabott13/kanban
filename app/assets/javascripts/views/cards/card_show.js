Kanban.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  tagName: "article",
  className: "card_detail",

  events: {
    "submit form#add_comment": "addComment",
  },

  addComment: function (event) {
    var that = this;
  	event.preventDefault();

  	// var cardId = parseInt($(event.target).data("card-id"));
  	console.log("add comment");
    var card = that.model;
    var cards = card.collection;
    console.log(cards);

  	// get form attrs, reset form
  	var $form = $(event.target);
		var attrs = $form.serializeJSON();
		$form[0].reset();

    // TODO: research toJSON override via backbone relational
    // suspect it prevents need to patch ids in like this
    attrs.card_comment.card_id = card.id;
    console.log(attrs.card_comment);

		var cardComment = new Kanban.Models.CardComment();	
    cardComment.save(attrs.card_comment, {
      success: function (response) {
        cards.add(cardComment);
        console.log(cards);

        // TODO: this is insane
        // console.log(that.$el);
        // that.$el.html("HELLLOOOOoooo.... ");
        // var $cardModal = that.$el.find("section.card_detail");
        // $cardModal.html("HELLO!");

        // var cardShow = new Kanban.Views.CardShow({
        //   model: card
        // });
        var $comments = that.$el.find("ul.comments");
        $comments.append(attrs.card_comment.content);
        // $cardModal.find("article.card_detail").modal();
      }
    });

		// // save list
		// list.save(attrs.list, {
		// 	success: function (data) {
		// 		var lists = board.lists();
		// 		lists.add(list);
		// 		board.trigger("add");
		// 	}
		// });
  },

  render: function () {
  	var that = this;

  	var card = that.model;
  	var comments = card.get("comments");
  	// console.log(comments);
  	// var list = card.get("list");
  	// var board = list.get("board");
  	// console.log("card show:");
  	var renderedContent = that.template({
  		card: card,
  		comments: comments
  		// comments: comments
  	});

  	that.$el.html(renderedContent);
  	return that;

  	// var cardComments = new Kanban.Collections.CardComments();
  	// cardComments.fetch({
  	// 	cardId: card.id,
  	// 	success: function (comments) {

  	// 		console.log(comments);
  	// 		// card.reset(comments);
  	// 		// console.log(comments);

		 //  	var renderedContent = that.template({
		 //  		card: card,
		 //  		comments: comments
		 //  	});

		 //  	that.$el.html(renderedContent);
		 //  	return that;
  	// 	}
  	// });

  	// console.log(comments;)

  	// var comments = comments.fetch(card.id);

  	// var comments = card.fetch("comments");
  	// var comments = card.get("comments").fetch();
  	// console.log(comments);

  }

});

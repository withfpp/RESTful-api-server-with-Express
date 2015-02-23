var Article = require('../models/article');

// GET show
// GET list
// POST add
// PUT edit
// DELETE del


// GET article
exports.show = function(req, res, next) {
  Article.findById(req.params.id, function(err, article){
    if (err)
      res.send(err)
    res.json(article)
  })
};

// GET articles (list)
exports.list = function(req, res, next) {
  Article.find(function(err, articles){
    if(err)
      res.send(err)
    res.json(articles)
  })
};

// POST article
exports.add = function(req, res, next) {
 
  if (!req.body.title || !req.body.text) {
    return res.json({message: 'Please fill all information.'})
  }

  var article = new Article({
    title: req.body.title,
    slug: req.body.slug,
    text: req.body.text,
    published: false
  });

  // save and check for errors
  article.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Article created!' });
  });
};

// UPDATE article
exports.edit = function(req, res, next) {
  Article.findById(req.params.id, function (err, article){
      
      if(err)
        res.send(err);

      //update 
      article.title = req.body.title
      article.text = req.body.text

      //save
      article.save(function (err){
        if (err)
          res.send(err)

        res.json({message: 'Update success!'})
      })
    })
};


// DELETE article
exports.del = function(req, res, next) {
  Article.remove({
    _id: req.params.id
  }, function(err, article){
    if (err)
      res.send(err);

    res.json({message: 'Successfully deleted'});
  })
};



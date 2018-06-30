const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const mergeJSON = require("merge-json") ;
const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

const Questions = require('../model/QuestionsSchema');

const Answer = require('../model/AnswerSchema');

const Options = require('../model/OptionsSchema');

router.get('/', (req, res, next) => {
  Questions.find().then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json({
      error: err
    })
  });
});


router.post('/', (req, res, next) => {
  Questions.find({
    question: req.body.question
  }).then(ques => {
    if (ques.length) {
      return res.status(409).json({
        message: "Question already exist"
      })
    } else {
      const questions = new Questions({
        _id: new mongoose.Types.ObjectId(),
        question: req.body.question,
        start_date: req.body.start_date,
        end_date: req.body.end_date
      });
      questions.save().then(result => {
        res.status(201).json(result)
      }).catch(err => {
        res.status(500).json({
          error: err
        })
      });
    }
  });
});

router.get('/:question_id', (req, res, next) => {
  Questions.findById(req.params.question_id).exec().then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json({
      error: "question does not exist"
    })
  });
});

router.put('/:question_id', (req, res, next) => {
  Questions.findByIdAndUpdate(req.params.question_id, req.body).then(result => {
    Questions.findOne({
      _id: req.params.question_id
    }).then(result => {
      res.status(200).json(result);
    });
  }).catch(err => {
    res.status(500).json({
      error: "user does not exist"
    })
  });
});


router.delete('/:question_id', (req, res, next) => {
  Questions.remove({
    _id: req.params.question_id
  }).exec().then(result => {
    res.status(200).json({
      message: "is delete"
    });
  }).catch(err => {
    res.status(500).json({
      error: "Question does not exist for delete operation"
    })
  });
});

router.get('/user/:user_id/myquestion', (req, res, next) => {
  const id = req.params.user_id;

  const count_option = Answer.aggregate([

    {
      $group: {
        _id: {
          question_id: "$question_id",
          option_id: "$option_id"
        },
        optionCount: {
          $sum: 1
        }
      }
    },

    {
      $group: {
        _id: "$_id.question_id",
        TotalCount: {
          $sum: "$optionCount"
        },
        Options: {
          $push: {
            _id: "$_id.option_id",
            count: "$optionCount",
            percentage: {
              $multiply: ["$optionCount", 100]
            }
          }
        }
      }
    },

  ])

  Answer.aggregate([

    {
      $match: {
        user_id: ObjectId(id)
      }
    }, {
      $lookup: {
        from: 'questionschemas',
        localField: 'question_id',
        foreignField: '_id',
        as: 'Question'
      }
    }, {
      $unwind: "$Question"
    }, {
      $lookup: {
        from: 'optionschemas',
        localField: 'question_id',
        foreignField: 'question_id',
        as: 'Options'
      }
    },

    {
      $project: {
        _id: 0,
        Question: 1,
        Options: 1,
        option_id: 1
      }
    },
  ]).then(result => {
    const option_select = [];
    const question = [];
    const option = [];
    for (var i of result) {
      question.push({
        question: i.Question,
        option_id: i.option_id
      });
      for (var j of i.Options) {
        option.push(j);
      }
    }

    count_option.then(doc2 => {
      const question2 = [];
      const option2 = [];
      const final = [];
      for (var i of question) {
        for (var j of doc2) {
          if (i.question._id.toString() == j._id.toString()) {
            question2.push({
              _id: j._id,
              TotalCount: j.TotalCount,
              question: i.question.question,
              start_date: moment(i.question.start_date).format('DD/MM/YYYY'),
              end_date: moment(i.question.end_date).format('DD/MM/YYYY'),
              options: [],
              option_id: i.option_id
            });
          }
        }
      }

      for (var k of option) {
        for (var l of doc2) {
          for (var m of l.Options) {

            if (k._id.toString() == m._id.toString()) {

              option2.push({
                _id: m._id,
                count: m.count,
                percentage: m.percentage,
                option: k.option,
                question_id: k.question_id
              });
            }
          }
        }
      }

      for (var questions of question2) {

        final.push({
          questions
        });
        var Total = questions.TotalCount;
        for (var m of option2) {
          if (questions._id.toString() == m.question_id.toString()) {
            questions.options.push({
              _id: m._id,
              count: m.count,
              percentage: (m.percentage / Total),
              option: m.option,
              question_id: m.question_id
            });
          }
        }
      }

      res.status(200).json(final);
    })

  }).catch(err => {
    res.status(500).json({
      error: err
    })
  });
});

router.post('/myquestion', (req, res, next) => {
  Answer.find({
    user_id: req.body.user_id,
    question_id: req.body.question_id
  }).then(ans => {
    if (ans.length) {
      return res.status(409).json({
        message: "Question already exist"
      })
    } else {
      const answer = new Answer({
        _id: new mongoose.Types.ObjectId(),
        user_id: req.body.user_id,
        question_id: req.body.question_id,
        option_id: req.body.option_id
      });
      answer.save().then(result => {
        res.status(200).json(result)
      }).catch(err => {
        res.status(500).json({
          error: err
        })
      });
    }
  });
});

router.get('/user/:user_id/availablequestion', (req, res, next) => {
  const id = req.params.user_id;
  const selected_question = Answer.aggregate([

    {
      $match: {
        user_id: ObjectId(id)
      }
    }, {
      $lookup: {
        from: 'questionschemas',
        localField: 'question_id',
        foreignField: '_id',
        as: 'Question'
      }
    }, {
      $unwind: "$Question"
    },

    {
      $lookup: {
        from: 'optionschemas',
        localField: 'question_id',
        foreignField: 'question_id',
        as: 'Options'
      }
    }, {
      $project: {
        _id: 0,
        Question: 1,
        Options: 1
      }
    }
  ])
  Questions.aggregate([{
    $lookup: {
      from: 'optionschemas',
      localField: '_id',
      foreignField: 'question_id',
      as: 'Options'
    }
  }]).then(result => {
    const total = []
    const available = [];
    const my_available = [];
    const available_question = [];
    selected_question.then(doc1 => {
      result.map(ans => {
        total.push(ans._id.toString())
      })
      doc1.map(ans1 => {
        available.push(ans1.Question._id.toString())
      })
      Array.prototype.diff = function(a) {
        return this.filter(function(i) {
          return a.indexOf(i) < 0;
        });
      };
      my_available.push(total.diff(available));
      result.map(ans => {
        for (var i of my_available[0]) {
          if (ans._id == i) {
            available_question.push({
              _id: ans._id,
              question: ans.question,
              start_date: moment(ans.start_date).format('DD/MM/YYYY'),
              end_date: moment(ans.end_date).format('DD/MM/YYYY'),
              options: ans.Options
            });
            break;
          }
        }
      })
      res.status(200).json(available_question);
    });

  }).catch(err => {
    res.status(500).json({
      error: err
    })
  });
});

router.get('/user/question', (req, res, next) => {
  Answer.aggregate([

    {
      $group: {
        _id: {
          question_id: "$question_id",
          option_id: "$option_id"
        },
        optionCount: {
          $sum: 1
        }
      }
    },

    {
      $group: {
        _id: "$_id.question_id",
        TotalCount: {
          $sum: "$optionCount"
        },
        optionCount: {
          $push: {
            _id: "$_id.option_id",
            count: "$optionCount"
          }
        }
      }
    }, {
      $lookup: {
        from: 'questionschemas',
        localField: '_id',
        foreignField: '_id',
        as: 'Question'
      }
    }, {
      $unwind: "$Question"
    },
    {
      $lookup: {
        from: 'optionschemas',
        localField: '_id',
        foreignField: 'question_id',
        as: 'Options'
      }
    },
     {
      $project: {
        _id: 1,
        Question: {
          question: 1
        },
        Options:1,
        optionCount:1,
        TotalCount: 1
      }
    }
  ]).then(result => {
    const user_question = [];
    const option_detail = [];
    const final = [];
    result.map(question_detail => {
      for(var i of question_detail.Options) {
        for(var j of question_detail.optionCount) {
            if(i._id.toString()==j._id.toString()) {
              option_detail.push({_id:i._id,question_id:i.question_id,option:i.option,count:j.count});
            }
        }
      }
      user_question.push({
        _id: question_detail._id,
        question: question_detail.Question.question,
        option:[],
        TotalCount: question_detail.TotalCount
      })
    })
    for (var questions of user_question) {
      final.push({
        questions
      });
      for (var m of option_detail) {
        if (questions._id.toString() == m.question_id.toString()) {
          questions.option.push({
            _id: m._id,
            count: m.count,
            option: m.option,
            question_id: m.question_id
          });
        }
      }
    }
    res.status(200).json(final);
  })
});


module.exports = router;

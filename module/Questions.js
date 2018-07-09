const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
require('moment/locale/en-gb');
const mergeJSON = require("merge-json") ;
const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

const Questions = require('../model/QuestionsSchema');

const Answer = require('../model/AnswerSchema');

const Options = require('../model/OptionsSchema');

router.get('/', (req, res, next) => {
  Questions.find().then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(500).json({
      error: error
    })
  });
});


router.post('/', (req, res, next) => {
  Questions.find({
    question: req.body.question
  }).then(questionObject => {
    if (questionObject.length) {
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
      }).catch(error => {
        res.status(500).json({
          error: error
        })
      });
    }
  });
});

router.get('/:question_id', (req, res, next) => {
  Questions.findById(req.params.question_id).exec().then(result => {
    res.status(200).json(result);
  }).catch(error => {
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
  }).catch(error => {
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
  }).catch(error => {
    res.status(500).json({
      error: "Question does not exist for delete operation"
    })
  });
});

router.get('/user/:user_id/myquestion', (req, res, next) => {
  const id = req.params.user_id;
  const countOption = Answer.aggregate([
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
    const question = [];
    const option = [];
    for (var questionObject of result) {
      question.push({
        question: questionObject.Question,
        option_id: questionObject.option_id
      });
      for (var optionObject of questionObject.Options) {
        option.push(optionObject);
      }
    }

    countOption.then(count => {
      const questionCount = [];
      const optionCount = [];
      const final = [];
      for (var questionObject of question) {
        for (var optionObject of count) {
          if (questionObject.question._id.toString() == optionObject._id.toString()) {
            questionCount.push({
              _id: optionObject._id,
              TotalCount: optionObject.TotalCount,
              question: questionObject.question.question,
              start_date: moment(questionObject.question.start_date).format('L'),
              end_date: moment(questionObject.question.end_date).format('L'),
              options: [],
              option_id: questionObject.option_id
            });
          }
        }
      }

      for (var optionObject of option) {
        for (var countObject of count) {
          for (var object of countObject.Options) {
            if (optionObject._id.toString() == object._id.toString()) {
              optionCount.push({
                _id: object._id,
                count: object.count,
                percentage: object.percentage,
                option: optionObject.option,
                question_id: optionObject.question_id
              });
            }
          }
        }
      }

      for (var questions of questionCount) {
        final.push({
          questions
        });
        var Total = questions.TotalCount;
        for (var optionObject of optionCount) {
          if (questions._id.toString() == optionObject.question_id.toString()) {
            questions.options.push({
              _id: optionObject._id,
              count: optionObject.count,
              percentage: (optionObject.percentage / Total),
              option: optionObject.option,
              question_id: optionObject.question_id
            });
          }
        }
      }

      res.status(200).json(final);
    })

  }).catch(error => {
    res.status(500).json({
      error: error
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
      }).catch(error => {
        res.status(500).json({
          error: error
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
    }, {
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
    const totalQuestion = []
    const available = [];
    const myAvailable = [];
    const availableQuestion = [];
    selected_question.then(select => {
      result.map(resultMap => {
        totalQuestion.push(resultMap._id.toString())
      })
      select.map(selectMap => {
        available.push(selectMap.Question._id.toString())
      })
      Array.prototype.diff = function(array) {
        return this.filter(function(i) {
          return array.indexOf(i) < 0;
        });
      };
      myAvailable.push(totalQuestion.diff(available));
      result.map(resultMap => {
        for (var i of myAvailable[0]) {
          if (resultMap._id == i) {
            availableQuestion.push({
              _id: resultMap._id,
              question: resultMap.question,
              start_date: moment(resultMap.start_date).format('L'),
              end_date: moment(resultMap.end_date).format('L'),
              options: resultMap.Options
            });
            break;
          }
        }
      })
      res.status(200).json(availableQuestion);
    });

  }).catch(error => {
    res.status(500).json({
      error: error
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
            count: "$optionCount",
            percentage: {
              $multiply: ["$optionCount", 100]
            }
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
        Question: 1,
        Options:1,
        optionCount:1,
        TotalCount: 1
      }
    }
  ]).then(result => {
    const questionDetail = [];
    const optionDetail = [];
    const attendedQuestion = [];
    result.map(question_detail => {
      for(var optionObject of question_detail.Options) {
        for(var countObject of question_detail.optionCount) {
            if(optionObject._id.toString()==countObject._id.toString()) {
              optionDetail.push({_id:optionObject._id,question_id:optionObject.question_id,option:optionObject.option,count:countObject.count,percentage:countObject.percentage});
            }
        }
      }
      questionDetail.push({
        _id: question_detail._id,
        question: question_detail.Question.question,
        start_date: moment(question_detail.Question.start_date).format('L'),
        end_date: moment(question_detail.Question.end_date).format('L'),
        TotalCount: question_detail.TotalCount,
        option:[]
      })
    })
    for (var questions of questionDetail) {
      attendedQuestion.push(
        questions
      );
      for (var optionObject of optionDetail) {
        if (questions._id.toString() == optionObject.question_id.toString()) {
          questions.option.push({
            _id: optionObject._id,
            count: optionObject.count,
            percentage: (optionObject.percentage / questions.TotalCount),
            option: optionObject.option,
            question_id: optionObject.question_id
          });
        }
      }
    }
    res.status(200).json(attendedQuestion);
  })
});


module.exports = router;

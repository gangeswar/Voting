const express = require("express");
const mongoose = require("mongoose");
const mergeJSON = require("merge-json") ;
const moment = require("moment");
const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

const Questions = require('../model/questionsSchema');

const Answer = require('../model/answerSchema');

const Options = require('../model/optionsSchema');

router.get('/', (req, res, next) => {
    Questions.find().then(doc => {
        res.status(200).json(doc);
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
        console.log(ques.length);
        if (ques.length >= 1) {

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
            questions.save().then(doc => {
                res.status(201).json(doc)
            }).catch(err => {
                res.status(500).json({
                    error: err
                })
            });
        }
    });
});

router.get('/:question_id', (req, res, next) => {
    const id = req.params.question_id;
    Questions.findById(id).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            error: "question does not exist"
        })
    });
});

router.put('/:question_id', (req, res, next) => {
    const id = req.params.question_id;
    Questions.findByIdAndUpdate({
        _id: id
    }, req.body).exec().then(doc => {
        Questions.findOne({
            _id: id
        }).then(doc => {
            res.status(200).json(doc);
        });
    }).catch(err => {
        res.status(500).json({
            error: "user does not exist"
        })
    });
});


router.delete('/:question_id', (req, res, next) => {
    const id = req.params.question_id;
    Questions.remove({
        _id: id
    }).exec().then(doc => {
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

        { $group: {
         _id: {
           question_id: "$question_id",
           option_id: "$option_id"
         },
         optionCount: { $sum: 1 }
        }},

        { $group: {
         _id: "$_id.question_id",
         TotalCount: { $sum: "$optionCount" },
         Options: {
             $push: {
                 _id: "$_id.option_id",
                 count: "$optionCount",
                 percentage: {$multiply: ["$optionCount", 100]
               }
             }
         }
    }},

])

    Answer.aggregate([

        {
            $match: {
                user_id: ObjectId(id)
            }
        },
        {
            $lookup: {
                from: 'questionschemas',
                localField: 'question_id',
                foreignField: '_id',
                as: 'Question'
            }
        },
        {
            $unwind: "$Question"
        },
        {
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
    ]).then(doc => {
      const option_select=[];
      const question=[];
      const option=[];
      for(var i of doc)
      {
        question.push({question:i.Question,option_id:i.option_id});
        for(var j of i.Options)
        {
          option.push(j);
        }
      }

      count_option.then(doc2=>{
          const question2=[];
          const option2=[];
          const final=[];
        for(var i of question)
        {
          for(var j of doc2)
          {
            if(i.question._id.toString()==j._id.toString())
            {
              question2.push({_id:j._id,TotalCount:j.TotalCount,question:i.question.question,start_date: moment(i.question.start_date).format('DD/MM/YYYY'),end_date:moment(i.question.end_date).format('DD/MM/YYYY'),options:[],option_id:i.option_id});
            }
          }
        }

      for(var k of option)
      {
        for(var l of doc2)
          {
            for(var m of l.Options)
            {

            if(k._id.toString()==m._id.toString())
            {

                option2.push({_id:m._id,count:m.count,percentage:m.percentage,option:k.option,question_id:k.question_id});
            }
          }
          }
      }

      for(var questions of question2)
      {

        final.push({questions});
        var Total = questions.TotalCount;
        for(var m of option2)
        {
          if(questions._id.toString()==m.question_id.toString())
          {
            questions.options.push({_id:m._id,count:m.count,percentage:(m.percentage/Total),option:m.option,question_id:m.question_id});
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
            answer.save().then(doc => {
                res.status(200).json(doc)
            }).catch(err => {
                res.status(500).json({
                    error: err
                })
            });
        }
    });
});

router.get('/count/myquestion', (req, res, next) => {
    Answer.find().then(doc => {
        doc.map(available => {
            console.log(available.user_id.toString());
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.get('/user/availablequestion/:user_id', (req, res, next) => {
    const id = req.params.user_id;
    const available_arr = [];
    Answer.find({
        user_id: id
    }).then(ans => {
        ans.map(available => {
            available_arr.push(available.question_id.toString());
        })
        Questions.find({
            _id: {
                $nin: available_arr
            }
        }).then(doc => {
            res.status(200).json(doc);
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        });
    }).catch(err => {
        res.status(500).json({
            error: "Nothing in my voting"
        })
    });
});

module.exports = router;
